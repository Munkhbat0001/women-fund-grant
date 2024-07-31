import React, { useContext, useEffect } from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, Row, Col } from "antd";
import { validator } from "../../utils/validator";
import { ProjectContext } from "../../pages/ProjectRequest";
import useAxios from "../../hooks/useAxios";
import {
  CUSTOMER_PROJECT_GOAL_ALL_POST,
  CUSTOMER_PROJECT_GOAL_DELETE,
  CUSTOMER_PROJECT_OBJECT_DELETE,
} from "../../utils/operation";

const StepTwo = ({}) => {
  const [form] = Form.useForm();
  const {
    project: { projectId, goalList },
    next,
    prev,
  } = useContext(ProjectContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (goalList && goalList.length > 0) {
      form.setFieldsValue({ items: goalList });
    } else {
      form.setFieldsValue({ items: [{ goalList: [{}] }] });
    }
  }, [goalList]);

  const onFinish = (values) => {
    useAxios(CUSTOMER_PROJECT_GOAL_ALL_POST.format(projectId), values.items, {
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
        // style={{ maxWidth: 800 }}
        autoComplete="off"
        // initialValues={{
        //   items: [{}],
        // }}
        // layout="vertical"
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
                  title={`Зорилго ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        const goal = form.getFieldsValue().items[field.name];
                        if (goal) {
                          useAxios(
                            CUSTOMER_PROJECT_GOAL_DELETE.format(goal.goalId),
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
                  style={{ width: "100%" }}
                >
                  {/* <Row gutter={12}>
                    <Col>
                      <Form.Item label="Тайлбар" name={[field.name, "name"]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col>
                    <Form.Item
                        label="Хүлээгдэж буй үр дүн"
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row> */}

                  {/* <Form.Item
                      label="Дугаар"
                      name={[field.name, "goalId"]}
                      rules={validator().required().build()}
                    >
                      <Input disabled />
                    </Form.Item> */}

                  <Form.Item
                    label="Тайлбар"
                    name={[field.name, "description"]}
                    rules={validator().required().build()}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item
                    label="Хүлээгдэж буй үр дүн"
                    name={[field.name, "resultWaiting"]}
                    rules={validator().required().build()}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    label="Үр дүнг хэмжих шалгуур үзүүлэлт"
                    name={[field.name, "resultMeasure"]}
                    rules={validator().required().build()}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    label="Учирч болзошгүй саад бэрхшээл"
                    name={[field.name, "problem"]}
                    rules={validator().required().build()}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Зорилтууд">
                    <Form.List name={[field.name, "goalObjects"]}>
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
                                title={`Зорилт ${subField.name + 1}`}
                                headStyle={{
                                  backgroundColor: "#ddf247",
                                }}
                                // headerBg="red"
                                extra={
                                  <CloseOutlined
                                    onClick={() => {
                                      const obj =
                                        form.getFieldsValue().items[field.name]
                                          .goalObjects[subField.name];
                                      if (obj) {
                                        useAxios(
                                          CUSTOMER_PROJECT_OBJECT_DELETE.format(
                                            obj.objectId
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
                                {/* <Form.Item
                                    label="Дугаар"
                                    name={[subField.name, "objectId"]}
                                    rules={validator().required().build()}
                                  >
                                    <Input disabled />
                                  </Form.Item> */}
                                <Form.Item
                                  // label="Тайлбар"
                                  name={[subField.name, "description"]}
                                  rules={validator()
                                    .required("Тайлбар оруулна уу")
                                    .build()}
                                  className="ant-form-item-label-wrap"
                                >
                                  <Input.TextArea placeholder="Тайлбар" />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "resultWaiting"]}
                                  rules={validator()
                                    .required("Хүлээгдэж буй үр дүн оруулна уу")
                                    .build()}
                                >
                                  <Input.TextArea placeholder="Хүлээгдэж буй үр дүн" />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "resultMeasure"]}
                                  rules={validator()
                                    .required(
                                      "Үр дүнг хэмжих шалгуур үзүүлэлт оруулна уу"
                                    )
                                    .build()}
                                >
                                  <Input.TextArea placeholder="Үр дүнг хэмжих шалгуур үзүүлэлт" />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "problem"]}
                                  rules={validator()
                                    .required(
                                      "Учирч болзошгүйсаад бэрхшээл оруулна уу"
                                    )
                                    .build()}
                                >
                                  <Input.TextArea placeholder="Учирч болзошгүйсаад бэрхшээл" />
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
                + Зорилго нэмэх
              </Button>
            </div>
          )}
        </Form.List>
        <br />
        <Col xs={{ flex: "100%" }}>
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
        </Col>
      </Form>
    </>
  );
};

export default StepTwo;
