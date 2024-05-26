import { SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
// import { validator } from "../../utils/validator";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {};
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Шинэ нууц үг"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Field */}
      <Form.Item
        label="Шинэ нууц үг давтах"
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Row justify="end">
        <Col>
          <Button icon={<SaveOutlined />} type="primary">
            Хадгалах
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
