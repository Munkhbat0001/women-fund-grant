import React, { forwardRef, useState } from "react";
import { Tabs } from "antd";
import Screen from "../../../screens/modal/Screen";
import ProjectInformation from "./ProjectInformation";
import ProjectGoal from "./ProjectGoal";
import ProjectPlan from "./ProjectPlan";
import ProjectBudget from "./ProjectBudget";
import ProjectMember from "./ProjectMember";
import ProjectDonor from "./ProjectDonor";

const ProjectTab = ({ disabled = true, mode, ...other }, ref) => {
  const [data, setData] = useState({});
  const props = {
    title: "Төсөл",
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
      label: `Төсөл`,
      children: <ProjectInformation data={data} {...other} />,
    },
    {
      key: "2",
      label: `Төслийн зорилго, зорилт`,
      children: <ProjectGoal data={data} {...other} />,
    },
    {
      key: "3",
      label: `Үйл ажиллагааны төлөвлөгөө`,
      children: <ProjectPlan data={data} {...other} />,
    },
    {
      key: "4",
      label: `Төсвийн санал`,
      children: <ProjectBudget data={data} {...other} />,
    },
    {
      key: "5",
      label: `Төсөл хэрэгжүүлэх баг`,
      children: <ProjectMember data={data} {...other} />,
    },
    {
      key: "6",
      label: `Санхүүжилт`,
      children: <ProjectDonor data={data} {...other} />,
    },
  ];

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

export default forwardRef(ProjectTab);
