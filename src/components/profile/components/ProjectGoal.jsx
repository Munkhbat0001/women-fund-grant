import { Card, Collapse, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../../hooks";
import { CUSTOMER_PROJECT_GOAL_GET } from "../../../utils/operation";

const ProjectGoal = ({ data = {}, ...other }) => {
  const [goal, setGoal] = useState([]);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_GOAL_GET.format(data?.projectId)).then((res) => {
      console.log("goal: ", res);
      setGoal(res);
    });
  }, []);

  return (
    <>
      {goal.map((item, index) => {
        return (
          <>
            <Collapse collapsible="header" defaultActiveKey={["1"]}>
              <Collapse.Panel header={`Зорилго ${index + 1}`} key="1">
                <>
                  <Descriptions
                    bordered
                    size="small"
                    layout="vertical"
                    column={4}
                  >
                    <Descriptions.Item label="Тайлбар:" span={2}>
                      {item?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Хүлээгдэж буй үр дүн:" span={2}>
                      {item?.resultWaiting}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                      span={2}
                    >
                      {item?.resultMeasure}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Учирч болзошгүй саад бэрхшээл:"
                      span={2}
                    >
                      {item?.problem}
                    </Descriptions.Item>
                  </Descriptions>
                  <br />
                  {item.goalObjects.map((object, subIndex) => {
                    return (
                      <>
                        <Card
                          type="inner"
                          title={`Зорилт ${subIndex + 1}`}
                          size="small"
                          headStyle={{
                            backgroundColor: "#935dde",
                            color: "white",
                          }}
                        >
                          <Descriptions
                            bordered
                            size="small"
                            layout="vertical"
                            column={4}
                          >
                            <Descriptions.Item label="Тайлбар:" span={2}>
                              {object?.description}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Хүлээгдэж буй үр дүн:"
                              span={2}
                            >
                              {object?.resultWaiting}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                              span={2}
                            >
                              {object?.resultMeasure}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Учирч болзошгүй саад бэрхшээл:"
                              span={2}
                            >
                              {object?.problem}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      </>
                    );
                  })}
                </>
              </Collapse.Panel>
            </Collapse>
            <br />
          </>
        );
      })}
    </>
  );
};

export default ProjectGoal;
