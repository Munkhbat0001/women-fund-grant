import React from "react";
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

const StepOne = () => {
  return (
    <>
      <Form layout="vertical" style={{ width: 600, justify: "center" }}>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="username" label="Төслийн нэр">
              <Input placeholder="Төслийн нэр"></Input>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="registerNumber" label="Үндэслэл">
              <Input placeholder="Үндэслэл"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="username"
              label="Тайлбар"
              tooltip={{
                title:
                  "Төсөл хэрэгжүүлснээр охид, эмэгтэйчүүд, бэлгийн болон жендэрийн цөөнхөд тулгамдсан асуудлыг шийдвэрлэхэд ямар хувь нэмэр оруулах талаар 100 үгэнд багтаан бичнэ үү.",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Тайлбар"></Input>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="registerNumber"
              label="Хүлээгдэж буй үр дүн"
              tooltip={{
                title:
                  "Хүлээгдэж буй үр дүнтэй холбоотой тохирох үр дүнг сонгоно уу.",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Хүлээгдэж буй үр дүн"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="username" label="Төслийн зорилтот бүлэг">
              <Input placeholder="Төслийн зорилтот бүлэг"></Input>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="registerNumber" label="Шууд үр шим хүртэгчийн тоо">
              <Input placeholder="Шууд үр шим хүртэгчийн тоо"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="username" label="Шууд бус үр шим хүртэгчийн тоо">
              <Input placeholder="Шууд бус үр шим хүртэгчийн тоо"></Input>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="registerNumber"
              label="Төсөл хэрэгжүүлэх арга зүй"
              tooltip={{
                title:
                  "Төсөл хэрэгжүүлэх арга зүй, тогтвортой байдлын төлөвлөгөө (Төсөл хэрэгжүүлэх арга арга зүй, мониторинг, үнэлгээ, төслийн тогтвортой байдлыг хэрхэн хангах талаар 300 үгэнд багтаан бичнэ үү) ",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Төсөл хэрэгжүүлэх арга зүй"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="beginDate" label="Төсөл хэрэгжиж эхлэх огноо">
              <DatePicker
                placeholder="Төсөл хэрэгжиж эхлэх огноо"
                style={{ width: "100%" }}
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item name="endDate" label="Төсөл хэрэгжиж дуусах огноо">
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
              name="username"
              label="МОНЭС-ээс хүсч буй тэтгэлгийн нийт дүн (төгрөгөөр)"
            >
              <Input placeholder="МОНЭС-ээс хүсч буй тэтгэлгийн нийт дүн (төгрөгөөр)"></Input>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column"></Col>
        </Row>
      </Form>
    </>
  );
};

export default StepOne;
