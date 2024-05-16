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
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const StepFour = () => {
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
                                    <Form.Item name={[subField.name, "second"]}>
                                      <Input placeholder="Тоо, ширхэг" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item name={[subField.name, "second"]}>
                                      <OSelect
                                        placeholder="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт)"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item name={[subField.name, "second"]}>
                                      <Input placeholder="Нэгж үнэ" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "second2"]}
                                    >
                                      <Input placeholder="Нийт үнэ" />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item name={[subField.name, "second"]}>
                                      <Input placeholder="Төсөл хэрэгжүүлэгч байгууллагаас" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}></Col>
                                </Row>
                                <Row gutter={12}>
                                  <Col span={12}>
                                    <Form.Item name={[subField.name, "second"]}>
                                      <Input placeholder="Бусад эх үүсвэрээс" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "second2"]}
                                    >
                                      <Input placeholder="МОНЭС-аас" />
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
      </Form>
    </>
  );
};

export default StepFour;
