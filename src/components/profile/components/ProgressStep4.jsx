import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import OSelect from "../../../screens/form/OSelect";
import { validator } from "../../../utils/validator";
import {
  REPORT_PROGRESS,
  REPORT_PROGRESS_SEND,
} from "../../../utils/operation";
import { useAxios } from "../../../hooks";
import { ProgressContext } from "../ProgressAdd";
import Success from "../../modals/Success";

const ProgressStep4 = () => {
  const [form] = Form.useForm();
  const scrollRef = useRef(null);
  const successRef = useRef(null);

  const { prev, next, loading, projectId, report, afterSave } =
    useContext(ProgressContext);

  useEffect(() => {
    form.setFieldsValue(report);
  }, []);

  const onFinish = (values) => {
    useAxios(
      REPORT_PROGRESS_SEND,
      {
        projectId: projectId,
        reportId: report?.reportId || values.reportId,
        ...values,
      },
      {
        method: "POST",
        showSuccess: true,
      }
    ).then((res) => {
      successRef.current.show();
      setTimeout(() => {
        afterSave && afterSave();
      }, "2000");
    });
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
                  name="reportWriter"
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

      {React.createElement(Success, {
        ref: successRef,
        title: "Явцын тайлан илгээгдлээ.",
        hide: () => successRef.current.hide(),
      })}
    </>
  );
};

export default ProgressStep4;
