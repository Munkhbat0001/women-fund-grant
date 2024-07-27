import { Card, Collapse, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useAxios } from "../../../hooks";
import { CUSTOMER_PROJECT_BUDGET_GET } from "../../../utils/operation";

const ProjectBudget = ({ data = {}, ...other }) => {
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_BUDGET_GET.format(data.projectId)).then((res) => {
      const items = [];
      res.list.map((plan) => {
        const item = items.find((x) => x.objectId === plan.objectId);
        if (isEmpty(item)) {
          plan.budgetList = [{ ...plan }];
          items.push(plan);
        } else {
          item.budgetList.push(plan);
        }
      });
      setBudget(items);
    });
  }, []);

  return (
    <>
      {budget.map((item, index) => {
        return (
          <>
            <Collapse collapsible="header" key={index + 1}>
              <Collapse.Panel header={`Зорилт ${index + 1}`}>
                <>
                  <Descriptions
                    bordered
                    size="small"
                    layout="vertical"
                    column={4}
                  >
                    <Descriptions.Item label="Тайлбар:" span={2}>
                      {item?.objectDescription}
                    </Descriptions.Item>
                    <Descriptions.Item label="Хүлээгдэж буй үр дүн:" span={2}>
                      {item?.objectResultWaiting}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                      span={2}
                    >
                      {item?.objectResultMeasure}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Учирч болзошгүй саад бэрхшээл:"
                      span={2}
                    >
                      {item?.objectProblem}
                    </Descriptions.Item>
                  </Descriptions>
                  <br />
                  {item?.budgetList.map((child, subIndex) => {
                    return (
                      <>
                        <Card
                          type="inner"
                          title={`Үйл ажиллагаа ${subIndex + 1}`}
                          size="small"
                          headStyle={{
                            backgroundColor: "#935dde",
                            color: "white",
                          }}
                        >
                          <Descriptions
                            bordered
                            size="small"
                            layout="vertical"
                            column={4}
                          >
                            <Descriptions.Item label="Тоо, ширхэг:" span={2}>
                              {child?.quantity}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт):"
                              span={2}
                            >
                              {child?.measureUnit}
                            </Descriptions.Item>
                            <Descriptions.Item label="Нэгж үнэ:" span={2}>
                              {child?.unitPrice}
                            </Descriptions.Item>
                            <Descriptions.Item label="Нийт үнэ:" span={2}>
                              {child?.totalPrice}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                              span={2}
                            >
                              {child?.provider}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Бусад эх үүсвэрээс:"
                              span={2}
                            >
                              {child?.other}
                            </Descriptions.Item>
                            <Descriptions.Item label="МОНЭС-аас:" span={2}>
                              {child?.mnFund}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      </>
                    );
                  })}
                </>
              </Collapse.Panel>
            </Collapse>
            <br />
          </>
        );
      })}
    </>
  );
};

export default ProjectBudget;
