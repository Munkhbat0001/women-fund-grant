import { Button, Row, Table } from "antd";
import React, { useRef } from "react";
import ProgressAdd from "./ProgressAdd";

const ProgressList = () => {
  const formRef = useRef(null);

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
  const onShow = () => {
    formRef.current.show();
  };
  return (
    <>
      <Row justify="end" style={{ marginBottom: "10px" }}>
        <Button type="primary" onClick={onShow}>
          Явцын тайлан оруулах
        </Button>
      </Row>
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
      {React.createElement(ProgressAdd, {
        ref: formRef,
        hide: () => formRef.current.hide(),
        afterSave: () => {
          // listRef.current.fetch();
          formRef.current.hide();
        },
      })}
    </>
  );
};

export default ProgressList;
