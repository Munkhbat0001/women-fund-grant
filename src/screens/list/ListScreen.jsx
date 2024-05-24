import { Button, Divider, Space, Row, Card } from "antd";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import TopSearch from "./TopSearch";
import OTable from "./OTable";
import useList from "../../hooks/useList";
import { useSearchParams } from "react-router-dom";
import { flatMapDeep, isEmpty } from "lodash";
import BasePageContainer from "../../components/layouts/BasePageContainer";
import { showConfirm } from "../../components/modals/Confirmation";
import useAxios from "../../hooks/useAxios";

const ListScreen = (
  {
    form,
    commands = [],
    columns,
    header,
    summary,
    beforeCommandRender,
    expandable,
    ...props
  },
  ref
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    idField,
    top,
    creatable,
    editable,
    removable,
    visible,
    insertAPI,
    updateAPI,
    deleteAPI,
    isExcel,
    filter = {},
  } = props.initial;

  const { formProps: { selectedId, selectedData, formMode } = {}, setMode } =
    useList();

  const getMembers = (member) => {
    if (!member.children || !member.children.length) {
      return member;
    }
    return [member, flatMapDeep(member.children, getMembers)];
  };

  const topSearchColumn = useMemo(() => {
    return flatMapDeep(columns, getMembers)
      .filter((x) => x.top > 0)
      .sort(function (a, b) {
        return a.top - b.top;
      });
  }, [columns]);

  const sort = useMemo(() => {
    return flatMapDeep(columns, getMembers)
      .filter((x) => x.sortKey)
      .reduce(function (obj, param) {
        obj[param.sortKey] = param.sortKeyValue || false;
        return obj;
      }, {});
  }, [columns]);

  const formRef = useRef(null);
  const tableRef = useRef(null);

  const [filters, setFilters] = useState({});

  const onFilter = useCallback((filterValues) => {
    const queryString = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(queryString);

    if (!isEmpty(params)) {
      Object.keys(params).forEach((key) => {
        params[key] = filterValues[key] || params[key];
      });
      setSearchParams(params);
    }

    setFilters((prev) => {
      return {
        ...prev,
        ...filterValues,
      };
    });
  }, []);

  const mergedCommands = useMemo(() => {
    if (editable) {
      commands.push({
        key: "edit",
        label: "Засах",
        // icon: <EditOutlined />,
        type: "primary",
      });
    }

    if (removable) {
      commands.push({
        key: "delete",
        label: "Устгах",
        // icon: <DeleteOutlined />,
        type: "secondary",
      });
    }
    return commands;
  }, [commands]);

  const createCommand = () => {
    setMode("create", null, {});
    formRef.current.clear(null);
    formRef.current.show();
  };

  const exportExcel = () => {
    tableRef.current.exportExcel();
  };

  const onCommand = (name, row) => {
    switch (name) {
      case "edit":
        _onEdit(row);
        break;
      case "delete":
        _onDelete(row);
        break;
    }
  };

  const _onEdit = (row) => {
    const id = row[idField];

    setMode("edit", id, row);
    formRef.current.clear(row);
    formRef.current.show();
  };

  const _onDelete = (row) => {
    const id = row[idField];

    showConfirm({
      title: `${id}-р устгахдаа итгэлтэй байна уу.`,
      onOk: () => {
        useAxios(
          deleteAPI + `/${id}`,
          {},
          { method: "DELETE", showSuccess: true }
        ).then((res) => {
          fetchData();
        });
      },
    });
    // setMode("delete", id, row);
  };

  const fetchData = () => tableRef.current.fetch();
  const clearData = () => tableRef.current.clearData();

  const ListTopSearch = useCallback(() => {
    if (!top && topSearchColumn.length === 0) return null;

    const queryString = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(queryString);

    return top ? (
      <Card size="small">
        {React.createElement(top, {
          filters: topSearchColumn,
          onFilter: onFilter,
          queryParams: params,
          clearData: clearData,
        })}
      </Card>
    ) : (
      <Card size="small">
        <TopSearch
          filters={topSearchColumn}
          onFilter={onFilter}
          queryParams={params}
        />
      </Card>
    );
  }, [topSearchColumn, onFilter]);

  const ListHeader = () => {
    if (header === false) return null;

    return header ? (
      React.createElement(header, {})
    ) : (
      <>
        {/* {(creatable || isExcel) &&  <Divider style={{ marginTop: 10, marginBottom: 10 }} />} */}
        <Row justify="end">
          <Space>
            {creatable && (
              <Button
                type="primary"
                onClick={createCommand}
                icon={<PlusOutlined />}
              >
                Бүртгэх
              </Button>
            )}
            {isExcel === true && (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={exportExcel}
              >
                Excel
              </Button>
            )}
          </Space>
        </Row>
        {(creatable || isExcel) && (
          <div style={{ marginTop: 10, marginBottom: 10 }} />
        )}
      </>
    );
  };

  const tableProps = {
    columns,
    onCommand,
    commands: mergedCommands,
    summary,
    filters,
    filter,
    sort,
    beforeCommandRender,
    expandable,
    ...props,
  };

  useImperativeHandle(ref, () => ({
    fetch: () => fetchData(),
    getFilters: () => filters,
  }));

  return (
    <>
      <BasePageContainer>
        <ListTopSearch />
        <br />
        <Card size="small">
          <ListHeader />
          <OTable ref={tableRef} {...tableProps} />
        </Card>
        {form &&
          React.createElement(form, {
            ref: formRef,
            idField,
            insertAPI,
            updateAPI,
            deleteAPI,
            mode: formMode,
            id: selectedId,
            data: selectedData,
            selectedData: selectedData,
            hide: () => formRef.current.hide(),
            listRefresh: () => fetchData(),
            afterSave: (values, res) => {
              fetchData();
              if (formMode === "create") {
                let newId = res[idField];
                if (!newId) {
                  newId = values[idField];
                }
                setMode("edit", newId, values);
              }
              formRef.current.hide();
            },
          })}
      </BasePageContainer>
    </>
  );
};

export default forwardRef(ListScreen);
