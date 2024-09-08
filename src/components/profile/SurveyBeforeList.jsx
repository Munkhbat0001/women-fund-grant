import { Button, Dropdown, Pagination, Row, Space, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAxios } from "../../hooks";
import { DownOutlined } from "@ant-design/icons";
import { SURVEY_BEFORE } from "../../utils/operation";
import { SystemContext } from "../../context/SystemContext";
import { useNavigate } from "react-router-dom";
import SurveyBeforeDetail from "./components/SurveyBeforeDetail";

const SurveyBeforeList = ({ data }) => {
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const { user } = useContext(SystemContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const _onMenuClick = (key, row) => {
    switch (key) {
      case "detailView":
        detailRef.current.clear(row);
        detailRef.current.show();
        break;
    }
  };

  const columns = [
    {
      title: "Бөглөсөн огноо",
      dataIndex: "fillDate",
    },
    {
      title: "Үйлдэл",
      key: "action",
      align: "center",
      width: "120px",
      fixed: "right",
      render: (_, row) => {
        const list = [
          {
            key: "detailView",
            label: "Дэлгэрэнгүй",
          },
        ];

        return (
          <Space>
            <Dropdown
              trigger="click"
              menu={{
                items: [...list],
                onClick: ({ key }) => _onMenuClick(key, row),
              }}
            >
              <Button>
                <Space>
                  Үйлдэл
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const onShow = () => {
    navigate("/survey-before");
  };

  const fetch = () => {
    setLoading(true);

    useAxios(
      SURVEY_BEFORE + `?customerId=${user.customerId}`,
      {},
      { showLoader: false }
    )
      .then((res) => {
        setDataSource(res.list);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Row justify="end" style={{ marginBottom: "10px" }}>
        <Button type="primary" onClick={onShow}>
          Тэтгэлгийн өмнөх судалгаа оруулах
        </Button>
      </Row>
      <Table
        rowKey={"id"}
        style={{ width: "100%" }}
        className="o-table"
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "0" }}
      />
      {React.createElement(SurveyBeforeDetail, {
        ref: detailRef,
        hide: () => detailRef.current.hide(),
      })}
    </>
  );
};

export default SurveyBeforeList;
