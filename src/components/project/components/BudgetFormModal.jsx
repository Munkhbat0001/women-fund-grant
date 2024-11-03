import { Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import OInputNumber from "../../../screens/form/OInputNumber";
import OSelect from "../../../screens/form/OSelect";
import { CONST_PROJECT_BUDGET_MEASURE } from "../../../utils/operation";
import { validator } from "../../../utils/validator";

const BudgetFormModal = ({
  isModalVisible,
  handleCancel,
  handleOk,
  form,
  initialValues,
}) => {
  const onCalculateAmount = () => {
    const budget = form.getFieldsValue();
    if (budget) {
      const totalPrice = (budget.quantity || 0) * (budget.unitPrice || 0);
      budget.totalPrice = totalPrice;
      form.setFieldsValue(budget);
    }
  };

  return (
    <>
      <Modal
        title="Төсөв төлөвлөгөө"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText="Хадгалах"
        cancelText="Буцах"
        onOk={() => {
          form.validateFields().then((values) => {
            handleOk(values);
          });
        }}
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Row>
            <Col span={24}>
              <Form.Item
                name={"name"}
                rules={validator().required("Нэр оруулна уу").build()}
              >
                <Input placeholder="Нэр" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name={"quantity"}
                rules={validator().required("Тоо, ширхэг оруулна уу").build()}
              >
                <OInputNumber
                  placeholder="Тоо, ширхэг"
                  formatter={true}
                  style={{ width: "100%" }}
                  onChange={() => onCalculateAmount()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"measureUnit"}
                rules={validator().required("Хэмжих нэгж оруулна уу").build()}
              >
                <OSelect
                  placeholder="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт)"
                  style={{ width: "100%" }}
                  selectAPI={CONST_PROJECT_BUDGET_MEASURE}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name={"unitPrice"}
                rules={validator().required("Нэгж үнэ оруулна уу").build()}
              >
                <OInputNumber
                  placeholder="Нэгж үнэ"
                  style={{ width: "100%" }}
                  onChange={() => onCalculateAmount()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"totalPrice"}
                // rules={validator().required("Нийт үнэ оруулна уу").build()}
              >
                <OInputNumber
                  placeholder="Нийт үнэ"
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name={"provider"}
                rules={validator()
                  .required("Төсөл хэрэгжүүлэгч байгууллагаас оруулна уу")
                  .build()}
              >
                <OInputNumber
                  placeholder="Төсөл хэрэгжүүлэгч байгууллагаас"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name={"mnFund"}
                rules={validator().required("МОНЭС-аас оруулна уу").build()}
              >
                <OInputNumber
                  placeholder="МОНЭС-аас"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"other"}
                rules={validator()
                  .required("Бусад эх үүсвэрээс оруулна уу")
                  .build()}
              >
                <OInputNumber
                  placeholder="Бусад эх үүсвэрээс"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default BudgetFormModal;
