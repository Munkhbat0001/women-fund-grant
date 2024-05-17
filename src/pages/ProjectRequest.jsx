import React, { useState } from "react";
import { Steps, Form, Button, Row, Col, theme } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StepOne from "../components/project/StepOne";
import StepTwo from "../components/project/StepTwo";
import StepThree from "../components/project/StepThree";
import StepFour from "../components/project/StepFour";
import StepFive from "../components/project/StepFive";

const items = [
  {
    title: "Төслийн танилцуулга",
  },
  {
    title: "Төслийн зорилго",
    description: "зорилт",
  },
  {
    title: "Үйл ажиллагааны",
    description: "төлөвлөгөө",
  },
  {
    title: "Төсвийн санал",
  },
  {
    title: "Төсөл хэрэгжүүлэх баг",
  },
];

const ProjectRequest = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(4);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    padding: 16,
  };

  const onContinue = (e) => {};

  const onChange = (step) => {
    setCurrent(step);
  };

  return (
    <div className="container">
      <div className="pt-[150px] pb-[100px]">
        <Steps
          current={current}
          onChange={onChange}
          percent={60}
          items={items}
        />
        <br />
        <div style={contentStyle}>
          <Row justify="center">
            {current === 0 && <StepOne />}
            {current === 1 && <StepTwo />}
            {current === 2 && <StepThree />}
            {current === 3 && <StepFour />}
            {current === 4 && <StepFive />}
          </Row>
        </div>
        <br />
        <Row justify="center">
          <Row justify="end" style={{ width: 800 }}>
            <Button size="large" type="primary" onClick={onContinue}>
              Үргэлжлүүлэх
            </Button>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default ProjectRequest;
