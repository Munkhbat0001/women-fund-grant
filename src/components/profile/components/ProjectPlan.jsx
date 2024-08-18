import { Card, Collapse, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useAxios } from "../../../hooks";
import { CUSTOMER_PROJECT_PLAN_GET } from "../../../utils/operation";
import { formatMoney } from "../../../utils";

const ProjectPlan = ({ data = {}, ...other }) => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_PLAN_GET.format(data.projectId)).then((res) => {
      const items = [];
      res.list.map((plan) => {
        const item = items.find((x) => x.objectId === plan.objectId);
        if (isEmpty(item)) {
          plan.planList = [{ ...plan }];
          items.push(plan);
        } else {
          item.planList.push(plan);
        }
      });
      setPlan(items);
    });
  }, []);

  return (
    <>
      {plan.map((item, index) => {
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
                  {item?.planList.map((child, subIndex) => {
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
                            <Descriptions.Item
                              label="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц:"
                              span={2}
                            >
                              {child?.requirement}
                            </Descriptions.Item>
                            <Descriptions.Item
                              label="Хэрэгжүүлэх хугацаа:"
                              span={2}
                            >
                              {child?.termUnitName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Хариуцах эзэн:" span={2}>
                              {child?.ownerName}
                            </Descriptions.Item>
                          </Descriptions>
                          <br />
                          <Card size="small" bordered title="Төсвийн санал">
                            <Descriptions bordered size="small" column={1}>
                              <Descriptions.Item label="Тоо, ширхэг:">
                                {child?.quantity}
                              </Descriptions.Item>
                              <Descriptions.Item label="Хэмжих нэгж:">
                                {child?.measureUnit}
                              </Descriptions.Item>
                              <Descriptions.Item label="Нэгж үнэ:">
                                {formatMoney(child?.unitPrice)}
                              </Descriptions.Item>
                              <Descriptions.Item label="Нийт үнэ:">
                                {formatMoney(child?.totalPrice)}
                              </Descriptions.Item>
                              <Descriptions.Item label="Төсөл хэрэгжүүлэгч байгууллагаас:">
                                {formatMoney(child?.provider)}
                              </Descriptions.Item>
                              <Descriptions.Item label="Бусад эх үүсвэрээс:">
                                {formatMoney(child?.mnFund)}
                              </Descriptions.Item>
                              <Descriptions.Item label="МОНЭС-аас:">
                                {formatMoney(child?.other)}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
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

export default ProjectPlan;
