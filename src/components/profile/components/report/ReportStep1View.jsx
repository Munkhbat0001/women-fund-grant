import { Col, Collapse, Descriptions, Form, Input, Row, Card } from "antd";
import React, { useEffect, useState } from "react";
// import OSelect from "../../../../screens/form/OSelect";
import {
  CONST_REPORT_DONE,
  REPORT_IMPLEMENT,
} from "../../../../utils/operation";
import { useAxios } from "../../../../hooks";

const ReportStep1View = ({ report, ...other }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    useAxios(REPORT_IMPLEMENT.format(report.projectId, 150)).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Collapse size="small">
        {data.map((goal, index) => {
          return (
            <>
              <Collapse.Panel header={`Зорилго ${index + 1}`} key={index}>
                <Descriptions
                  bordered
                  size="small"
                  layout="vertical"
                  column={4}
                >
                  <Descriptions.Item label="Тайлбар:" span={2}>
                    {goal?.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Хүлээгдэж буй үр дүн:" span={2}>
                    {goal?.resultWaiting}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                    span={2}
                  >
                    {goal?.resultMeasure}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Учирч болзошгүй саад бэрхшээл:"
                    span={2}
                  >
                    {goal?.problem}
                  </Descriptions.Item>
                </Descriptions>
                {goal?.goalObjects.map((object, subIndex) => {
                  return (
                    <Card
                      type="inner"
                      title={`Зорилт ${subIndex + 1}`}
                      size="small"
                      headStyle={{
                        backgroundColor: "#935dde",
                        color: "white",
                      }}
                      style={{ marginTop: "10px" }}
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

                      {object?.iplanList.map((plan, subIndex2) => {
                        return (
                          <Col span={12}>
                            <Card
                              type="inner"
                              title={`Үйл ажиллагаа ${subIndex2 + 1}`}
                              size="small"
                              style={{
                                marginTop: "10px",
                              }}
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
                                <Descriptions.Item
                                  label="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц:"
                                  span={2}
                                >
                                  {plan?.requirement}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  label="Хэрэгжүүлэх хугацаа:"
                                  span={2}
                                >
                                  {plan?.termUnit}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  label="Хариуцах эзэн:"
                                  span={2}
                                >
                                  {plan?.ownerName}
                                </Descriptions.Item>
                              </Descriptions>
                              <br />
                              <Descriptions
                                bordered
                                size="small"
                                title="Тайлан"
                                layout="vertical"
                                column={4}
                              >
                                <Descriptions.Item
                                  label="Хийгдсэн эсэх"
                                  span={2}
                                >
                                  {plan?.doneName}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  label="Дэлгэрэнгүй тайлбар"
                                  span={2}
                                >
                                  {plan?.description}
                                </Descriptions.Item>
                              </Descriptions>
                            </Card>
                          </Col>
                        );
                      })}
                    </Card>
                  );
                })}
              </Collapse.Panel>
            </>
          );
        })}
      </Collapse>
    </>
  );
};

export default ReportStep1View;
