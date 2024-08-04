import { Button, Dropdown, Pagination, Row, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ProgressAdd from "./ProgressAdd";
import { useAxios } from "../../hooks";
import {
  REPORT_INTEGRATED_LIST,
  REPORT_PROGRESS_LIST,
} from "../../utils/operation";
import dayjs from "dayjs";
import { formatMoney } from "../../utils";
import { DownOutlined } from "@ant-design/icons";
import IntegratedAdd from "./IntegratedAdd";
import ProjectTab from "./components/ProjectTab";
import ReportStatusView from "./components/report/ReportStatusView";
import ReportTabView from "./components/report/ReportTabView";

const serverQueryParams = (current, pageSize, search, serverPaging = true) => {
  if (serverPaging === true)
    return (
      `?page=${current}&pageSize=${pageSize}` + (search ? "&" + search : "")
    );
  else return search ? "?" + search : "";
};

const IntegratedList = () => {
  const formRef = useRef(null);
  const detailRef = useRef(null);
  const statusRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  useEffect(() => {
    fetch(pagination);
  }, []);

  const _onMenuClick = (key, row) => {
    switch (key) {
      case "againView":
        formRef.current.clear({ ...row, mode: "edit" });
        formRef.current.show();
        break;
      case "detailView":
        detailRef.current.clear(row);
        detailRef.current.show();
        break;
      case "statusView":
        statusRef.current.clear(row);
        statusRef.current.show();
        break;
    }
  };

  const columns = [
    {
      title: "Төслийн дугаар",
      dataIndex: "projectId",
      align: "center",
    },
    {
      title: "Төслийн нэр",
      dataIndex: "projectName",
    },
    {
      title: "Санхүүжилтийн хэмжээ",
      dataIndex: "requestAmount",
      render: (text) => text && formatMoney(text),
    },
    {
      title: "Тайлан илгээсэн огноо",
      dataIndex: "sendDatetime",
      render: (text) => text && dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Эхэлсэн огноо",
      dataIndex: "beginDate",
    },
    {
      title: "Дуусах огноо",
      dataIndex: "endDate",
    },
    {
      title: "Төлөв",
      dataIndex: "statusName",
    },
    {
      title: "Үйлдэл",
      key: "action",
      align: "center",
      width: "120px",
      fixed: "right",
      render: (_, row) => {
        const list = [];
        if (row.statusId === 122 || row.statusId === 123) {
          list.push(
            {
              key: "againView",
              label: "Дахин илгээх",
            },
            {
              key: "statusView",
              label: "Шалтгаан харах",
            }
          );
        } else {
          list.push({
            key: "detailView",
            label: "Харах",
          });
        }

        return (
          <Space>
            <Dropdown
              trigger="click"
              menu={{
                items: [...list],
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
    },
  ];

  const onShow = () => {
    formRef.current.clear(null);
    formRef.current.show();
  };

  const fetch = (pagination) => {
    setLoading(true);
    const { current, pageSize } = pagination;

    const search = new URLSearchParams({ ...filters }).toString();
    const queryParam = serverQueryParams(current, pageSize, search, true);

    useAxios(
      REPORT_INTEGRATED_LIST + queryParam + "&statusIds=120,122,123",
      {},
      { showLoader: false }
    )
      .then((res) => {
        setDataSource(res.list);
        setPagination({
          current: current,
          pageSize: pageSize,
          total: res.rowCount,
        });
      })
      .finally(() => setLoading(false));
  };

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
      <Row justify="end" style={{ marginBottom: "10px" }}>
        <Button type="primary" onClick={onShow}>
          Нэгдсэн тайлан оруулах
        </Button>
      </Row>
      <Table
        rowKey={"id"}
        style={{ width: "100%" }}
        className="o-table"
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "0" }}
      />
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
      {React.createElement(IntegratedAdd, {
        ref: formRef,
        hide: () => formRef.current.hide(),
        afterSave: () => {
          fetch(pagination);
          formRef.current.hide();
        },
      })}
      {React.createElement(ReportTabView, {
        ref: detailRef,
        integrated: true,
        hide: () => detailRef.current.hide(),
      })}
      {React.createElement(ReportStatusView, {
        ref: statusRef,
        hide: () => statusRef.current.hide(),
      })}
    </>
  );
};

export default IntegratedList;
