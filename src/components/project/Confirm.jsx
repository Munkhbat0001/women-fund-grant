import React, { useContext, useEffect, useRef, useState } from "react";
import { ProjectContext } from "../../pages/ProjectRequest";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Descriptions,
  Divider,
  Row,
  Space,
  Table,
} from "antd";
import { formatMoney } from "../../utils";
import { isEmpty } from "lodash";
import { useAxios } from "../../hooks";
import { CUSTOMER_PROJECT_SEND } from "../../utils/operation";
import Success from "../modals/Success";
import { useNavigate } from "react-router-dom";
import { MEASURE_UNIT } from "../../utils/constants";
import BudgetTable from "./components/BudgetTable";

const Confirm = () => {
  const { project, next, prev } = useContext(ProjectContext);
  const successRef = useRef(null);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Овог",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Албан тушаал",
      dataIndex: "position",
    },
    {
      title: "Төсөлд гүйцэтгэх үүрэг",
      dataIndex: "role",
    },
    {
      title: "И-мэйл",
      dataIndex: "email",
    },
    {
      title: "Утас",
      dataIndex: "mobileNumber",
    },
    {
      title: "Удирдах ажилтан",
      dataIndex: "leader",
      width: "100px",
      align: "center",
      render: (leader) => {
        return <Checkbox checked={leader} />;
      },
    },
    {
      title: "Төсөл хариуцах ажилтан",
      dataIndex: "owner",
      width: "100px",
      align: "center",
      render: (owner) => {
        return <Checkbox checked={owner} />;
      },
    },
    {
      title: "Файл",
      dataIndex: "workExperiencePath",
      width: "100px",
      align: "center",
      render: (text, row) => {
        return (
          <Button
            type="link"
            onClick={() => {
              window.open(
                `${import.meta.env.API_URL}/file/${row.workExperiencePath}`,
                "_blank"
              );
            }}
          >
            Татах
          </Button>
        );
      },
    },
  ];

  const onFinish = () => {
    useAxios(
      CUSTOMER_PROJECT_SEND.format(project.projectId),
      {},
      { method: "PUT" }
    ).then((res) => {
      successRef.current.show();
      setTimeout(() => {
        navigate("/");
      }, "5000");
    });
  };

  return (
    <>
      <Col span={24}>
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="ID:">
            {project?.projectId}
          </Descriptions.Item>
          <Descriptions.Item label="Төслийн нэр:">
            {project?.projectName}
          </Descriptions.Item>
          <Descriptions.Item label="Үндэслэл:">
            {project?.introduction}
          </Descriptions.Item>
          <Descriptions.Item label="Төсөл хэрэгжүүлснээр:">
            {project?.benefit}
          </Descriptions.Item>
          <Descriptions.Item label="Төсөл хэрэгжиж эхлэх огноо:">
            {project?.beginDate}
          </Descriptions.Item>
          <Descriptions.Item label="Төсөл хэрэгжиж дуусах огноо:">
            {project?.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="Хүлээгдэж буй үр дүн:">
            {project?.resultList?.map((item, index) => {
              return (
                <div>
                  {index + 1}. {item.resultName}
                </div>
              );
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Төслийн зорилтот бүлэг:">
            {project?.groupList?.map((item, index) => {
              return (
                <div>
                  {index + 1}. {item.groupName}
                </div>
              );
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Шууд үр шим хүртэгчийн тоо:">
            {project?.directBenefitCount}
          </Descriptions.Item>
          <Descriptions.Item label="Шууд бус үр шим хүртэгчийн тоо:">
            {project?.notDirectBenefitCount}
          </Descriptions.Item>
          <Descriptions.Item label="Санхүүжилтийн хэмжээ:">
            {formatMoney(project?.requestAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="Төсөл хэрэгжүүлэх арга зүй:">
            {project?.planText}
          </Descriptions.Item>
        </Descriptions>

        <br />
        {project?.goalList.map((item, index) => {
          return (
            <>
              <Collapse collapsible="header" defaultActiveKey={["1"]}>
                <Collapse.Panel header={`Зорилго ${index + 1}`} key="1">
                  <>
                    <Descriptions
                      bordered
                      size="small"
                      layout="vertical"
                      column={4}
                    >
                      <Descriptions.Item label="Тайлбар:" span={2}>
                        {item?.description}
                      </Descriptions.Item>
                      <Descriptions.Item label="Хүлээгдэж буй үр дүн:" span={2}>
                        {item?.resultWaiting}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Үр дүнг хэмжих шалгуур үзүүлэлт:"
                        span={2}
                      >
                        {item?.resultMeasure}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Учирч болзошгүй саад бэрхшээл:"
                        span={2}
                      >
                        {item?.problem}
                      </Descriptions.Item>
                    </Descriptions>
                    <br />
                    <Collapse collapsible="header" defaultActiveKey={["1"]}>
                      {item.goalObjects.map((object, subIndex) => {
                        return (
                          <>
                            <br />
                            <Collapse.Panel
                              header={`Зорилт ${subIndex + 1}`}
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
                                <Descriptions.Item label="Тайлбар:" span={2}>
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
                              <br />
                              {object?.planList
                                ?.filter((x) => x.objectId === object.objectId)
                                .map((item, index) => {
                                  return (
                                    <>
                                      <Collapse
                                        collapsible="header"
                                        key={index + 1}
                                      >
                                        <Collapse.Panel
                                          header={`Үйл ажиллагааны төлөвлөгөө ${
                                            index + 1
                                          }`}
                                        >
                                          <>
                                            <Descriptions
                                              bordered
                                              size="small"
                                              column={1}
                                            >
                                              <Descriptions.Item label="Үйл ажиллагааг хэрэгжүүлэхэд шаардагдах орц:">
                                                {item?.requirement}
                                              </Descriptions.Item>
                                              <Descriptions.Item label="Эхлэх огноо:">
                                                {item?.beginDate}
                                              </Descriptions.Item>
                                              <Descriptions.Item label="Дуусах огноо:">
                                                {item?.endDate}
                                              </Descriptions.Item>
                                              <Descriptions.Item label="Хариуцах эзэн:">
                                                {item?.ownerName}
                                              </Descriptions.Item>
                                            </Descriptions>
                                            <br />
                                            <Divider
                                              orientation="left"
                                              orientationMargin="0"
                                            >
                                              Төсөв төлөвлөгөө
                                            </Divider>
                                            <BudgetTable
                                              dataSource={item.budgetList}
                                            />
                                            {/* <Card
                                              size="small"
                                              bordered
                                              title="Төсвийн санал"
                                            >
                                              <Descriptions
                                                bordered
                                                size="small"
                                                column={1}
                                              >
                                                <Descriptions.Item label="Тоо, ширхэг:">
                                                  {item?.quantity}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Хэмжих нэгж:">
                                                  {
                                                    MEASURE_UNIT[
                                                      item?.measureUnit
                                                    ]
                                                  }
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Нэгж үнэ:">
                                                  {formatMoney(item?.unitPrice)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Нийт үнэ:">
                                                  {formatMoney(
                                                    item?.totalPrice
                                                  )}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Төсөл хэрэгжүүлэгч байгууллагаас:">
                                                  {formatMoney(item?.provider)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Бусад эх үүсвэрээс:">
                                                  {formatMoney(item?.mnFund)}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="МОНЭС-аас:">
                                                  {formatMoney(item?.other)}
                                                </Descriptions.Item>
                                              </Descriptions>
                                            </Card> */}
                                          </>
                                        </Collapse.Panel>
                                      </Collapse>
                                      <br />
                                    </>
                                  );
                                })}
                              {/* {project?.budgetList
                                ?.filter((x) => x.objectId === object.objectId)
                                .map((item, index) => {
                                  return (
                                    <>
                                      <Collapse
                                        collapsible="header"
                                        key={index + 1}
                                      >
                                        <Collapse.Panel
                                          header={`Төсвийн санал ${index + 1}`}
                                        >
                                          <>
                                            <Descriptions
                                              bordered
                                              size="small"
                                              layout="vertical"
                                              column={4}
                                            >
                                              <Descriptions.Item
                                                label="Тоо, ширхэг:"
                                                span={2}
                                              >
                                                {item?.quantity}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="Хэмжих нэгж (хүн, өдөр, хуудас гэх мэт):"
                                                span={2}
                                              >
                                                {item?.measureUnit}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="Нэгж үнэ:"
                                                span={2}
                                              >
                                                {item?.unitPrice}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="Нийт үнэ:"
                                                span={2}
                                              >
                                                {item?.totalPrice}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="Төсөл хэрэгжүүлэгч байгууллагаас:"
                                                span={2}
                                              >
                                                {item?.provider}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="Бусад эх үүсвэрээс:"
                                                span={2}
                                              >
                                                {item?.other}
                                              </Descriptions.Item>
                                              <Descriptions.Item
                                                label="МОНЭС-аас:"
                                                span={2}
                                              >
                                                {item?.mnFund}
                                              </Descriptions.Item>
                                            </Descriptions>
                                          </>
                                        </Collapse.Panel>
                                      </Collapse>
                                      <br />
                                    </>
                                  );
                                })} */}
                            </Collapse.Panel>
                          </>
                        );
                      })}
                    </Collapse>
                    <br />
                  </>
                </Collapse.Panel>
              </Collapse>
              <br />
            </>
          );
        })}
        <br />
      </Col>
      <Divider orientation="left" orientationMargin="0">
        Төсөл хэрэгжүүлэх баг
      </Divider>
      <Table
        rowKey={"memberId"}
        style={{ width: "100%" }}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={project.memberList}
        scroll={{ x: "0" }}
      />
      <Row
        gutter={12}
        justify="end"
        style={{ width: "100%", marginTop: "20px" }}
      >
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
            onClick={() => onFinish()}
          >
            Хүсэлт илгээх
          </Button>
        </Space>
      </Row>
      {React.createElement(Success, {
        ref: successRef,
        title: "Хүсэлт амжилттай илгээгдлээ.",
        hide: () => {
          navigate("/");
          successRef.current.hide();
        },
      })}
    </>
  );
};

export default Confirm;
