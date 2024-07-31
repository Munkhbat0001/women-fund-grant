import React, { forwardRef, useContext, useEffect, useState } from "react";
import Screen from "../../screens/modal/Screen";
import { Col, Row, Steps, theme } from "antd";
import ProgressStep1 from "./components/ProgressStep1";
import ProgressStep2 from "./components/ProgressStep2";
import ProgressStep3 from "./components/ProgressStep3";
import ProgressStep4 from "./components/ProgressStep4";
import { SystemContext } from "../../context/SystemContext";
import { useAxios } from "../../hooks";
import { REPORT_PROGRESS } from "../../utils/operation";

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
    title: "Явцын үр дүн",
  },
];

export const ProgressContext = React.createContext({});

const ProgressAdd = ({ afterSave, ...other }, ref) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectId, setProjectId] = useState(null);
  const [report, setReport] = useState(null);
  const [mode, setMode] = useState(null);
  const [project, setProject] = useState({});
  const { token } = theme.useToken();
  const { loading } = useContext(SystemContext);

  const props = {
    title: "Явцын тайлан бүртгэх",
    width: "100vw",
    footer: null,
    clearScreen: (row) => {
      setCurrentStep(0);
      if (row) {
        setProjectId(row.projectId);
        getReport(row.projectId);
        setMode(row.mode);
        setProject(row);
      } else {
        setProjectId(null);
        setReport(null);
        setMode("create");
      }
    },
    ...other,
  };

  const getReport = (projectId) => {
    useAxios(REPORT_PROGRESS.format(projectId)).then((res) => {
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
    afterSave,
    mode,
    project,
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
          <ProgressContext.Provider value={contextProps}>
            <Row justify="center">
              {/* <Col xs={24} sm={20} md={18} lg={16} xl={16}> */}
              <Col span={24}>
                {currentStep === 0 && <ProgressStep1 />}
                {currentStep === 1 && <ProgressStep2 />}
                {currentStep === 2 && <ProgressStep3 />}
                {currentStep === 3 && <ProgressStep4 />}
              </Col>
            </Row>
          </ProgressContext.Provider>
        </div>
      </Screen>
    </>
  );
};

export default forwardRef(ProgressAdd);
