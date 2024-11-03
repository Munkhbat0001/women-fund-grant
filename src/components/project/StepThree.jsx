import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Row,
  Col,
  Descriptions,
  DatePicker,
  notification,
  Typography,
} from "antd";
import { validator } from "../../utils/validator";
import {
  CONST_PROJECT_BUDGET_MEASURE,
  CUSTOMER_PROJECT_OBJECT,
  CUSTOMER_PROJECT_PLAN_ALL_POST,
  CUSTOMER_PROJECT_PLAN_DELETE,
} from "../../utils/operation";
import { ProjectContext } from "../../pages/ProjectRequest";
import useAxios from "../../hooks/useAxios";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import OInputNumber from "../../screens/form/OInputNumber";
import OSelect from "../../screens/form/OSelect";
import BudgetFormList from "./components/BudgetFormList";
import { formatMoney } from "../../utils";
const { Title } = Typography;

const StepThree = ({}) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const {
    project: { projectId, goalList },
    next,
    prev,
  } = useContext(ProjectContext);

  // const [goalId, setGoalId] = React.useState(0);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_OBJECT + `/${projectId}/object`).then((res) => {
      setOptions(
        res.map((item) => ({
          value: item.objectId,
          label: item.description,
        }))
      );
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (planList && planList.length > 0) {
    // const items = goalList;
    // planList.map((plan) => {
    //   const item = items.find((x) => x.objectId === plan.objectId);
    //   if (isEmpty(item)) {
    //     plan.planList = [{ ...plan }];
    //     items.push(plan);
    //   } else {
    //     item.planList.push(plan);
    //   }
    // });

    goalList.map((goal) =>
      goal.goalObjects.map((obj) => {
        if (isEmpty(obj?.planList)) {
          obj.planList = [{}];
        } else {
          obj?.planList.map((plan) => {
            plan.beginDate = plan.beginDate && dayjs(plan.beginDate);
            plan.endDate = plan.endDate && dayjs(plan.endDate);
          });
        }
      })
    );

    form.setFieldsValue({ items: goalList });
    // form.setFieldsValue({ items: goalList });
    // } else {
    //   form.setFieldsValue({ items: [{ planList: [{}] }] });
    // }
  }, [goalList]);

  const onFinish = (values) => {
    try {
      const goalObjects = [];

      values.items.map((goal, index) => {
        goal.goalObjects.map((obj, objIndex) => {
          obj.planList.map((plan) => {
            if (!plan.budgetList || plan.budgetList.length === 0) {
              notification.warning({
                message: "Анхааруулга",
                description: `Зорилго ${index + 1} Зорилт ${
                  objIndex + 1
                } төсвийн санал дутуу байна`,
              });
              throw {};
            }
          });
          goalObjects.push(obj);
        });
      });

      useAxios(CUSTOMER_PROJECT_PLAN_ALL_POST.format(projectId), goalObjects, {
        method: "POST",
        showSuccess: true,
      }).then((res) => {
        next && next();
      });
    } catch (e) {}
  };

  const onClose = (field, field2, subFields2, subField, subOpt) => {
    const length =
      form.getFieldsValue().items[field.name].goalObjects[field2.name]?.planList
        .length;
    if (length == 1) {
      notification.warning({
        title: "Анхааруулга",
        description: "Хамгийн багадаа нэг үйл ажиллагаа оруулах ёстой",
      });
      return;
    }

    const plan =
      form.getFieldsValue().items[field.name].goalObjects[field2.name].planList[
        subField.name
      ];
    if (plan?.planId) {
      useAxios(
        CUSTOMER_PROJECT_PLAN_DELETE.format(plan.planId),
        {},
        {
          method: "DELETE",
          showSuccess: true,
        }
      ).then((res) => {
        subOpt.remove(subField.name);
      });
    } else {
      subOpt.remove(subField.name);
    }
  };

  const onCalculateAmount = (field, field2, subField) => {
    const items = form.getFieldsValue().items;
    const plan =
      form.getFieldsValue().items[field.name].goalObjects[field2.name].planList[
        subField.name
      ];

    if (plan) {
      const totalPrice = (plan.quantity || 0) * (plan.unitPrice || 0);
      items[field.name].goalObjects[field2.name].planList[
        subField.name
      ].totalPrice = totalPrice;

      form.setFieldsValue({ items });
    }
  };

  const getTotal = () => {
    const items = form.getFieldsValue().items;
    let total = 0;
    items.map((goal, index) => {
      goal?.goalObjects.map((obj, objIndex) => {
        obj?.planList.map((plan) => {
          plan?.budgetList?.map((budget) => {
            total += budget?.mnFund;
          });
        });
      });
    });
    return total;
  };

  return (
    <>
      <Form
        // labelCol={{ span: 6 }}
        // labelWrap
        // wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        // style={{ maxWidth: 800 }}
        autoComplete="off"
        // initialValues={{
        //   items: [{}],
        // }}
        onFinish={onFinish}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                const goal = form.getFieldsValue().items[field.name];
                return (
                  <Card
                    size="small"
                    title={`Зорилго ${field.name + 1}`}
                    key={field.key}
                  >
                    <Col span={24}>
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
                      <br />
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
                                      <br />
                                      <Form.Item>
                                        <Form.List
                                          name={[field2.name, "planList"]}
                                        >
                                          {(subFields2, subOpt) => {
                                            return (
                                              <>
                                                {subFields2.map((subField) => (
                                                  <div>
                                                    <Card
                                                      size="small"
                                                      bordered
                                                      title={`Үйл ажиллагаа ${
                                                        subField.name + 1
                                                      }`}
                                                      headStyle={{
                                                        backgroundColor:
                                                          "#ddf247",
                                                      }}
                                                      extra={
                                                        <CloseOutlined
                                                          onClick={() =>
                                                            onClose(
                                                              field,
                                                              field2,
                                                              subFields2,
                                                              subField,
                                                              subOpt
                                                            )
                                                          }
                                                        />
                                                      }
                                                    >
                                                      <Form.Item
                                                        name={[
                                                          subField.name,
                                                          "requirement",
                                                        ]}
                                                        rules={validator()
                                                          .required(
                                                            "Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц оруулна уу"
                                                          )
                                                          .build()}
                                                      >
                                                        <Input.TextArea
                                                          placeholder="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц"
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        />
                                                      </Form.Item>
                                                      <Row gutter={12}>
                                                        <Col span={12}>
                                                          <Form.Item
                                                            name={[
                                                              subField.name,
                                                              "beginDate",
                                                            ]}
                                                            rules={validator()
                                                              .required(
                                                                "Эхлэх огноо оруулна уу"
                                                              )
                                                              .build()}
                                                          >
                                                            <DatePicker
                                                              placeholder="Эхлэх огноо"
                                                              style={{
                                                                width: "100%",
                                                              }}
                                                            />
                                                          </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                          <Form.Item
                                                            name={[
                                                              subField.name,
                                                              "endDate",
                                                            ]}
                                                            rules={validator()
                                                              .required(
                                                                "Дуусах огноо оруулна уу"
                                                              )
                                                              .build()}
                                                          >
                                                            <DatePicker
                                                              placeholder="Дуусах огноо"
                                                              style={{
                                                                width: "100%",
                                                              }}
                                                            />
                                                          </Form.Item>
                                                        </Col>
                                                      </Row>
                                                      <Form.Item
                                                        name={[
                                                          subField.name,
                                                          "ownerName",
                                                        ]}
                                                        rules={validator()
                                                          .required(
                                                            "Хариуцах эзэн оруулна уу"
                                                          )
                                                          .build()}
                                                      >
                                                        <Input placeholder="Хариуцах эзэн" />
                                                      </Form.Item>
                                                    </Card>
                                                    <br />
                                                    <Form.Item>
                                                      <BudgetFormList
                                                        form={form}
                                                        name={field.name}
                                                        goalName={field2.name}
                                                        planName={subField.name}
                                                      />
                                                    </Form.Item>
                                                  </div>
                                                ))}
                                                <Button
                                                  type="dashed"
                                                  onClick={() => subOpt.add()}
                                                  block
                                                >
                                                  + Үйл ажиллагаа нэмэх
                                                </Button>
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
                    </Col>
                    <Row justify="end" style={{ marginRight: "30px" }}>
                      <Title level={5}>Нийт /{formatMoney(getTotal())}/</Title>
                    </Row>
                  </Card>
                );
              })}
            </>
          )}
        </Form.List>

        <br />
        <Col xs={{ flex: "100%" }}>
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
                Үргэлжлүүлэх
              </Button>
            </Space>
          </Row>
        </Col>
      </Form>
    </>
  );
};

export default StepThree;
