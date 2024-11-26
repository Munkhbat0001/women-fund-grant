import { Button, Col, Form, Input, Row, Space, theme, Typography } from "antd";
import { validator } from "../utils/validator";
import React from "react";
import OSelect from "../screens/form/OSelect";
import OInputNumber from "../screens/form/OInputNumber";
import { CONST_SURVEY_PROPERTY, SURVEY_BEFORE_POST } from "../utils/operation";
import useAxios from "../hooks/useAxios";
import { SaveOutlined } from "@ant-design/icons";
const { Title } = Typography;

const SurveyBefore = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    padding: 16,
  };

  const onFinish = (values) => {
    useAxios(SURVEY_BEFORE_POST, values, {
      method: "POST",
      showSuccess: true,
    }).then((res) => {});
  };

  return (
    <div className="container">
      <div className="pt-[150px] pb-[100px]">
        <div style={contentStyle}>
          <Row justify="center">
            <Col xs={24} sm={20} md={18} lg={16} xl={16}>
              <Title level={3}>Тэтгэлгийн өмнөх судалгаа</Title>
              <Form
                form={form}
                layout="vertical"
                colon={false}
                onFinish={onFinish}
                style={{ maxWidth: 800, justify: "center" }}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="mainStrategy"
                      label="Танай байгууллагын үндсэн стратеги юу вэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллагын үндсэн стратеги юу вэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="monitoring"
                      label="Танай байгууллага хяналт, шинжилгээ-үнэлгээг үйл ажиллагаандаа хийдэг үү, тийм бол хэрхэн хийдэг вэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллага хяналт, шинжилгээ-үнэлгээг үйл ажиллагаандаа хийдэг үү, тийм бол хэрхэн хийдэг вэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="targetGroup"
                      label="Танай байгууллага үйл ажиллагаандаа өөрсдийн зорилтот бүлгийн хамт олон, олон нийтийн оролцоог хэрхэн хангадаг вэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллага үйл ажиллагаандаа өөрсдийн зорилтот бүлгийн хамт олон, олон нийтийн оролцоог хэрхэн хангадаг вэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="consider"
                      label="Танай байгууллага ажилчдынхаа сайн сайхан байдал, хамтын халамжинд хэрхэн анхаардаг вэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллага ажилчдынхаа сайн сайхан байдал, хамтын халамжинд хэрхэн анхаардаг вэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="alliance"
                      label="Танай байгууллага ямар нэгэн сүлжээ, эвслийн гишүүн үү, тийм бол ямар сүлжээ эвсэлд нэгдсэн бэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллага ямар нэгэн сүлжээ, эвслийн гишүүн үү, тийм бол ямар сүлжээ эвсэлд нэгдсэн бэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="propertyId"
                      label="Танай байгууллагын оффисын эзэмшлийн хэлбэр эдгээрийн аль нь вэ?"
                      rules={validator().required().build()}
                    >
                      <OSelect
                        placeholder="Танай байгууллагын оффисын эзэмшлийн хэлбэр эдгээрийн аль нь вэ?"
                        selectAPI={CONST_SURVEY_PROPERTY}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Title level={5}>
                    Танай байгууллагын жилийн төсөвт зардлын эзлэх хувь
                  </Title>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      name="salaryExpenses"
                      label="Цалингийн зардал"
                      rules={validator().required().build()}
                    >
                      <OInputNumber
                        placeholder="Цалингийн зардал"
                        addonAfter="%"
                        maxLength={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="operatingExpenses"
                      label="Үйл ажиллагааны зардал"
                      rules={validator().required().build()}
                    >
                      <OInputNumber
                        placeholder="Үйл ажиллагааны зардал"
                        addonAfter="%"
                        maxLength={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="managementExpenses"
                      label="Захиргааны зардал"
                      rules={validator().required().build()}
                    >
                      <OInputNumber
                        placeholder="Захиргааны зардал"
                        addonAfter="%"
                        maxLength={3}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="implementProject"
                      label="Танай байгууллага ямар нэг төсөл, хөтөлбөр хэрэгжүүлж байсан уу? Хэрэв тийм бол, өмнөх хэрэгжүүлэлтэд нь ямар нэгэн хүндрэл, бэрхшээл тулгарч байсан эсэхийг дэлгэрэнгүй бичнэ үү."
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Танай байгууллага ямар нэг төсөл, хөтөлбөр хэрэгжүүлж байсан уу? Хэрэв тийм бол, өмнөх хэрэгжүүлэлтэд нь ямар нэгэн хүндрэл, бэрхшээл тулгарч байсан эсэхийг дэлгэрэнгүй бичнэ үү." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="financeReport"
                      label="Танай байгууллагад анхан шатны баримт бүрдүүлэлтээ хангаж,
     нягтлан бодох бүртгэлийн дагуу санхүүгийн тайлангаа тогтмол гаргахад асуудал гардаг уу?
     Хэрэв тийм бол, санхүүгийн тайлан, баримт бүрдүүлэлт дээр ямар дэмжлэг,
     туслалцаа хэрэгтэй байдаг талаар дэлгэрэнгүй бичнэ үү."
                      rules={validator().required().build()}
                    >
                      <Input.TextArea
                        placeholder="Танай байгууллагад анхан шатны баримт бүрдүүлэлтээ хангаж,
     нягтлан бодох бүртгэлийн дагуу санхүүгийн тайлангаа тогтмол гаргахад асуудал гардаг уу?
     Хэрэв тийм бол, санхүүгийн тайлан, баримт бүрдүүлэлт дээр ямар дэмжлэг,
     туслалцаа хэрэгтэй байдаг талаар дэлгэрэнгүй бичнэ үү."
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="lastThreeMaxFunding"
                      label="Боломжтой бол, сүүлийн 3 жилийн хугацаанд хамгийн их санхүүжилт олгосон донор болон санхүүжилтийн хэмжээг хуваалцана уу."
                    >
                      <Input.TextArea placeholder="Боломжтой бол, сүүлийн 3 жилийн хугацаанд хамгийн их санхүүжилт олгосон донор болон санхүүжилтийн хэмжээг хуваалцана уу." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Row gutter={12} justify="end" style={{ width: 800 }}>
                    <Space>
                      <Button
                        icon={<SaveOutlined />}
                        type="primary"
                        onClick={() => form.submit()}
                        // loading={loading}
                      >
                        Илгээх
                      </Button>
                    </Space>
                  </Row>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SurveyBefore;
