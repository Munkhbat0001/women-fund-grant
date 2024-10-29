import React, { useState } from "react";
import { Button, Form, Input, Row, Col, notification } from "antd";
import { SaveOutlined, LockOutlined } from "@ant-design/icons";
import { useAxios } from "../hooks";
import { CUSTOMER_RESET_PASSWORD } from "../utils/operation";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onFinish = (values) => {
    const otp = searchParams.get("otpCode");
    setLoading(true);
    useAxios(CUSTOMER_RESET_PASSWORD.format(otp), values, {
      method: "POST",
    })
      .then((res) => {
        notification.success({
          message: "Амжилттай нууц үг солигдлоо.",
        });
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Нууц үг солих
            </h2>
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
                    loading={loading}
                  >
                    Хадгалах
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
