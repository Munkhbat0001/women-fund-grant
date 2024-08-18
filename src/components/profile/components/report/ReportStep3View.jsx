import { Col, Collapse, Descriptions, Card, Row } from "antd";
import React, { useEffect, useState } from "react";
import { REPORT_BUDGET } from "../../../../utils/operation";
import { useAxios } from "../../../../hooks";
import { MEASURE_UNIT } from "../../../../utils/constants";
import { formatMoney } from "../../../../utils";

const ReportStep3View = ({ report }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    useAxios(REPORT_BUDGET.format(report.projectId, 151)).then((res) => {
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
                {goal.goalObjects.map((object, subIndex) => {
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
                      <Row gutter={24}>
                        {object?.planList.map((plan, subIndex2) => {
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
                                    label="Тоо, ширхэг:"
                                    span={2}
                                  >
                                    {plan?.quantity}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт):"
                                    span={2}
                                  >
                                    {MEASURE_UNIT[plan?.measureUnit]}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Нэгж үнэ:" span={2}>
                                    {formatMoney(plan?.unitPrice)}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Нийт үнэ:" span={2}>
                                    {formatMoney(plan?.totalPrice)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                                    span={2}
                                  >
                                    {formatMoney(plan?.provider)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="Бусад эх үүсвэрээс:"
                                    span={2}
                                  >
                                    {formatMoney(plan?.other)}
                                  </Descriptions.Item>
                                  <Descriptions.Item
                                    label="МОНЭС-аас:"
                                    span={2}
                                  >
                                    {formatMoney(plan?.mnFund)}
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
                                    label="Хэрэгжүүлсэн дүн"
                                    span={2}
                                  >
                                    {formatMoney(plan?.reportAmount) || 0}
                                  </Descriptions.Item>
                                </Descriptions>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
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

export default ReportStep3View;
