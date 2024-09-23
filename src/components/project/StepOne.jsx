import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { Form, Space, Button, Input, Row, Col, DatePicker } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { validator } from "../../utils/validator";
import OSelect from "../../screens/form/OSelect";
import OInputNumber from "../../screens/form/OInputNumber";
import { ProjectContext } from "../../pages/ProjectRequest";
import useAxios from "../../hooks/useAxios";
import {
  CONST_PROJECT_GROUP,
  CONST_PROJECT_RESULT,
  CUSTOMER_PROJECT_POST,
  CUSTOMER_PROJECT_PUT,
} from "../../utils/operation";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const StepOne = ({}, ref) => {
  const { grantId } = useParams();
  const [form] = Form.useForm();
  const scrollRef = useRef(null);

  const { project, next, loading } = useContext(ProjectContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      const values = {
        ...project,
        beginDate: project.beginDate && dayjs(project.beginDate, "YYYY-MM-DD"),
        endDate: project.endDate && dayjs(project.endDate, "YYYY-MM-DD"),
      };
      form.setFieldsValue(values);
    }
  }, [project]);

  const onFinish = (values) => {
    values.beginDate = values.beginDate.format("YYYY-MM-DD");
    values.endDate = values.endDate.format("YYYY-MM-DD");

    const payLoad = {
      grantId,
      projectId: project && project.projectId,
      ...values,
    };

    const url =
      project && project.projectId
        ? CUSTOMER_PROJECT_PUT + `/${project.projectId}`
        : CUSTOMER_PROJECT_POST;

    const method = project && project.projectId ? "PUT" : "POST";

    useAxios(url, payLoad, {
      method,
      showSucces: true,
    }).then((res) => {
      next && next();
    });
  };

  return (
    <>
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
              name="resultIds"
              label="Хүлээгдэж буй үр дүн"
              tooltip={{
                title:
                  "Хүлээгдэж буй үр дүнтэй холбоотой тохирох үр дүнг сонгоно уу.",
                icon: <InfoCircleOutlined />,
              }}
              rules={validator().required().build()}
            >
              {/* <OSelect
                placeholder="Хүлээгдэж буй үр дүн"
                style={{ width: "100%" }}
                selectAPI={CONST_PROJECT_RESULT}
              /> */}

              <OSelect
                mode="multiple"
                placeholder="Хүлээгдэж буй үр дүн"
                selectAPI={CONST_PROJECT_RESULT}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="groupIds"
              label="Төслийн зорилтот бүлэг"
              rules={validator().required().build()}
            >
              {/* <OSelect
                placeholder="Төслийн зорилтот бүлэг"
                style={{ width: "100%" }}
                selectAPI={CONST_PROJECT_GROUP}
              /> */}
              <OSelect
                mode="multiple"
                placeholder="Төслийн зорилтот бүлэг"
                selectAPI={CONST_PROJECT_GROUP}
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
          {/* <Col flex="1 0 25%" className="column">
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
          </Col> */}
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="address"
              label="Төсөл хэрэгжих байршил"
              rules={validator().required().build()}
            >
              <Input.TextArea placeholder="Төсөл хэрэгжих байршил" />
            </Form.Item>
          </Col>
          {/* <Col flex="1 0 25%" className="column"></Col> */}
        </Row>
        <Row justify="center">
          <Row gutter={12} justify="end" style={{ width: 800 }}>
            <Space>
              <Button
                // size="large"
                type="primary"
                onClick={() => form.submit()}
                loading={loading}
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
