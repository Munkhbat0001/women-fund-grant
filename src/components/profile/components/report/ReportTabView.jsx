import React, { forwardRef, useState } from "react";
import { Tabs } from "antd";
import Screen from "../../../../screens/modal/Screen";
import ReportStep1View from "./ReportStep1View";
import ReportStep2View from "./ReportStep2View";
import ReportStep3View from "./ReportStep3View";
import ReportStep4View from "./ReportStep4View";
import ReportStep5View from "./ReportStep5View";
import ReportIntegratedStep5View from "./ReportIntegratedStep5View";

const ReportTabView = ({ integrated = false, ...other }, ref) => {
  const [data, setData] = useState({});
  const props = {
    title: "Тайлан",
    footer: null,
    width: "90vw",
    clearScreen: (row) => {
      setData(row);
    },
    ...other,
  };

  const items = [
    {
      key: "1",
      label: `Үйл ажиллагааны хэрэгжилт`,
      children: <ReportStep1View report={data} {...other} />,
    },
    {
      key: "2",
      label: `Тоон мэдээлэл`,
      children: <ReportStep2View report={data} {...other} />,
    },
    {
      key: "3",
      label: `Санхүүгийн тайлан`,
      children: <ReportStep3View report={data} {...other} />,
    },

    // {
    //   key: "6",
    //   label: `Явцын үр дүн`,
    //   children: <ProjectDonor data={data} {...other} />,
    // },
  ];
  if (integrated) {
    items.push(
      {
        key: "4",
        label: `Зорилго, зорилтын биелэлт`,
        children: <ReportStep4View report={data} {...other} />,
      },
      {
        key: "6",
        label: `Явцын үр дүн`,
        children: <ReportIntegratedStep5View report={data} {...other} />,
      }
    );
  } else {
    items.push({
      key: "5",
      label: `Явцын үр дүн`,
      children: <ReportStep5View report={data} {...other} />,
    });
  }

  return (
    <Screen ref={ref} {...props}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{ padding: 0, margin: 0 }}
      />
    </Screen>
  );
};

export default forwardRef(ReportTabView);
