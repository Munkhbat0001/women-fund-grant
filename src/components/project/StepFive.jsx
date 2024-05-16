import React from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space, Upload, Checkbox, Table } from "antd";
const StepFive = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const columns = [
    {
      title: "Овог",
      dataIndex: "name",
    },
    {
      title: "Нэр",
      dataIndex: "age",
    },
    {
      title: "Албан тушаал",
      dataIndex: "address",
    },
    {
      title: "Төсөлд гүйцэтгэх үүрэг",
      dataIndex: "address",
    },
    {
      title: "Удирдах ажилтан",
      dataIndex: "address",
    },
    {
      title: "Төсөл хариуцах ажилтан",
      dataIndex: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Овог",
      age: "Албан тушаал",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Албан тушаал",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Албан тушаал",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Төсөлд гүйцэтгэх үүрг",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "5",
      name: "Удирдах ажилтан",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "6",
      name: "Төсөл хариуцах ажилтан",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  return (
    <Table
      style={{ width: "100%" }}
      bordered
      size="small"
      pagination={false}
      columns={columns}
      dataSource={data}
    />
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
