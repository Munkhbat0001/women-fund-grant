import React, {
  useState,
  useEffect,
  memo,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Table,
  Space,
  Tooltip,
  Button,
  Form,
  Dropdown,
  Pagination,
  Row,
} from "antd";
import useAxios from "../../hooks/useAxios";
import { DownOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";

const serverQueryParams = (current, pageSize, search, serverPaging = true) => {
  if (serverPaging === true)
    return (
      `?page=${current}&pageSize=${pageSize}` + (search ? "&" + search : "")
    );
  else return search ? "?" + search : "";
};

const OTable = (
  {
    initial: {
      selectAPI,
      insertAPI,
      updateAPI,
      deleteAPI,
      autoload = true,
      serverPaging = true,
      isRowNumber = true,
      idField,
      pageSize = 10,
      filter,
    } = {},
    columns = [],
    commands = [],
    // beforeList,
    // afterList,
    onCommand,
    summary,
    filters = {},
    children,
    scroll,
    sort = {},
    beforeCommandRender,
    expandable,
    ...props
  },
  ref
) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total: 0,
  });
  const [sorter, setSorter] = useState(sort);

  function _onMenuClick(name, row) {
    onCommand && onCommand(name, row);

    const command = commands.find((x) => x.key === name);
    if (command) {
      command.onCommand && command.onCommand(name, row);
    }
  }

  const mergedColumns = useMemo(() => {
    return (
      isRowNumber
        ? [
            {
              title: "#",
              key: "index",
              width: "50px",
              align: "center",
              fixed:
                columns[0].fixed === "left" ||
                (columns[0].children && columns[0].children[0].fixed === "left")
                  ? "left"
                  : "none",
              render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
            },
          ]
        : []
    ).concat([
      ...columns.map((col) => ({
        width: "100px",
        ...col,
      })),
    ]);
  }, [columns, pagination]);

  // const mergedColumns = [
  //   {
  //     title: '#',
  //     key: 'index',
  //     width: "50px",
  //     align: "center",
  //     fixed: columns[0].fixed === 'left' || (columns[0].children && columns[0].children[0].fixed === 'left') ? "left" : "none",
  //     render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
  //   },
  //     ...columns.map(col => ({
  //       width: "100px",
  //       ...col,
  //   }))
  // ]
  useMemo(() => {
    if (commands.length > 0) {
      mergedColumns.push({
        title: "Үйлдэл",
        key: "action",
        align: "center",
        width: "120px",
        fixed: "right",
        render: (_, row, rowIndex) => {
          let list = [...commands];

          if (beforeCommandRender) {
            list = beforeCommandRender(list, row);
          }

          return (
            <Space>
              <Dropdown
                trigger="click"
                menu={{
                  items: list,
                  onClick: ({ key }) => _onMenuClick(key, row),
                }}
              >
                <Button>
                  <Space>
                    Үйлдэл
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          );
        },
      });
    }
  }, [commands, pagination]);

  const fetch = (pagination) => {
    setLoading(true);
    const { current, pageSize } = pagination;

    Object.keys(filters).forEach((key) => {
      if (
        filters[key] === undefined ||
        filters[key] === "" ||
        filters[key] === null
      ) {
        delete filters[key];
      }
    });
    const search = new URLSearchParams({
      ...filters,
      ...filter,
      ...sorter,
    }).toString();
    const queryParam = serverQueryParams(
      current,
      pageSize,
      search,
      serverPaging
    );

    useAxios(selectAPI + queryParam, {}, { showLoader: false })
      .then((res) => {
        if (serverPaging === true) {
          setDataSource(res.list);
          setPagination({
            current: current,
            pageSize: pageSize,
            total: res.rowCount,
          });
        } else {
          setDataSource(res);
        }
        setData(res);
      })
      .finally(() => setLoading(false));
  };

  const exportExcel = () => {
    setLoading(true);
    const { pageSize, total } = pagination;

    const search = new URLSearchParams({ ...filters, ...filter }).toString();
    const queryParam = serverQueryParams(
      1,
      parseInt(total / pageSize),
      search + "&isExcel=true",
      true
    );

    useAxios(
      selectAPI + queryParam,
      {},
      { responseType: "arraybuffer", showLoader: false }
    )
      .then((res) => {
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const path = window.location.pathname.replaceAll("/", "");
        const aElement = document.createElement("a");
        aElement.setAttribute("download", `${path || "file"}.xlsx`);
        const href = URL.createObjectURL(blob);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
      })
      .finally(() => setLoading(false));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.column) {
      const { sortKey } = sorter.column;
      setSorter((prev) => {
        return {
          ...prev,
          [sortKey]: sorter.order === "ascend",
        };
      });
    }
    fetch(pagination);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = Object.fromEntries(params);
    if (isEmpty(search)) {
      if (autoload) fetch(pagination);
    } else {
      filters = { ...search };
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(filters)) fetch({ ...pagination, current: 1 });
  }, [filters]);

  const summery1 = (pageData) => {
    if (summary) return React.createElement(summary, { pageData, data });
  };

  const clearData = () => {
    setDataSource([]);
    setPagination({ current: 1, pageSize, total: 0 });
  };

  useImperativeHandle(ref, () => ({
    fetch: () => fetch(pagination),
    exportExcel: () => exportExcel(),
    clearData: () => clearData(),
  }));

  const onChangePagination = (current, pageSize) => {
    const page = { current, pageSize, total: pagination.total };
    setPagination((prev) => {
      return {
        ...prev,
        ...page,
      };
    });

    fetch(page);
  };

  return (
    <>
      <Table
        rowKey={idField}
        className="o-table"
        columns={mergedColumns}
        dataSource={dataSource}
        loading={loading}
        // pagination={serverPaging === true ? pagination : serverPaging}
        pagination={false}
        bordered
        size="small"
        scroll={scroll ? scroll : { x: "100vw" }}
        // y: `calc(100vh - 250px)`
        onChange={handleTableChange}
        summary={summery1}
        // rowSelection={rowSelection}
        // onRow={onRow}
        // {...props}
        sticky
        expandable={expandable}
      >
        {children}
      </Table>
      {serverPaging === true && (
        <>
          <br />
          <Row justify="end">
            <Pagination
              size="small"
              showSizeChanger
              onShowSizeChange={onChangePagination}
              defaultCurrent={1}
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={onChangePagination}
              showTotal={(total) => `Нийт ${total}`}
              pageSizeOptions={[10, 100, 500, 1000]}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default forwardRef(OTable);
