import {
  Button,
  Col,
  Collapse,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Card,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import OSelect from "../../../screens/form/OSelect";
import { InfoCircleOutlined } from "@ant-design/icons";
import { validator } from "../../../utils/validator";
import {
  CONST_PROJECT_GROUP,
  CONST_PROJECT_RESULT,
  CONST_REPORT_DONE,
  REPORT_IMPLEMENT,
  REPORT_MEASURE,
  REPORT_MEASURE_POST,
  REPORT_PROGRESS_POST,
} from "../../../utils/operation";
import { useAxios } from "../../../hooks";
import { IntegratedContext } from "../IntegratedAdd";
import OInputNumber from "../../../screens/form/OInputNumber";

const IntegratedStep4 = ({ ...other }) => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const scrollRef = useRef(null);

  const { prev, next, loading, setProjectId, projectId, report } =
    useContext(IntegratedContext);

  useEffect(() => {
    useAxios(REPORT_MEASURE.format(projectId)).then((res) => {
      form.setFieldsValue({ items: res });
    });
  }, []);

  const onFinish = (values) => {
    const measureList = [];
    values.items.map((goal) => {
      goal.imeasureDtoList.map((obj) => {
        measureList.push({
          projectId: goal.projectId,
          goalId: goal.goalId,
          objectId: obj.objectId,
          reportId: report.reportId,
          id: obj.id,
          fulfillment: obj.fulfillment,
          description: obj.description,
        });
      });
    });

    useAxios(REPORT_MEASURE_POST.format(projectId), measureList, {
      showSuccess: true,
      method: "POST",
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
        // style={{ maxWidth: 800, justify: "center" }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <Collapse size="small">
              {fields.map((field, index) => {
                const goal = form.getFieldsValue().items[field.name];
                return (
                  <>
                    <Collapse.Panel header={`Зорилго ${index + 1}`} key={index}>
                      <Descriptions
                        bordered
                        size="small"
                        layout="vertical"
                        column={4}
                      >
                        <Descriptions.Item label="Тайлбар:" span={2}>
                          {goal?.description}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Хүлээгдэж буй үр дүн:"
                          span={2}
                        >
                          {goal?.resultWaiting}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                          span={2}
                        >
                          {goal?.resultMeasure}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Учирч болзошгүй саад бэрхшээл:"
                          span={2}
                        >
                          {goal?.problem}
                        </Descriptions.Item>
                      </Descriptions>
                      <Form.Item label="">
                        <Form.List name={[field.name, "imeasureDtoList"]}>
                          {(subFields, subOpt) => {
                            return (
                              <>
                                {subFields.map((field2, subIndex) => {
                                  const object =
                                    form.getFieldsValue().items[field.name]
                                      .imeasureDtoList[field2.name];
                                  return (
                                    <Card
                                      type="inner"
                                      title={`Зорилт ${subIndex + 1}`}
                                      size="small"
                                      headStyle={{
                                        backgroundColor: "#935dde",
                                        color: "white",
                                      }}
                                      style={{ marginTop: "10px" }}
                                    >
                                      <Descriptions
                                        bordered
                                        size="small"
                                        layout="vertical"
                                        column={4}
                                      >
                                        <Descriptions.Item
                                          label="Тайлбар:"
                                          span={2}
                                        >
                                          {object?.objectDescription}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Хүлээгдэж буй үр дүн:"
                                          span={2}
                                        >
                                          {object?.objectResultWaiting}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                                          span={2}
                                        >
                                          {object?.objectResultMeasure}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Учирч болзошгүй саад бэрхшээл:"
                                          span={2}
                                        >
                                          {object?.objectProblem}
                                        </Descriptions.Item>
                                      </Descriptions>

                                      <Form.Item
                                        label="Биелэлт (тоо)"
                                        name={[field2.name, "fulfillment"]}
                                        rules={validator().required().build()}
                                      >
                                        <OInputNumber placeholder="Биелэлт (тоо)" />
                                      </Form.Item>
                                      <Form.Item
                                        label="Дэлгэрэнгүй тайлбар"
                                        name={[field2.name, "description"]}
                                        rules={validator().required().build()}
                                      >
                                        <Input.TextArea placeholder="Дэлгэрэнгүй тайлбар" />
                                      </Form.Item>
                                    </Card>
                                  );
                                })}
                              </>
                            );
                          }}
                        </Form.List>
                      </Form.Item>
                    </Collapse.Panel>
                  </>
                );
              })}
            </Collapse>
          )}
        </Form.List>
        <br />
        <Row gutter={12} justify="end">
          <Space>
            <Button
              onClick={() => {
                prev && prev();
              }}
            >
              Буцах
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Илгээх
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export default IntegratedStep4;
