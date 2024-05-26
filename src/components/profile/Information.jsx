import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { validator } from "../../utils/validator";
import { SaveOutlined } from "@ant-design/icons";

const Information = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {};
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Байгууллагын нэр"
              rules={validator().required().build()}
            >
              <Input placeholder="Байгууллагын нэр" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Байгууллагын гэрчилгээний дугаар"
              rules={validator().required().build()}
            >
              <Input placeholder="Байгууллагын гэрчилгээний дугаар" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Гүйцэтгэх захиралын нэр"
              rules={validator().required().build()}
            >
              <Input placeholder="Гүйцэтгэх захиралын нэр" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Байгууллагын ажилчдын тоо"
              rules={validator().required().build()}
            >
              <Input placeholder="Байгууллагын ажилчдын тоо" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Байгуулагдсан огноо"
              rules={validator().required().build()}
            >
              <Input placeholder="Байгуулагдсан огноо" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Үйл ажиллагааны чиглэл"
              rules={validator().required().build()}
            >
              <Input placeholder="Үйл ажиллагааны чиглэл" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Тохирох үйл ажиллагааны чиглэлийг сонгоно уу."
              rules={validator().required().build()}
            >
              <Input placeholder="Тохирох үйл ажиллагааны чиглэлийг сонгоно уу." />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Зорилтот бүлэг"
              rules={validator().required().build()}
            >
              <Input placeholder="Зорилтот бүлэг" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Тохирох зорилтот бүлгийг сонгоно уу"
              rules={validator().required().build()}
            >
              <Input placeholder="Тохирох зорилтот бүлгийг сонгоно уу" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Хамрах хүрээ/Байршил"
              rules={validator().required().build()}
            >
              <Input placeholder="Хамрах хүрээ/Байршил" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Холбоо барих хаяг"
              rules={validator().required().build()}
            >
              <Input placeholder="Холбоо барих хаяг" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Холбоо барих утас"
              rules={validator().required().build()}
            >
              <Input placeholder="Холбоо барих утас" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Холбоо барих мэйл хаяг"
              rules={validator().required().build()}
            >
              <Input placeholder="Холбоо барих мэйл хаяг" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Вэбсайт"
              rules={validator().required().build()}
            >
              <Input placeholder="Вэбсайт" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Facebook"
              rules={validator().required().build()}
            >
              <Input placeholder="Facebook" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Twitter"
              rules={validator().required().build()}
            >
              <Input placeholder="Twitter" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="Instagram"
              rules={validator().required().build()}
            >
              <Input placeholder="Instagram" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="projectName"
              label="LinkedIn"
              rules={validator().required().build()}
            >
              <Input placeholder="LinkedIn" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button icon={<SaveOutlined />} type="primary">
              Хадгалах
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Information;
