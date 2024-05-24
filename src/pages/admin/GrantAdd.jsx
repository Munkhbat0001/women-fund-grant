import React, { forwardRef, useRef } from "react";
import { Col, DatePicker, Form, Input, Row } from "antd";
import OForm from "../../screens/form/OForm";
import Screen from "../../screens/modal/Screen";
import { validator } from "../../utils/validator";

const GrantAdd = ({ ...other }, ref) => {
  const formRef = useRef(null);

  const props = {
    title: "Удирдамж бэлтгэх",
    okText: "Хадгалах",
    width: 600,
    onOk: () => {
      formRef.current.submit();
    },
  };

  const formProps = {
    itemTypes: {
      beginDate: "date",
      endDate: "date",
    },
    ...other,
  };

  return (
    <Screen ref={ref} {...props}>
      <OForm ref={formRef} {...formProps}>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="title"
              label="Гарчиг"
              rules={validator().required().build()}
            >
              <Input placeholder="Гарчиг" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="beginDate"
              label="Эхлэх огноо"
              rules={validator().required().build()}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Эхлэх огноо" />
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="endDate"
              label="Дуусах"
              rules={validator().required().build()}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Дуусах огноо"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1">
            <Form.Item
              name="body"
              label="Тэтгэлгийн зар оруулах"
              rules={validator().required().build()}
            >
              <Input.TextArea placeholder="Тэтгэлгийн зар оруулах" />
            </Form.Item>
          </Col>
        </Row>
      </OForm>
    </Screen>
  );
};

export default forwardRef(GrantAdd);
