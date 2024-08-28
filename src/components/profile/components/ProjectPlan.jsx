import { Card, Collapse, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useAxios } from "../../../hooks";
import {
  CUSTOMER_PROJECT_GOAL_PLAN,
  CUSTOMER_PROJECT_PLAN_GET,
} from "../../../utils/operation";
import { formatMoney } from "../../../utils";
import { MEASURE_UNIT } from "../../../utils/constants";

const ProjectPlan = ({ data = {}, ...other }) => {
  const [plan, setPlan] = useState([]);
  const [goal, setGoal] = useState([]);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_GOAL_PLAN.format(data.projectId)).then((res) => {
      setGoal(res.goalList);
    });
    // useAxios(CUSTOMER_PROJECT_PLAN_GET.format(data.projectId)).then((res) => {
    //   const items = [];
    //   res.list.map((plan) => {
    //     const item = items.find((x) => x.objectId === plan.objectId);
    //     if (isEmpty(item)) {
    //       plan.planList = [{ ...plan }];
    //       items.push(plan);
    //     } else {
    //       item.planList.push(plan);
    //     }
    //   });
    //   setPlan(items);
    // });
  }, []);

  return (
    <>
      {goal.map((goal, i) => {
        return (
          <>
            <Collapse collapsible="header" defaultActiveKey={["1"]}>
              <Collapse.Panel header={`Зорилго ${i + 1}`} key="1">
                {goal.goalObjects.map((item, index) => {
                  return (
                    <>
                      <Collapse collapsible="header" key={index + 1}>
                        <Collapse.Panel header={`Зорилт ${index + 1}`}>
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
                              <Descriptions.Item
                                label="Хүлээгдэж буй үр дүн:"
                                span={2}
                              >
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
                            {item?.planList.map((child, subIndex) => {
                              return (
                                <>
                                  <Card
                                    type="inner"
                                    title={`Үйл ажиллагаа ${subIndex + 1}`}
                                    size="small"
                                    headStyle={{
                                      backgroundColor: "#935dde",
                                      color: "white",
                                    }}
                                  >
                                    <Descriptions
                                      bordered
                                      size="small"
                                      column={1}
                                    >
                                      <Descriptions.Item
                                        label="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц:"
                                        span={2}
                                      >
                                        {child?.requirement}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label="Эхлэх огноо:"
                                        span={2}
                                      >
                                        {child?.beginDate}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label="Дуусах огноо:"
                                        span={2}
                                      >
                                        {child?.endDate}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label="Хариуцах эзэн:"
                                        span={2}
                                      >
                                        {child?.ownerName}
                                      </Descriptions.Item>
                                    </Descriptions>
                                    <br />
                                    <Card
                                      size="small"
                                      bordered
                                      title="Төсвийн санал"
                                    >
                                      <Descriptions
                                        bordered
                                        size="small"
                                        column={1}
                                      >
                                        <Descriptions.Item label="Тоо, ширхэг:">
                                          {child?.quantity}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Хэмжих нэгж:">
                                          {MEASURE_UNIT[child?.measureUnit]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Нэгж үнэ:">
                                          {formatMoney(child?.unitPrice)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Нийт үнэ:">
                                          {formatMoney(child?.totalPrice)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Төсөл хэрэгжүүлэгч байгууллагаас:">
                                          {formatMoney(child?.provider)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Бусад эх үүсвэрээс:">
                                          {formatMoney(child?.mnFund)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="МОНЭС-аас:">
                                          {formatMoney(child?.other)}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </Card>
                                  </Card>
                                  <br />
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
              </Collapse.Panel>
            </Collapse>
            <br />
          </>
        );
      })}
    </>
  );
};

export default ProjectPlan;
