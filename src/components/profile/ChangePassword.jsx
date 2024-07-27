import { SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useAxios } from "../../hooks";
import { CUSTOMER_CHANGE_PASSWORD } from "../../utils/operation";
// import { validator } from "../../utils/validator";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    useAxios(CUSTOMER_CHANGE_PASSWORD, values, {
      method: "PUT",
      showSuccess: true,
    }).then((res) => {
      console.log("res: ", res);
      form.resetFields();
    });
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Шинэ нууц үг"
        name="newPassword"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* Field */}
      <Form.Item
        label="Шинэ нууц үг давтах"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Давтан оруулалт таарахгүй байна")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Row justify="end">
        <Col>
          <Button
            icon={<SaveOutlined />}
            type="primary"
            onClick={() => form.submit()}
          >
            Хадгалах
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
