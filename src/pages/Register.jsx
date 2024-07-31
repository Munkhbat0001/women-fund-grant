import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Flex, Row, Col, Radio } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAxios } from "../hooks";
import { CUSTOMER_REGISTER } from "../utils/operation";
import { useNavigate } from "react-router-dom";
const boxStyle = {
  width: "100%",
  height: "100%",
  // borderRadius: 6,
  // border: "1px solid #40a9ff",
};
const Register = () => {
  const navigate = useNavigate();
  const [typeId, setTypeId] = useState(1);

  const onFinish = (values) => {
    const customer = {
      typeId,
      ...values,
    };
    useAxios(CUSTOMER_REGISTER, customer, {
      method: "POST",
      showSuccess: true,
    }).then((res) => {
      navigate("/login");
    });
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
              Бүртгүүлэх
            </h2>
            <Flex style={boxStyle} justify="center" align="center">
              <Radio.Group
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                // optionType="button"
                // buttonStyle="solid"
              >
                <Radio.Button value={1}>Байгууллага</Radio.Button>
                <Radio.Button value={2}>Бүлгээр</Radio.Button>
              </Radio.Group>
            </Flex>
            <br />
            <Form
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label={`${typeId === 1 ? "Байгууллагын нэр" : "Бүлгийн нэр"} `}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Нэр оруулна уу",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} size="large" placeholder="" />
              </Form.Item>
              <Form.Item
                label="И-мэйл"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Мэйл хаягаа оруулна уу",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} size="large" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үг оруулна уу",
                  },
                ]}
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
                  Бүртгүүлэх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
