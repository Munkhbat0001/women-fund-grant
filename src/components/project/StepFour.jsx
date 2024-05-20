import React from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Select,
} from "antd";
import OSelect from "../../screens/form/OSelect";
import OInputNumber from "../../screens/form/OInputNumber";
import { validator } from "../../utils/validator";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const StepFour = ({ next, prev }) => {
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
                  <Form.Item
                    label="Зорилт"
                    name={[field.name, "objectId"]}
                    rules={validator().required().build()}
                  >
                    <OSelect style={{ width: "100%" }} placeholder="сонгох" />
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
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "quantity"]}
                                      rules={validator()
                                        .required("Тоо, ширхэг оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Тоо, ширхэг"
                                        formatter={true}
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "measureUnit"]}
                                      rules={validator()
                                        .required("Хэмжих нэгж оруулна уу")
                                        .build()}
                                    >
                                      <OSelect
                                        placeholder="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт)"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "unitPrice"]}
                                      rules={validator()
                                        .required("Нэгж үнэ оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Нэгж үнэ"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "totalPrice"]}
                                      rules={validator()
                                        .required("Нийт үнэ оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Нийт үнэ"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "provider"]}
                                      rules={validator()
                                        .required(
                                          "Төсөл хэрэгжүүлэгч байгууллагаас оруулна уу"
                                        )
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Төсөл хэрэгжүүлэгч байгууллагаас"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}></Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "mnFund"]}
                                      rules={validator()
                                        .required(
                                          "Бусад эх үүсвэрээс оруулна уу"
                                        )
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Бусад эх үүсвэрээс"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "other"]}
                                      rules={validator()
                                        .required("МОНЭС-аас оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="МОНЭС-аас"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
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
        <Row justify="center">
          <Row gutter={12} justify="end" style={{ width: 800 }}>
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
                onClick={() => {
                  // form.submit();
                  next && next();
                }}
              >
                Үргэлжлүүлэх
              </Button>
            </Space>
          </Row>
        </Row>
      </Form>
    </>
  );
};

export default StepFour;
