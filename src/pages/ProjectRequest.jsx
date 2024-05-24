import React, { useContext, useEffect, useRef, useState } from "react";
import { Steps, Form, Button, Row, Col, theme, Spin, Skeleton } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StepOne from "../components/project/StepOne";
import StepTwo from "../components/project/StepTwo";
import StepThree from "../components/project/StepThree";
import StepFour from "../components/project/StepFour";
import StepFive from "../components/project/StepFive";
import useAxios from "../hooks/useAxios";
import { CUSTOMER_PROJECT_BY_GRANT } from "../utils/operation";
import { useParams, useSearchParams } from "react-router-dom";
import { SystemContext } from "../context/SystemContext";

const items = [
  {
    title: "Төслийн",
    description: "танилцуулга",
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
    title: "Төсөл",
    description: "хэрэгжүүлэх баг",
  },
  // {
  //   title: "Баталгаажуулалт",
  // },
];

export const ProjectContext = React.createContext({});

const ProjectRequest = () => {
  const { token } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(null);
  const [project, setProject] = useState(null);
  const { loading } = useContext(SystemContext);

  const { grantId } = useParams();

  const next = () => {
    setCurrentStep(currentStep + 1);
    getProject();
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

  const onChangeStep = (step) => {
    setCurrentStep(step);
  };

  const getProject = () => {
    useAxios(CUSTOMER_PROJECT_BY_GRANT + `/${grantId}`).then((res) => {
      setProject(res);
    });
  };

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_BY_GRANT + `/${grantId}`).then((res) => {
      setProject(res);
      setCurrentStep(res.stepId);
    });
  }, []);

  const contextProps = {
    next,
    prev,
    project,
    getProject,
    currentStep,
    loading,
  };

  if (currentStep == null || currentStep == undefined)
    return (
      <div className="container">
        <div className="pt-[150px] pb-[100px]">
          <Skeleton />
        </div>
      </div>
    );
  return (
    <div className="container">
      <div className="pt-[150px] pb-[100px]">
        <Steps
          current={currentStep}
          // onChange={onChangeStep}
          percent={60}
          items={items}
        />
        <br />
        <div style={contentStyle}>
          <ProjectContext.Provider value={contextProps}>
            <Row justify="center">
              <Col xs={24} sm={20} md={18} lg={16} xl={16}>
                {currentStep === 0 && <StepOne />}
                {currentStep === 1 && <StepTwo />}
                {currentStep === 2 && <StepThree />}
                {currentStep === 3 && <StepFour />}
              </Col>
              {currentStep === 4 && <StepFive />}
            </Row>
          </ProjectContext.Provider>
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
