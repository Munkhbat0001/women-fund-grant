import React, { forwardRef, useContext, useEffect, useState } from "react";
import Screen from "../../screens/modal/Screen";
import { Col, Row, Steps, theme } from "antd";
import ProgressStep2 from "./components/ProgressStep2";
import ProgressStep3 from "./components/ProgressStep3";
import ProgressStep4 from "./components/ProgressStep4";
import { SystemContext } from "../../context/SystemContext";
import { useAxios } from "../../hooks";
import { REPORT_INTEGRATED, REPORT_PROGRESS } from "../../utils/operation";
import IntegratedStep1 from "./components/IntegratedStep1";
import IntegratedStep5 from "./components/IntegratedStep5";
import IntegratedStep4 from "./components/IntegratedStep4";
import IntegratedStep3 from "./components/IntegratedStep3";
import IntegratedStep2 from "./components/IntegratedStep2";

const items = [
  {
    title: "Үйл ажиллагааны хэрэгжилт",
  },
  {
    title: "Тоон мэдээлэл",
  },
  {
    title: "Санхүүгийн тайлан",
  },
  {
    title: "Зорилго, зорилтын биелэлт",
  },
  {
    title: "Явцын үр дүн",
  },
];

export const IntegratedContext = React.createContext({});

const IntegratedAdd = ({ ...other }, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectId, setProjectId] = useState(null);
  const [report, setReport] = useState(null);
  const { token } = theme.useToken();
  const { loading } = useContext(SystemContext);

  const props = {
    title: "Нэгдсэн тайлан бүртгэх",
    width: "100vw",
    footer: null,
    clearScreen: (row) => {
      setProjectId(row.projectId);
      getReport(row.projectId);
    },
    ...other,
  };

  const getReport = (projectId) => {
    useAxios(REPORT_INTEGRATED.format(projectId)).then((res) => {
      setReport(res);
      setCurrentStep(res.stepId);
    });
  };

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

  useEffect(() => {
    // useAxios(REPORT_PROGRESS.format()).then(() => {});
  }, []);

  const contextProps = {
    next,
    prev,
    currentStep,
    loading,
    projectId,
    setProjectId,
    report,
    setReport,
  };

  return (
    <>
      <Screen ref={ref} {...props}>
        <Steps
          current={currentStep}
          // onChange={onChangeStep}
          percent={60}
          items={items}
        />
        <br />
        <div style={contentStyle}>
          <IntegratedContext.Provider value={contextProps}>
            <Row justify="center">
              {/* <Col xs={24} sm={20} md={18} lg={16} xl={16}> */}
              <Col span={24}>
                {currentStep === 0 && <IntegratedStep1 />}
                {currentStep === 1 && <IntegratedStep2 />}
                {currentStep === 2 && <IntegratedStep3 />}
                {currentStep === 3 && <IntegratedStep4 />}
                {currentStep === 4 && <IntegratedStep5 />}
              </Col>
            </Row>
          </IntegratedContext.Provider>
        </div>
      </Screen>
    </>
  );
};

export default forwardRef(IntegratedAdd);
