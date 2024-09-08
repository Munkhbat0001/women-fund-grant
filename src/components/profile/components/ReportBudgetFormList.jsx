import { Button, Card, Descriptions, Form } from "antd";
import React, { useState } from "react";
import OInputNumber from "../../../screens/form/OInputNumber";
import { MEASURE_UNIT } from "../../../utils/constants";

const ReportBudgetFormList = ({
  form,
  name,
  goalName,
  planName,
  nameValue,
}) => {
  // const [form] = Form.useFormInstance();

  return (
    <>
      <Form.List name={[planName, "budgetList"]}>
        {(subFields, subOpt) => {
          return (
            <>
              {subFields.map((subField) => {
                const budget =
                  form.getFieldsValue().items[name].goalObjects[goalName]
                    .planList[planName]?.budgetList[subField.name];
                return (
                  <>
                    <Card
                      size="small"
                      bordered
                      title={`Төсвийн санал`}
                      headStyle={{
                        backgroundColor: "#ddf247",
                      }}
                    >
                      <Descriptions
                        bordered
                        size="small"
                        layout="vertical"
                        column={4}
                      >
                        <Descriptions.Item label="Тоо, ширхэг:" span={2}>
                          {budget?.quantity}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт):"
                          span={2}
                        >
                          {MEASURE_UNIT[budget?.measureUnit]}
                        </Descriptions.Item>
                        <Descriptions.Item label="Нэгж үнэ:" span={2}>
                          {budget?.unitPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Нийт үнэ:" span={2}>
                          {budget?.totalPrice}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                          span={2}
                        >
                          {budget?.provider}
                        </Descriptions.Item>
                        <Descriptions.Item label="Бусад эх үүсвэрээс:" span={2}>
                          {budget?.other}
                        </Descriptions.Item>
                        <Descriptions.Item label="МОНЭС-аас:" span={2}>
                          {budget?.mnFund}
                        </Descriptions.Item>
                      </Descriptions>
                      <br />
                      <Form.Item
                        label="Хэрэгжүүлсэн дүн"
                        name={[subField.name, nameValue]}
                        // rules={validator()
                        //   .required()
                        //   .build()}
                      >
                        <OInputNumber
                          placeholder="Хэрэгжүүлсэн дүн"
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Card>
                  </>
                );
              })}
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default ReportBudgetFormList;
