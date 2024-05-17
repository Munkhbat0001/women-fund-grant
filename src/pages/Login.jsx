import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, Flex, Row, Col, Radio } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAxios } from "../hooks";
import { validator } from "../utils/validator";
import { CUSTOMER_LOGIN } from "../utils/operation";
import { CustomerContext } from "../context/CustomerContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(CustomerContext);

  const onFinish = (values) => {
    setMessage("");

    setLoading(true);
    useAxios(CUSTOMER_LOGIN, values, { method: "POST" })
      .then((res) => {
        console.log("res: ", res);
        loginUser(res);
        localStorage.setItem("customer", JSON.stringify(res));
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
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
              alt=""
            /> */}

            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Нэвтрэх
            </h2>
            <Form
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="И-мэйл"
                name="loginName"
                rules={validator().email().build()}
              >
                <Input prefix={<MailOutlined />} size="large" />
              </Form.Item>
              <Form.Item
                label="Нууц үг"
                name="password"
                rules={validator().required("Нууц үгээ оруулна уу").build()}
              >
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
