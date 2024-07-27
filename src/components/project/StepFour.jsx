import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Select,
} from "antd";
import OSelect from "../../screens/form/OSelect";
import OInputNumber from "../../screens/form/OInputNumber";
import { validator } from "../../utils/validator";
import {
  CONST_PROJECT_BUDGET_MEASURE,
  CUSTOMER_PROJECT_BUDGET_ALL_POST,
  CUSTOMER_PROJECT_BUDGET_DELETE,
  CUSTOMER_PROJECT_BUDGET_OBJECT_DELETE,
  CUSTOMER_PROJECT_OBJECT,
} from "../../utils/operation";
import { ProjectContext } from "../../pages/ProjectRequest";
import useAxios from "../../hooks/useAxios";
import { isEmpty } from "lodash";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const StepFour = ({}) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const {
    project: { projectId, budgetList },
    next,
    prev,
  } = useContext(ProjectContext);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_OBJECT + `/${projectId}/object`).then((res) => {
      setOptions(
        res.map((item) => ({
          value: item.objectId,
          label: item.description,
        }))
      );
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (budgetList && budgetList.length > 0) {
      const items = [];
      budgetList.map((plan) => {
        const item = items.find((x) => x.objectId === plan.objectId);
        if (isEmpty(item)) {
          plan.budgetList = [{ ...plan }];
          items.push(plan);
        } else {
          item.budgetList.push(plan);
        }
      });

      form.setFieldsValue({ items: items });
    } else {
      form.setFieldsValue({ items: [{ budgetList: [{}] }] });
    }
  }, [budgetList]);

  const onFinish = (values) => {
    useAxios(CUSTOMER_PROJECT_BUDGET_ALL_POST.format(projectId), values.items, {
      method: "POST",
      showSuccess: true,
    }).then((res) => {
      next && next();
    });
  };

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        labelWrap
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 800 }}
        autoComplete="off"
        // initialValues={{
        //   items: [{}],
        // }}
        onFinish={onFinish}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Зорилт ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        const budget = form.getFieldsValue().items[field.name];
                        if (budget) {
                          useAxios(
                            CUSTOMER_PROJECT_BUDGET_OBJECT_DELETE.format(
                              budget.projectId,
                              budget.objectId
                            ),
                            {},
                            {
                              method: "DELETE",
                              showSuccess: true,
                            }
                          ).then((res) => {
                            remove(field.name);
                          });
                        } else {
                          remove(field.name);
                        }
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Зорилт"
                    name={[field.name, "objectId"]}
                    rules={validator().required().build()}
                  >
                    <OSelect
                      style={{ width: "100%" }}
                      placeholder="сонгох"
                      // selectAPI={
                      //   CUSTOMER_PROJECT_OBJECT + `/${projectId}/object`
                      // }
                      options={options}
                      selectName="description"
                      selectValue="objectId"
                    />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Үйл ажиллагаа">
                    <Form.List name={[field.name, "budgetList"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <>
                              <Card
                                size="small"
                                bordered
                                title={`Үйл ажиллагаа ${subField.name + 1}`}
                                headStyle={{
                                  backgroundColor: "#ddf247",
                                }}
                                key={`${field.key}_${subField.key}card`}
                                // headerBg="red"
                                extra={
                                  <CloseOutlined
                                    onClick={() => {
                                      const budget =
                                        form.getFieldsValue().items[field.name]
                                          .budgetList[subField.name];
                                      console.log("budget: ", budget);
                                      if (budget) {
                                        useAxios(
                                          CUSTOMER_PROJECT_BUDGET_DELETE.format(
                                            budget.budgetId
                                          ),
                                          {},
                                          {
                                            method: "DELETE",
                                            showSuccess: true,
                                          }
                                        ).then((res) => {
                                          subOpt.remove(subField.name);
                                        });
                                      } else {
                                        subOpt.remove(subField.name);
                                      }
                                    }}
                                  />
                                }
                              >
                                <Row
                                  key={`${field.key}_${subField.key}`}
                                  gutter={12}
                                >
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "quantity"]}
                                      rules={validator()
                                        .required("Тоо, ширхэг оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Тоо, ширхэг"
                                        formatter={true}
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "measureUnit"]}
                                      rules={validator()
                                        .required("Хэмжих нэгж оруулна уу")
                                        .build()}
                                    >
                                      <OSelect
                                        placeholder="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт)"
                                        style={{ width: "100%" }}
                                        selectAPI={CONST_PROJECT_BUDGET_MEASURE}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row
                                  gutter={12}
                                  key={`${field.key}_${subField.key}2`}
                                >
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "unitPrice"]}
                                      rules={validator()
                                        .required("Нэгж үнэ оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Нэгж үнэ"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "totalPrice"]}
                                      rules={validator()
                                        .required("Нийт үнэ оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Нийт үнэ"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row
                                  gutter={12}
                                  key={`${field.key}_${subField.key}3`}
                                >
                                  <Col span={24}>
                                    <Form.Item
                                      name={[subField.name, "provider"]}
                                      rules={validator()
                                        .required(
                                          "Төсөл хэрэгжүүлэгч байгууллагаас оруулна уу"
                                        )
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
                                      name={[subField.name, "mnFund"]}
                                      rules={validator()
                                        .required(
                                          "Бусад эх үүсвэрээс оруулна уу"
                                        )
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="Бусад эх үүсвэрээс"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[subField.name, "other"]}
                                      rules={validator()
                                        .required("МОНЭС-аас оруулна уу")
                                        .build()}
                                    >
                                      <OInputNumber
                                        placeholder="МОНЭС-аас"
                                        style={{ width: "100%" }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            </>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Үйл ажиллагаа нэмэх
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Зорилт нэмэх
              </Button>
            </div>
          )}
        </Form.List>
        <br />

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
                Үргэлжлүүлэх
              </Button>
            </Space>
          </Row>
        </Col>
      </Form>
    </>
  );
};

export default StepFour;
