import React, { forwardRef, useRef } from "react";
import {
  Image,
  Space,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Card,
  InputNumber,
  Switch,
  Button,
  message,
  Checkbox,
} from "antd";
import Screen from "../../screens/modal/Screen";
import OForm from "../../screens/form/OForm";
import OInputNumber from "../../screens/form/OInputNumber";
import { validator } from "../../utils/validator";

const StepFiveModal = ({ ...other }, ref) => {
  const formRef = useRef(null);
  const prop = {
    title: "Төсөл хэрэгжүүлэх багийн гишүүн нэмэх",
    okText: "Хадгалах",
    width: 700,
    onOk: () => {
      formRef.current.submit();
    },
    ...other,
  };

  const formProps = {
    // initValue: {
    //   canAddProduct: true,
    //   isGenerateInvoiceNumber: true,
    //   isActive: true,
    // },
    ...other,
  };

  return (
    <Screen ref={ref} {...prop}>
      <OForm ref={formRef} {...other}>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="lastName"
              label="Овог"
              rules={validator().required().build()}
            >
              <Input placeholder="Овог"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="firstName"
              label="Нэр"
              rules={validator().required().build()}
            >
              <Input
                allowClear
                style={{ width: "100%" }}
                placeholder="Нэр"
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="position"
              label="Албан тушаал"
              rules={validator().required().build()}
            >
              <Input placeholder="Албан тушаал"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="role"
              label="Төсөлд гүйцэтгэх үүрэг"
              rules={validator().required().build()}
            >
              <Input.TextArea
                allowClear
                style={{ width: "100%" }}
                placeholder="Төсөлд гүйцэтгэх үүрэг"
              ></Input.TextArea>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="email"
              label="И-мэйл"
              rules={validator().required().build()}
            >
              <Input placeholder="И-мэйл"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="mobileNumber"
              label="Утас"
              rules={validator().required().build()}
            >
              <OInputNumber
                allowClear
                style={{ width: "100%" }}
                placeholder="Утас"
                formatter={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item name="leader" valuePropName="checked" label="">
              <Checkbox>Удирдах ажилтан</Checkbox>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item name="owner" valuePropName="checked" label="">
              <Checkbox>Төсөл хариуцах ажилтан</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </OForm>
    </Screen>
  );
};

export default forwardRef(StepFiveModal);
