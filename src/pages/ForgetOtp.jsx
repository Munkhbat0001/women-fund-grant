import React, { useState } from "react";
import { Button, Flex, Input, Space, Typography } from "antd";
import OtpInput from "../components/OtpInput";
import { useAxios } from "../hooks";
import { CUSTOMER_VALIDATE_OTP } from "../utils/operation";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const ForgetOtp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const onClick = () => {
    setLoading(true);
    useAxios(CUSTOMER_VALIDATE_OTP.format(otp), {}, { method: "POST" })
      .then((res) => {
        navigate(`/reset-password?otpCode=${otp}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="my-3 text-center text-2xl font-bold tracking-tight text-gray-900">
              Нууц үг сэргээх
            </h2>
            <div className="px-8 py-4 flex items-center justify-center">
              <OtpInput length={4} onChange={(value) => setOtp(value)} />
            </div>
            <br />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
              loading={loading}
              onClick={onClick}
            >
              Баталгаажуулах
            </Button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetOtp;
