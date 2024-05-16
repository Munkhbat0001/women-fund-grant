import React from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, Row, Col } from "antd";
import OSelect from "../../screens/form/OSelect";

const StepThree = () => {
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
                  title={`Зорилт ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Зорилт" name={[field.name, "description"]}>
                    <OSelect style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Үйл ажиллагаа">
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
                                title={`Үйл ажиллагаа ${subField.name + 1}`}
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
                                <Form.Item name={[subField.name, "second"]}>
                                  <Input.TextArea placeholder="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц" />
                                </Form.Item>
                                <Form.Item name={[subField.name, "second"]}>
                                  <Input.TextArea placeholder="Хэрэгжүүлэх хугацаа" />
                                </Form.Item>
                                <Form.Item name={[subField.name, "third"]}>
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
      </Form>
    </>
  );
};

export default StepThree;
