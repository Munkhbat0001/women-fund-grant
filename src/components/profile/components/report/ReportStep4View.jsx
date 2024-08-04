import { Collapse, Descriptions, Card } from "antd";
import React, { useEffect, useState } from "react";
import { REPORT_MEASURE } from "../../../../utils/operation";
import { useAxios } from "../../../../hooks";

const ReportStep4View = ({ report }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    useAxios(REPORT_MEASURE.format(report.projectId)).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Collapse size="small">
        {data.map((goal, index) => {
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
                  <Descriptions.Item label="Хүлээгдэж буй үр дүн:" span={2}>
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
                {goal.imeasureDtoList.map((object, subIndex) => {
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
                        <Descriptions.Item label="Тайлбар:" span={2}>
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
                      <br />
                      <Descriptions
                        bordered
                        size="small"
                        title="Тайлан"
                        layout="vertical"
                        column={4}
                      >
                        <Descriptions.Item label="Биелэлт (тоо)" span={2}>
                          {object?.fulfillment}
                        </Descriptions.Item>
                        <Descriptions.Item label="Дэлгэрэнгүй тайлбар" span={2}>
                          {object?.description}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  );
                })}
              </Collapse.Panel>
            </>
          );
        })}
      </Collapse>
    </>
  );
};

export default ReportStep4View;
