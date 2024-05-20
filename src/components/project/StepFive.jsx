import React, { useRef, useState } from "react";
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
import StepFiveModal from "./StepFiveModal";
import useAxios from "../../hooks/useAxios";
import { CUSTOMER_PROJECT_MEMBER } from "../../utils/operation";
const StepFive = ({ next, prev, projectId }) => {
  const formRef = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const columns = [
    {
      title: "Овог",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Албан тушаал",
      dataIndex: "position",
    },
    {
      title: "Төсөлд гүйцэтгэх үүрэг",
      dataIndex: "role",
    },
    {
      title: "Удирдах ажилтан",
      dataIndex: "leader",
    },
    {
      title: "Төсөл хариуцах ажилтан",
      dataIndex: "owner",
    },
  ];

  const fetch = () => {
    if (projectId)
      useAxios(CUSTOMER_PROJECT_MEMBER + `/${projectId}`).then((res) => {
        setDataSource(res);
      });
  };

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
        dataSource={dataSource}
      />
      {React.createElement(StepFiveModal, {
        ref: formRef,
        hide: () => formRef.current.hide(),
        afterSave: () => {
          fetch();
        },
      })}
      <Row
        gutter={12}
        justify="end"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Space>
          <Button
            // size="large"
            onClick={() => {
              prev && prev();
            }}
          >
            Буцах
          </Button>
          <Button
            // size="large"
            type="primary"
            onClick={() => {
              // form.submit();
              // next && next();
            }}
          >
            Хүсэлт илгээх
          </Button>
        </Space>
      </Row>
    </>
    // <Form
    //   name="dynamic_form_nest_item"
    //   onFinish={onFinish}
    //   //   style={{
    //   //     maxWidth: 600,
    //   //   }}
    //   autoComplete="off"
    //   initialValues={{
    //     users: [{}],
    //   }}
    // >
    //   <Form.List name="users">
    //     {(fields, { add, remove }) => (
    //       <>
    //         {fields.map(({ key, name, ...restField }) => (
    //           <Space
    //             key={key}
    //             style={{ display: "flex", marginBottom: 8 }}
    //             align="baseline"
    //           >
    //             <Form.Item {...restField} name={[name, "first"]}>
    //               <Input placeholder="Овог" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Input placeholder="Нэр" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Input placeholder="Албан тушаал" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Input placeholder="Төсөлд гүйцэтгэх үүрэг" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Upload>
    //                 <Button icon={<UploadOutlined />}>Click to Upload</Button>
    //               </Upload>
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Checkbox>Удирдах ажилтан</Checkbox>
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Checkbox>Төсөл хариуцах ажилтан</Checkbox>
    //             </Form.Item>
    //             <MinusCircleOutlined onClick={() => remove(name)} />
    //           </Space>
    //         ))}
    //         <Form.Item>
    //           <Button
    //             type="dashed"
    //             onClick={() => add()}
    //             block
    //             icon={<PlusOutlined />}
    //           >
    //             Add field
    //           </Button>
    //         </Form.Item>
    //       </>
    //     )}
    //   </Form.List>
    // </Form>
  );
};

export default StepFive;
