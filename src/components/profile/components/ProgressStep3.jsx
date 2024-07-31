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
import { ProgressContext } from "../ProgressAdd";
import { resetComponent } from "@ant-design/pro-components";

const ProgressStep3 = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const scrollRef = useRef(null);
  const { prev, next, loading, projectId, report } =
    useContext(ProgressContext);

  const onFinish = (values) => {
    const budgetList = [];
    values.items.map((item) =>
      item?.goalObjects.map((goal) => {
        goal?.budgetList.map((budget) => {
          budgetList.push({
            budgetId: budget.budgetId,
            reportAmount: budget.reportAmount,
          });
        });
      })
    );
    useAxios(REPORT_BUDGET_POST.format(projectId, 150), budgetList, {
      showSuccess: true,
      method: "POST",
    }).then((res) => {
      console.log("res: ", res);
      next && next();
    });
  };

  useEffect(() => {
    useAxios(REPORT_BUDGET.format(projectId, 150)).then((res) => {
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
                                          name={[field2.name, "budgetList"]}
                                        >
                                          {(subFields2, subOpt) => {
                                            return (
                                              <>
                                                <Row gutter={12}>
                                                  {subFields2.map(
                                                    (field3, subIndex2) => {
                                                      const budget =
                                                        form.getFieldsValue()
                                                          .items[field.name]
                                                          .goalObjects[
                                                          field2.name
                                                        ].budgetList[
                                                          field3.name
                                                        ];
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
                                                                {
                                                                  budget?.quantity
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт):"
                                                                span={2}
                                                              >
                                                                {
                                                                  budget?.measureUnit
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Нэгж үнэ:"
                                                                span={2}
                                                              >
                                                                {
                                                                  budget?.unitPrice
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Нийт үнэ:"
                                                                span={2}
                                                              >
                                                                {
                                                                  budget?.totalPrice
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                                                                span={2}
                                                              >
                                                                {
                                                                  budget?.provider
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Бусад эх үүсвэрээс:"
                                                                span={2}
                                                              >
                                                                {budget?.other}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="МОНЭС-аас:"
                                                                span={2}
                                                              >
                                                                {budget?.mnFund}
                                                              </Descriptions.Item>
                                                            </Descriptions>
                                                            <br />
                                                            <Form.Item
                                                              label="Хэрэгжүүлсэн дүн"
                                                              name={[
                                                                field3.name,
                                                                "reportAmount",
                                                              ]}
                                                              rules={validator()
                                                                .required()
                                                                .build()}
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
              // size="large"
              onClick={() => {
                prev && prev();
              }}
            >
              Буцах
            </Button>
            <Button
              // size="large"
              type="primary"
              onClick={() => form.submit()}
            >
              Илгээх
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export default ProgressStep3;
