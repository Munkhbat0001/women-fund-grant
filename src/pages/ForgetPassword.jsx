import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Row,
  Col,
  Radio,
  Typography,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAxios } from "../hooks";
import { validator } from "../utils/validator";
import {
  ADMIN_LOGIN,
  CUSTOMER_FORGET_PASSWORD,
  CUSTOMER_LOGIN,
} from "../utils/operation";
import { SystemContext } from "../context/SystemContext";
import { useNavigate } from "react-router-dom";
const { Text, Link } = Typography;

const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setMessage("");

    setLoading(true);
    useAxios(
      CUSTOMER_FORGET_PASSWORD.format(values.email),
      {},
      { method: "POST" }
    )
      .then((res) => {
        navigate(`/forget-otp`);
      })
      .catch((err) => {
        setMessage(err);
      })
      .finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Нууц үг сэргээх
            </h2>
            <Form
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="И-мэйл"
                name="email"
                rules={validator().required().build()}
              >
                <Input prefix={<MailOutlined />} size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  Сэргээх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
