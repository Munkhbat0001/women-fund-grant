import { Button, Card, Col, Form, Popconfirm, Row, Space, Table } from "antd";
import React, { useState } from "react";
import OInputNumber from "../../../screens/form/OInputNumber";
import OSelect from "../../../screens/form/OSelect";
import { validator } from "../../../utils/validator";
import {
  CONST_PROJECT_BUDGET_MEASURE,
  CUSTOMER_PROJECT_BUDGET_DELETE,
} from "../../../utils/operation";
import BudgetFormModal from "./BudgetFormModal";
import { MEASURE_UNIT } from "../../../utils/constants";
import { formatMoney } from "../../../utils";
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useAxios } from "../../../hooks";

const BudgetFormList = ({ form, name, goalName, planName }) => {
  // const [form] = Form.useFormInstance();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formList] = Form.useForm();
  const [editIndex, setEditIndex] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formList.resetFields();
    setEditIndex(null);
  };

  const handleOk = (values) => {
    const items = form.getFieldsValue().items;
    const budgetList =
      form.getFieldsValue().items[name].goalObjects[goalName].planList[planName]
        .budgetList || [];
    if (editIndex !== null) {
      budgetList[editIndex] = values;
    } else {
      budgetList.push({ ...values });
    }
    items[name].goalObjects[goalName].planList[planName].budgetList =
      budgetList;
    form.setFieldsValue({ items: items });
    handleCancel();
  };

  const handleEdit = (index) => {
    const currentList =
      form.getFieldsValue().items[name].goalObjects[goalName].planList[planName]
        .budgetList || [];
    setEditIndex(index);
    formList.setFieldsValue(currentList[index]);
    showModal();
  };

  const handleDelete = (index) => {
    const items = form.getFieldsValue().items;
    const budgetList =
      form.getFieldsValue().items[name].goalObjects[goalName].planList[planName]
        .budgetList || [];

    const budget = budgetList[index];
    if (budget?.budgetId) {
      useAxios(
        CUSTOMER_PROJECT_BUDGET_DELETE.format(budget.budgetId),
        {},
        {
          method: "DELETE",
          showSuccess: true,
        }
      ).then((res) => {
        budgetList.splice(index, 1);
        items[name].goalObjects[goalName].planList[planName].budgetList =
          budgetList;
        form.setFieldsValue({ items: items });
      });
    } else {
      budgetList.splice(index, 1);
      items[name].goalObjects[goalName].planList[planName].budgetList =
        budgetList;
      form.setFieldsValue({ items: items });
    }
  };

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Хэмжих нэгж (хүн, өдөр)",
      dataIndex: "measureUnit",
      key: "measureUnit",
      align: "center",
      render: (value) => {
        return MEASURE_UNIT[value];
      },
    },
    {
      title: "Тоо, ширхэг",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },

    {
      title: "Нэгж үнэ",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "center",
      render: (value) => formatMoney(value),
    },
    {
      title: "Нийт үнэ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      render: (value) => formatMoney(value),
    },
    {
      title: "Төсөл хэрэгжүүлэгч байгууллагаас",
      dataIndex: "provider",
      key: "provider",
      align: "center",
      render: (value) => formatMoney(value),
    },
    {
      title: "Бусад эх үүсвэрээс",
      dataIndex: "mnFund",
      key: "mnFund",
      align: "center",
      render: (value) => formatMoney(value),
    },
    {
      title: "МОНЭС-аас",
      dataIndex: "other",
      key: "other",
      align: "center",
      render: (value) => formatMoney(value),
    },
    {
      title: "Үйлдэл",
      key: "action",
      align: "center",
      render: (_, __, index) => (
        <>
          <Space>
            <FormOutlined
              style={{ color: "#935dde" }}
              onClick={() => handleEdit(index)}
            />
            {/* <EditOutlined style={{ color: "#935dde" }} /> */}
            <Popconfirm
              title="Устгахдаа итгэлтэй байна уу"
              okText="Тийм"
              cancelText="Үгүй"
              onConfirm={() => handleDelete(index)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined
                style={{ color: "red" }}
                // onClick={() => handleDelete(index)}
              />
            </Popconfirm>
          </Space>
          {/* <Button type="link" onClick={() => handleEdit(index)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(index)}>
            Delete
          </Button> */}
        </>
      ),
    },
  ];

  const summary = (data) => {
    const quantity = data.reduce((acc, curr) => acc + curr.quantity, 0);
    const unitPrice = data.reduce((acc, curr) => acc + curr.unitPrice, 0);
    const totalPrice = data.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const provider = data.reduce((acc, curr) => acc + curr.provider, 0);
    const mnFund = data.reduce((acc, curr) => acc + curr.mnFund, 0);
    const other = data.reduce((acc, curr) => acc + curr.other, 0);
    return (
      <Table.Summary fixed={"bottom"} style={{ background: "red" }}>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>
            Нийт /энэ хуудас дахь/
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(quantity)}
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(unitPrice)}
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(totalPrice)}
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(provider)}
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(mnFund)}
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} align="center">
            {formatMoney(other)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };
  return (
    <>
      <Form.List name={[planName, "budgetList"]}>
        {(subFields, subOpt) => {
          const budgetList =
            form.getFieldsValue().items[name].goalObjects[goalName].planList[
              planName
            ]?.budgetList || [];

          const dataSource = subFields?.map((field) => field.name);
          return (
            <>
              <Table
                className="o-table"
                bordered
                size="small"
                dataSource={dataSource.map((index) => ({
                  key: index,
                  ...budgetList[index],
                }))}
                columns={columns}
                pagination={false}
                summary={summary}
                // scroll={{ x: "100vw" }}
              />
              {/* {subFields2.map((subField) => (
                
                <Card
                  size="small"
                  bordered
                  title={`Төсвийн санал`}
                  headStyle={{
                    backgroundColor: "#ddf247",
                  }}
                >
                  <Row key={`${name}_${subField.key}`} gutter={12}>
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
                          style={{
                            width: "100%",
                          }}
                          onChange={() => {
                            onCalculateAmount(field, field2, subField);
                          }}
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
                          style={{
                            width: "100%",
                          }}
                          selectAPI={CONST_PROJECT_BUDGET_MEASURE}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12} key={`${name}_${subField.key}2`}>
                    <Col span={12}>
                      <Form.Item
                        name={[subField.name, "unitPrice"]}
                        rules={validator()
                          .required("Нэгж үнэ оруулна уу")
                          .build()}
                      >
                        <OInputNumber
                          placeholder="Нэгж үнэ"
                          style={{
                            width: "100%",
                          }}
                          onChange={() => {
                            onCalculateAmount(field, field2, subField);
                          }}
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
                          style={{
                            width: "100%",
                          }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12} key={`${name}_${subField.key}3`}>
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
                          style={{
                            width: "100%",
                          }}
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
                          .required("Бусад эх үүсвэрээс оруулна уу")
                          .build()}
                      >
                        <OInputNumber
                          placeholder="Бусад эх үүсвэрээс"
                          style={{
                            width: "100%",
                          }}
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
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))} */}
              <br />
              <Button type="dashed" onClick={showModal} block>
                + Төсөв төлөвлөгөө нэмэх
              </Button>
            </>
          );
        }}
      </Form.List>
      <BudgetFormModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        form={formList}
        initialValues={editIndex !== null ? formList.getFieldValue("item") : {}}
      />
    </>
  );
};

export default BudgetFormList;
