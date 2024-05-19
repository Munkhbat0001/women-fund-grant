import React from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, Row, Col } from "antd";
import { validator } from "../../utils/validator";

const StepTwo = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        labelWrap
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ width: 800, justify: "center" }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
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
                        remove(field.name);
                      }}
                    />
                  }
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
                    <Form.List name={[field.name, "list"]}>
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
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                }
                              >
                                <Form.Item
                                  name={[subField.name, "description"]}
                                  rules={validator()
                                    .required("Тайлбар оруулна уу")
                                    .build()}
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
      </Form>
    </>
  );
};

export default StepTwo;
