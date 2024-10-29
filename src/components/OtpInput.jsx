import React, { useState } from "react";
import { Flex, Input, Space } from "antd";

const OtpInput = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    onChange && onChange(newOtp.join(""));

    // Automatically focus the next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <Space>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <Input
            key={index}
            id={`otp-input-${index}`}
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            style={{
              width: "40px",
              textAlign: "center",
              fontSize: "1.25rem",
            }}
          />
        ))}
    </Space>
  );
};

export default OtpInput;
