import { Table } from "antd";
import React from "react";

const HistoryGrantList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "grantId",
    },
    {
      title: "Гарчиг",
      dataIndex: "title",
    },
    {
      title: "Эхлэх огноо",
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
  ];

  const data = [
    // {
    // }
  ];

  return (
    <>
      <Table
        rowKey={"id"}
        style={{ width: "100%" }}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{ x: "0" }}
      />
    </>
  );
};

export default HistoryGrantList;
