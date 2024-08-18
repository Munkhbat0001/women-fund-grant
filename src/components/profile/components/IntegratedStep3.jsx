import {
  Button,
  Col,
  Collapse,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Card,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import OSelect from "../../../screens/form/OSelect";
import { InfoCircleOutlined } from "@ant-design/icons";
import { validator } from "../../../utils/validator";
import {
  CONST_PROJECT_GROUP,
  CONST_PROJECT_RESULT,
  CONST_REPORT_DONE,
  REPORT_BUDGET,
  REPORT_BUDGET_POST,
  REPORT_IMPLEMENT,
} from "../../../utils/operation";
import { useAxios } from "../../../hooks";
import OInputNumber from "../../../screens/form/OInputNumber";
import { IntegratedContext } from "../IntegratedAdd";
import { MEASURE_UNIT } from "../../../utils/constants";
import { formatMoney } from "../../../utils";

const IntegratedStep3 = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const scrollRef = useRef(null);
  const { prev, next, loading, projectId, report } =
    useContext(IntegratedContext);

  const onFinish = (values) => {
    const planList = [];
    values.items.map((item) =>
      item?.goalObjects.map((goal) => {
        goal?.planList.map((plan) => {
          planList.push({
            planId: plan.planId,
            reportAmountLast: plan.reportAmountLast,
          });
        });
      })
    );
    useAxios(REPORT_BUDGET_POST.format(report.projectId, 151), planList, {
      showSuccess: true,
      method: "POST",
    }).then((res) => {
      console.log("res: ", res);
      next && next();
    });
  };

  useEffect(() => {
    useAxios(REPORT_BUDGET.format(report.projectId, 151)).then((res) => {
      form.setFieldsValue({ items: res });
    });
  }, []);

  return (
    <>
      <Form
        ref={scrollRef}
        form={form}
        layout="vertical"
        colon={false}
        onFinish={onFinish}
        // style={{ maxWidth: 800, justify: "center" }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <Collapse size="small">
              {fields.map((field, index) => {
                const goal = form.getFieldsValue().items[field.name];
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
                        <Descriptions.Item
                          label="Хүлээгдэж буй үр дүн:"
                          span={2}
                        >
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
                      <Form.Item label="">
                        <Form.List name={[field.name, "goalObjects"]}>
                          {(subFields, subOpt) => {
                            return (
                              <>
                                {subFields.map((field2, subIndex) => {
                                  const object =
                                    form.getFieldsValue().items[field.name]
                                      .goalObjects[field2.name];

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
                                        <Descriptions.Item
                                          label="Тайлбар:"
                                          span={2}
                                        >
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

                                      <Form.Item label="">
                                        <Form.List
                                          name={[field2.name, "planList"]}
                                        >
                                          {(subFields2, subOpt) => {
                                            return (
                                              <>
                                                <Row gutter={12}>
                                                  {subFields2.map(
                                                    (field3, subIndex2) => {
                                                      const plan =
                                                        form.getFieldsValue()
                                                          .items[field.name]
                                                          .goalObjects[
                                                          field2.name
                                                        ].planList[field3.name];
                                                      return (
                                                        <Col span={12}>
                                                          <Card
                                                            type="inner"
                                                            title={`Үйл ажиллагаа ${
                                                              subIndex2 + 1
                                                            }`}
                                                            size="small"
                                                            style={{
                                                              marginTop: "10px",
                                                            }}
                                                            headStyle={{
                                                              backgroundColor:
                                                                "#935dde",
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
                                                                {
                                                                  MEASURE_UNIT[
                                                                    plan
                                                                      ?.measureUnit
                                                                  ]
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Нэгж үнэ:"
                                                                span={2}
                                                              >
                                                                {formatMoney(
                                                                  plan?.unitPrice
                                                                )}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Нийт үнэ:"
                                                                span={2}
                                                              >
                                                                {formatMoney(
                                                                  plan?.totalPrice
                                                                )}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                                                                span={2}
                                                              >
                                                                {formatMoney(
                                                                  plan?.provider
                                                                )}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Бусад эх үүсвэрээс:"
                                                                span={2}
                                                              >
                                                                {formatMoney(
                                                                  plan?.other
                                                                )}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="МОНЭС-аас:"
                                                                span={2}
                                                              >
                                                                {formatMoney(
                                                                  plan?.mnFund
                                                                )}
                                                              </Descriptions.Item>
                                                            </Descriptions>
                                                            <br />
                                                            <Form.Item
                                                              label="Хэрэгжүүлсэн дүн"
                                                              name={[
                                                                field3.name,
                                                                "reportAmountLast",
                                                              ]}
                                                              // rules={validator()
                                                              //   .required()
                                                              //   .build()}
                                                            >
                                                              <OInputNumber
                                                                placeholder="Хэрэгжүүлсэн дүн"
                                                                style={{
                                                                  width: "100%",
                                                                }}
                                                              />
                                                            </Form.Item>
                                                          </Card>
                                                        </Col>
                                                      );
                                                    }
                                                  )}
                                                </Row>
                                              </>
                                            );
                                          }}
                                        </Form.List>
                                      </Form.Item>
                                    </Card>
                                  );
                                })}
                              </>
                            );
                          }}
                        </Form.List>
                      </Form.Item>
                    </Collapse.Panel>
                  </>
                );
              })}
            </Collapse>
          )}
        </Form.List>
        <br />
        <Row gutter={12} justify="end">
          <Space>
            <Button
              onClick={() => {
                prev && prev();
              }}
            >
              Буцах
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Үргэлжлүүлэх
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export default IntegratedStep3;
