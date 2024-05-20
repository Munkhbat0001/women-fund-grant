import React, { forwardRef } from "react";
import {
  Steps,
  Form,
  Space,
  Button,
  Input,
  Row,
  Col,
  theme,
  InputNumber,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { validator } from "../../utils/validator";
import OSelect from "../../screens/form/OSelect";
import OInputNumber from "../../screens/form/OInputNumber";

const StepOne = ({ next, prev }, ref) => {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        ref={ref}
        form={form}
        layout="vertical"
        colon={false}
        style={{ maxWidth: 800, justify: "center" }}
      >
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Төслийн нэр"
              rules={validator().required().build()}
            >
              <Input placeholder="Төслийн нэр" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="introduction"
              label="Үндэслэл"
              rules={validator().required().build()}
            >
              <Input placeholder="Үндэслэл"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="benefit"
              label="Төсөл хэрэгжүүлснээр охид, эмэгтэйчүүд, бэлгийн болон жендэрийн цөөнхөд тулгамдсан асуудлыг шийдвэрлэхэд ямар хувь нэмэр оруулах талаар 100 үгэнд багтаан бичнэ үү."
              // tooltip={{
              //   title:
              //     "Төсөл хэрэгжүүлснээр охид, эмэгтэйчүүд, бэлгийн болон жендэрийн цөөнхөд тулгамдсан асуудлыг шийдвэрлэхэд ямар хувь нэмэр оруулах талаар 100 үгэнд багтаан бичнэ үү.",
              //   icon: <InfoCircleOutlined />,
              // }}
              rules={validator().required().build()}
            >
              <Input.TextArea placeholder="Тайлбар" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="resultId"
              label="Хүлээгдэж буй үр дүн"
              tooltip={{
                title:
                  "Хүлээгдэж буй үр дүнтэй холбоотой тохирох үр дүнг сонгоно уу.",
                icon: <InfoCircleOutlined />,
              }}
              rules={validator().required().build()}
            >
              <OSelect
                placeholder="Хүлээгдэж буй үр дүн"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="groupId"
              label="Төслийн зорилтот бүлэг"
              rules={validator().required().build()}
            >
              <OSelect
                placeholder="Төслийн зорилтот бүлэг"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="directBenefitCount"
              label="Шууд үр шим хүртэгчийн тоо"
              rules={validator().required().build()}
            >
              <OInputNumber
                placeholder="Шууд үр шим хүртэгчийн тоо"
                style={{ width: "100%" }}
                formatter={true}
              />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="notDirectBenefitCount"
              label="Шууд бус үр шим хүртэгчийн тоо"
              rules={validator().required().build()}
            >
              <OInputNumber
                placeholder="Шууд бус үр шим хүртэгчийн тоо"
                style={{ width: "100%" }}
                formatter={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="planText"
              label="Төсөл хэрэгжүүлэх арга зүй"
              tooltip={{
                title:
                  "Төсөл хэрэгжүүлэх арга зүй, тогтвортой байдлын төлөвлөгөө (Төсөл хэрэгжүүлэх арга арга зүй, мониторинг, үнэлгээ, төслийн тогтвортой байдлыг хэрхэн хангах талаар 300 үгэнд багтаан бичнэ үү) ",
                icon: <InfoCircleOutlined />,
              }}
              rules={validator().required().build()}
            >
              <Input.TextArea placeholder="Төсөл хэрэгжүүлэх арга зүй" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="beginDate"
              label="Төсөл хэрэгжиж эхлэх огноо"
              rules={validator().required().build()}
            >
              <DatePicker
                placeholder="Төсөл хэрэгжиж эхлэх огноо"
                style={{ width: "100%" }}
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="endDate"
              label="Төсөл хэрэгжиж дуусах огноо"
              rules={validator().required().build()}
            >
              <DatePicker
                placeholder="Төсөл хэрэгжиж дуусах огноо"
                style={{ width: "100%" }}
              ></DatePicker>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="requestAmount"
              label="МОНЭС-ээс хүсч буй тэтгэлгийн нийт дүн (төгрөгөөр)"
              rules={validator().required().build()}
            >
              <OInputNumber
                placeholder="МОНЭС-ээс хүсч буй тэтгэлгийн нийт дүн (төгрөгөөр)"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column"></Col>
        </Row>
        <Row justify="center">
          <Row gutter={12} justify="end" style={{ width: 800 }}>
            <Space>
              {/* <Button
                // size="large"
                onClick={() => {
                  prev && prev();
                }}
              >
                Болих
              </Button> */}
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

export default forwardRef(StepOne);
