import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import { validator } from "../utils/validator";
import React from "react";
import { SaveOutlined } from "@ant-design/icons";
import useAxios from "../hooks/useAxios";
import { SURVEY_AFTER_POST } from "../utils/operation";
const { Title } = Typography;
const SurveyAfter = () => {
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
    console.log("values: ", values);
    useAxios(SURVEY_AFTER_POST, values, {
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
              <Title level={3}>Тэтгэлгийн дараах судалгаа бөглөх</Title>
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
                      name="firstFunding"
                      label="Энэхүү тэтгэлийн санхүүжилт нь танай байгууллагын анхны санхүүжилт эсэх"
                      rules={validator().required().build()}
                    >
                      <Radio.Group>
                        <Radio value={true}> Тийм </Radio>
                        <Radio value={false}> Үгүй </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="firstProject"
                      label="Энэхүү төсөл нь танай байгууллагын хэрэгжүүлсэн анхны төсөл эсэх"
                      rules={validator().required().build()}
                    >
                      <Radio.Group>
                        <Radio value={true}> Тийм </Radio>
                        <Radio value={false}> Үгүй </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="budget"
                      label="Энэхүү тэтгэлгийн санхүүжилт нь танай байгууллагын жилийн төсвийн хэдэн хувийг эзэлж байна вэ?"
                      rules={validator().required().build()}
                    >
                      <Input.TextArea placeholder="Энэхүү тэтгэлгийн санхүүжилт нь танай байгууллагын жилийн төсвийн хэдэн хувийг эзэлж байна вэ?" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="fundAdvance"
                      label="Тэтгэлэг олгох үйл ажиллагаатай холбоотой санал хүсэлт байвал энд бичнэ үү."
                    >
                      <Input.TextArea placeholder="Тэтгэлэг олгох үйл ажиллагаатай холбоотой санал хүсэлт байвал энд бичнэ үү." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="participate"
                      label="Тэтгэлэг олгох хөтөлбөрөөс гадна тэтгэлгийн түнш болон хөдөлгөөнийг
   бэхжүүлэх зорилгын хүрээнд МОНЭС-ийн зохион байгуулдаг бусад
   үйл ажиллагаанд оролцох хүсэлтэй байгаа эсэх"
                      rules={validator().required().build()}
                    >
                      <Radio.Group>
                        <Radio value={true}> Тийм </Radio>
                        <Radio value={false}> Үгүй </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="feedback"
                      label="Тэтгэлэг олгох хөтөлбөрөөс гадна тэтгэлгийн түнш болон хөдөлгөөнийг
     бэхжүүлэх зорилгын хүрээнд МОНЭС-аас цаашид ямар үйл ажиллагаа зохион
     байгуулахыг хүсч байгаа талаарх саналаа энд бичнэ үү."
                    >
                      <Input.TextArea
                        placeholder="Тэтгэлэг олгох хөтөлбөрөөс гадна тэтгэлгийн түнш болон хөдөлгөөнийг
     бэхжүүлэх зорилгын хүрээнд МОНЭС-аас цаашид ямар үйл ажиллагаа зохион
     байгуулахыг хүсч байгаа талаарх саналаа энд бичнэ үү."
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="other"
                      label="Бусад санал хүсэлтээ энд бичнэ үү."
                    >
                      <Input.TextArea placeholder="Бусад санал хүсэлтээ энд бичнэ үү." />
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

export default SurveyAfter;
