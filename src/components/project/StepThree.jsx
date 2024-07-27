import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, Row, Col } from "antd";
import OSelect from "../../screens/form/OSelect";
import OInputNumber from "../../screens/form/OInputNumber";
import { validator } from "../../utils/validator";
import {
  CUSTOMER_PROJECT_GOAL,
  CUSTOMER_PROJECT_OBJECT,
  CUSTOMER_PROJECT_PLAN_ALL_POST,
  CUSTOMER_PROJECT_PLAN_DELETE,
  CUSTOMER_PROJECT_PLAN_OBJECT_DELETE,
} from "../../utils/operation";
import { ProjectContext } from "../../pages/ProjectRequest";
import useAxios from "../../hooks/useAxios";
import { isEmpty } from "lodash";

const StepThree = ({}) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const {
    project: { projectId, planList },
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
    if (planList && planList.length > 0) {
      const items = [];
      planList.map((plan) => {
        const item = items.find((x) => x.objectId === plan.objectId);
        if (isEmpty(item)) {
          plan.planList = [{ ...plan }];
          items.push(plan);
        } else {
          item.planList.push(plan);
        }
      });

      form.setFieldsValue({ items: items });
    } else {
      form.setFieldsValue({ items: [{ planList: [{}] }] });
    }
  }, [planList]);

  const onFinish = (values) => {
    useAxios(CUSTOMER_PROJECT_PLAN_ALL_POST.format(projectId), values.items, {
      method: "POST",
      showSuccess: true,
    }).then((res) => {
      next && next();
    });
  };

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        labelWrap
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 800 }}
        autoComplete="off"
        // initialValues={{
        //   items: [{}],
        // }}
        onFinish={onFinish}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Зорилт ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        const plan = form.getFieldsValue().items[field.name];
                        if (plan) {
                          useAxios(
                            CUSTOMER_PROJECT_PLAN_OBJECT_DELETE.format(
                              plan.projectId,
                              plan.objectId
                            ),
                            {},
                            {
                              method: "DELETE",
                              showSuccess: true,
                            }
                          ).then((res) => {
                            remove(field.name);
                          });
                        } else {
                          remove(field.name);
                        }
                      }}
                    />
                  }
                >
                  {/* <Form.Item
                    label="Зорилго"
                    name={[field.name, "goalId"]}
                    rules={validator().required().build()}
                  >
                    <OSelect
                      style={{ width: "100%" }}
                      placeholder="сонгох"
                      selectAPI={CUSTOMER_PROJECT_GOAL + `/${projectId}`}
                      selectName="description"
                      selectValue="goalId"
                    />
                  </Form.Item> */}

                  <Form.Item
                    label="Зорилт"
                    name={[field.name, "objectId"]}
                    rules={validator().required().build()}
                  >
                    <OSelect
                      style={{ width: "100%" }}
                      placeholder="сонгох"
                      // selectAPI={
                      //   CUSTOMER_PROJECT_OBJECT + `/${projectId}/object`
                      // }
                      options={options}
                      selectName="description"
                      selectValue="objectId"
                    />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Үйл ажиллагаа">
                    <Form.List name={[field.name, "planList"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <div>
                              <Card
                                size="small"
                                bordered
                                title={`Үйл ажиллагаа ${subField.name + 1}`}
                                headStyle={{
                                  backgroundColor: "#ddf247",
                                }}
                                // headerBg="red"
                                extra={
                                  <CloseOutlined
                                    onClick={() => {
                                      const plan =
                                        form.getFieldsValue().items[field.name]
                                          .planList[subField.name];
                                      if (plan) {
                                        useAxios(
                                          CUSTOMER_PROJECT_PLAN_DELETE.format(
                                            plan.planId
                                          ),
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
                                    }}
                                  />
                                }
                              >
                                <Form.Item
                                  name={[subField.name, "requirement"]}
                                  rules={validator()
                                    .required(
                                      "Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц оруулна уу"
                                    )
                                    .build()}
                                >
                                  <Input.TextArea
                                    placeholder="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "termUnit"]}
                                  rules={validator()
                                    .required("Хэрэгжүүлэх хугацаа оруулна уу")
                                    .build()}
                                >
                                  <OInputNumber
                                    placeholder="Хэрэгжүүлэх хугацаа"
                                    style={{ width: "100%" }}
                                  />
                                  {/* <OSelect
                                    placeholder="Хэрэгжүүлэх хугацаа"
                                    style={{ width: "100%" }}
                                  /> */}
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "ownerName"]}
                                  rules={validator()
                                    .required("Хариуцах эзэн оруулна уу")
                                    .build()}
                                >
                                  <Input.TextArea placeholder="Хариуцах эзэн" />
                                </Form.Item>
                              </Card>
                            </div>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Зорилт нэмэх
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Зорилт нэмэх
              </Button>
            </div>
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
