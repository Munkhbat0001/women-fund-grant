import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import OSelect from "../../../screens/form/OSelect";
import { validator } from "../../../utils/validator";
import {
  CONST_CITY,
  CONST_DISTRICT,
  CONST_REPORT_INTEGRATED_RESULT,
  REPORT_INTEGRATED_SEND,
  REPORT_PROGRESS,
  REPORT_PROGRESS_SEND,
  REPORT_PROJECT_STATUS,
} from "../../../utils/operation";
import { useAxios } from "../../../hooks";
import { IntegratedContext } from "../IntegratedAdd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const IntegratedStep5 = () => {
  const [form] = Form.useForm();
  const scrollRef = useRef(null);
  const [cityId, setCityId] = useState(0);

  const { next, loading, projectId, report } = useContext(IntegratedContext);

  useEffect(() => {
    form.setFieldsValue({
      ...report,
      projectEndDate: dayjs(report.projectEndDate, "YYYY-MM-DD"),
    });
  }, []);

  const onFinish = (values) => {
    console.log("values: ", values);
    useAxios(
      REPORT_INTEGRATED_SEND,
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
      console.log("res", res);
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
                  name="projectEndDate"
                  label="Төсөл хэрэгжиж дууссан огноо"
                  rules={validator().required().build()}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectCityId"
                  label="Аймаг"
                  rules={validator().required().build()}
                >
                  <OSelect
                    showSearch
                    selectAPI={CONST_CITY}
                    selectName="name"
                    selectValue="id"
                    style={{ width: "100%" }}
                    onChange={(val) => {
                      setCityId(val);
                      form.setFieldValue("projectDistrictId", undefined);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectDistrictId"
                  label="Дүүрэг"
                  rules={validator().required().build()}
                >
                  <OSelect
                    selectAPI={CONST_DISTRICT}
                    selectName="name"
                    selectValue="id"
                    style={{ width: "100%" }}
                    parentId={cityId}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectResultOne"
                  label="Энэхүү төсөл нь юугаараа шинэлэг байсан бэ? "
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectResultTwo"
                  label="Төсөл хэрэгжсэнээр бий болсон хамгийн чухал өөрчлөлтүүдийн талаар бичнэ үү ( өөрчлөлт нь хувь хүн, хамт олон, байгууллага гэх мэт бүх түвшинд байж болно)."
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectResultThree"
                  label="Уг төслийг хэрэгжүүлснээр олж авсан сургамжаа хуваалцана уу."
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectResultFour"
                  label="Төслийн цаашдын тогтвортой байдлыг хэрхэн анхаарах вэ?"
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="projectResultId"
                  label="Тохирох үр дүнг сонгоно уу."
                  rules={validator().required().build()}
                >
                  <OSelect
                    selectAPI={CONST_REPORT_INTEGRATED_RESULT}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="contentLink"
                  label="Төслийн хүрээнд хийсэн олон нийтэд нээлттэй контентийн линкийг хуваалцана уу."
                  rules={validator().required().build()}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1 0 25%" className="column">
                <Form.Item
                  name="attachmentPath"
                  label="Боломжтой бол, төслийн хүрээнд боловсруулсан мэдлэгийн бүтээгдэхүүнийг энд хавсаргана уу."
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
    </>
  );
};

export default IntegratedStep5;
