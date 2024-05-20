import React, { useRef, useState } from "react";
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
  const [currentStep, setCurrentStep] = useState(0);
  const [projectId, setProjectId] = useState(null);
  const oneRef = useRef(null);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    padding: 16,
  };

  const onContinue = (e) => {
    oneRef.current.submit();
  };

  const onChangeStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="container">
      <div className="pt-[150px] pb-[100px]">
        <Steps
          current={currentStep}
          onChange={onChangeStep}
          percent={60}
          items={items}
        />
        <br />
        <div style={contentStyle}>
          <Row justify="center">
            {currentStep === 0 && <StepOne next={next} prev={prev} />}
            {currentStep === 1 && <StepTwo next={next} prev={prev} />}
            {currentStep === 2 && <StepThree next={next} prev={prev} />}
            {currentStep === 3 && <StepFour next={next} prev={prev} />}
            {currentStep === 4 && <StepFive next={next} prev={prev} />}
          </Row>
        </div>
        {/* <br />
        <Row justify="center">
          <Row justify="end" style={{ width: 800 }}>
            <Button size="large" type="primary" onClick={onContinue}>
              Үргэлжлүүлэх
            </Button>
          </Row>
        </Row> */}
      </div>
    </div>
  );
};

export default ProjectRequest;
