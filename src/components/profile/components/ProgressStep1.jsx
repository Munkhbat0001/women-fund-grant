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
  REPORT_PROGRESS_POST,
  REPORT_PROJECT_STATUS_PROGRESS,
} from "../../../utils/operation";
import { useAxios } from "../../../hooks";
import { ProgressContext } from "../ProgressAdd";

const ProgressStep1 = ({ ...other }) => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const scrollRef = useRef(null);

  const { next, mode, loading, setProjectId, projectId, setReport, project } =
    useContext(ProgressContext);

  useEffect(() => {
    if (projectId > 0) {
      getImplement(projectId);
    }
  }, []);

  const onFinish = (values) => {
    const impl = [];
    values.items.map((goal) => {
      goal.goalObjects.map((obj) => {
        obj.iplanList.map((plan) => {
          impl.push({
            projectId: values.projectId || projectId,
            goalId: goal.goalId,
            objectId: obj.objectId,
            planId: plan.planId,
            id: plan.id,
            doneId: plan.doneId,
            description: plan.description,
            typeId: 150,
          });
        });
      });
    });

    const payload = {
      projectId: values.projectId || projectId,
      implementDtoList: impl,
    };

    useAxios(REPORT_PROGRESS_POST, payload, {
      showSuccess: true,
      method: "POST",
    }).then((res) => {
      setReport(res);
      next && next();
    });
  };

  const onChange = (val) => {
    if (!projectId) {
      setProjectId(val);
    }
    getImplement(val);
  };

  const getImplement = (projectId) => {
    useAxios(REPORT_IMPLEMENT.format(projectId, 150)).then((res) => {
      setData(res);
      form.setFieldsValue({ projectId: projectId, items: res });
    });
  };
  const onRequire = (field, field2, field3) => {
    const items = form.getFieldsValue().items;
    const plan =
      form.getFieldsValue().items[field.name].goalObjects[field2.name]
        .iplanList[field3.name];
    if (plan) {
      const isDescRequire = plan.doneId !== 110;
      items[field.name].goalObjects[field2.name].iplanList[
        field3.name
      ].isDescRequire = isDescRequire;
      form.setFieldsValue({ items });
    }
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
        {!project?.projectName && (
          <Row gutter={12}>
            <Col flex="1 0 25%" className="column">
              <Form.Item
                name="projectId"
                label="Төслийн нэр"
                rules={validator().required().build()}
              >
                <OSelect
                  placeholder="Төслийн нэр"
                  style={{ width: "100%" }}
                  selectAPI={REPORT_PROJECT_STATUS_PROGRESS}
                  selectName="projectName"
                  selectValue="projectId"
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {project?.projectName > 0 && (
          <Row gutter={12} style={{ marginBottom: "10px" }}>
            <Col flex="1 0 25%" className="column">
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Төслийн нэр:">
                  {project?.projectName}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
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
                        <Form.List name={[field.name, "goalObjects"]}>
                          {(subFields, subOpt) => {
                            return (
                              <>
                                {subFields.map((field2, subIndex) => {
                                  const object =
                                    form.getFieldsValue().items[field.name]
                                      .goalObjects[field2.name];
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
                                          {object?.description}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Хүлээгдэж буй үр дүн:"
                                          span={2}
                                        >
                                          {object?.resultWaiting}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                                          span={2}
                                        >
                                          {object?.resultMeasure}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                          label="Учирч болзошгүй саад бэрхшээл:"
                                          span={2}
                                        >
                                          {object?.problem}
                                        </Descriptions.Item>
                                      </Descriptions>

                                      <Form.Item label="">
                                        <Form.List
                                          name={[field2.name, "iplanList"]}
                                        >
                                          {(subFields2, subOpt) => {
                                            return (
                                              <>
                                                <Row gutter={12}>
                                                  {subFields2.map(
                                                    (field3, subIndex2) => {
                                                      const plan =
                                                        form.getFieldsValue()
                                                          .items[field.name]
                                                          .goalObjects[
                                                          field2.name
                                                        ].iplanList[
                                                          field3.name
                                                        ];
                                                      return (
                                                        <Col span={12}>
                                                          <Card
                                                            type="inner"
                                                            title={`Үйл ажиллагаа ${
                                                              subIndex2 + 1
                                                            }`}
                                                            size="small"
                                                            style={{
                                                              marginTop: "10px",
                                                            }}
                                                            headStyle={{
                                                              backgroundColor:
                                                                "#935dde",
                                                              color: "white",
                                                            }}
                                                          >
                                                            <Descriptions
                                                              bordered
                                                              size="small"
                                                              column={1}
                                                            >
                                                              <Descriptions.Item
                                                                label="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц:"
                                                                span={2}
                                                              >
                                                                {
                                                                  plan?.requirement
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Эхлэх огноо:"
                                                                span={2}
                                                              >
                                                                {
                                                                  plan?.beginDate
                                                                }
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Дуусах огноо:"
                                                                span={2}
                                                              >
                                                                {plan?.endDate}
                                                              </Descriptions.Item>
                                                              <Descriptions.Item
                                                                label="Хариуцах эзэн:"
                                                                span={2}
                                                              >
                                                                {
                                                                  plan?.ownerName
                                                                }
                                                              </Descriptions.Item>
                                                            </Descriptions>
                                                            <br />
                                                            <Form.Item
                                                              label="Хийгдсэн эсэх"
                                                              name={[
                                                                field3.name,
                                                                "doneId",
                                                              ]}
                                                              rules={validator()
                                                                .required()
                                                                .build()}
                                                            >
                                                              <OSelect
                                                                style={{
                                                                  width: "100%",
                                                                }}
                                                                placeholder="сонгох"
                                                                selectAPI={
                                                                  CONST_REPORT_DONE
                                                                }
                                                                onChange={() => {
                                                                  onRequire(
                                                                    field,
                                                                    field2,
                                                                    field3
                                                                  );
                                                                }}
                                                              />
                                                            </Form.Item>
                                                            <Form.Item
                                                              label="Дэлгэрэнгүй тайлбар"
                                                              name={[
                                                                field3.name,
                                                                "description",
                                                              ]}
                                                              rules={
                                                                plan.isDescRequire ===
                                                                true
                                                                  ? validator()
                                                                      .required()
                                                                      .build()
                                                                  : []
                                                              }
                                                            >
                                                              <Input.TextArea placeholder="Дэлгэрэнгүй тайлбар" />
                                                            </Form.Item>
                                                          </Card>
                                                        </Col>
                                                      );
                                                    }
                                                  )}
                                                </Row>
                                              </>
                                            );
                                          }}
                                        </Form.List>
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
          <Col>
            <Button
              // size="large"
              type="primary"
              onClick={() => form.submit()}
            >
              Үргэлжлүүлэх
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProgressStep1;
