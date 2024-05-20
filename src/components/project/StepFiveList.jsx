import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Select,
  Table,
} from "antd";

const StepFiveList = ({ form, columns }) => {
  const formRef = useRef(null);

  return (
    <>
      <Row justify="end" style={{ width: "100%", marginBottom: "16px" }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            formRef.current.show();
          }}
        >
          Нэмэх
        </Button>
      </Row>
      <Table
        style={{ width: "100%" }}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        // dataSource={data}
      />
    </>
  );
};

export default StepFiveList;
