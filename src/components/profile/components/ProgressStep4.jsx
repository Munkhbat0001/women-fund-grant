import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useRef } from "react";
import OSelect from "../../../screens/form/OSelect";
import { validator } from "../../../utils/validator";
import { REPORT_PROJECT_STATUS } from "../../../utils/operation";

const ProgressStep4 = () => {
  const [form] = Form.useForm();
  const scrollRef = useRef(null);

  const onFinish = (values) => {
    console.log("values: ", values);
  };

  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={20} md={18} lg={16} xl={16}>
          <Form
            ref={scrollRef}
            form={form}
            layout="vertical"
            colon={false}
            onFinish={onFinish}
            style={{ maxWidth: 800, justify: "center" }}
          >
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="test"
                  label="Тайлан бичсэн хүний нэр"
                  rules={validator().required().build()}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="processResultOne"
                  label="Энэхүү тайлангийн хугацаан дахь хамгийн ололт амжилттай зүйл юу байсан бэ?"
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="processResultTwo"
                  label="Уг төслийг хэрэгжүүлэхэд учирсан хүндрэл, сорилт бэрхшээл бий юу? тийм бол, хуваалцана уу?"
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="processResultThree"
                  label="Төслийг цаашдын хэрэгжилтэд юуг анхаарах шаардлагатай гэж үзэж байна вэ? "
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="additionalChanges"
                  label="Нэмэлт өөрчлөлт (хэрэв төслийн анхны саналд өөрчлөлт оруулах хүсэлт байвал үндэс, шалтгааны хамт энд бичнэ үү)"
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
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
                    Илгээх
                  </Button>
                </Space>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProgressStep4;
