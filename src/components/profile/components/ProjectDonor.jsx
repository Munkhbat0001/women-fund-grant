import { Card, Collapse, Descriptions, Table } from "antd";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useAxios } from "../../../hooks";
import { CUSTOMER_PROJECT_GRANT_GET } from "../../../utils/operation";
import { formatMoney } from "../../../utils";

const ProjectDonor = ({ data = {}, ...other }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_GRANT_GET.format(data.projectId)).then((res) => {
      setDataSource(res);
    });
  }, []);

  const tableProps = {
    rowKey: "financeId",
    columns: [
      {
        title: "Санхүүжүүлэгч байгууллага",
        dataIndex: "name",
      },
      {
        title: "Санхүүжилтийн хэмжээ",
        dataIndex: "advanceAmount",
        align: "right",
        render: (text) => formatMoney(text),
      },
    ],
    dataSource,
    bordered: true,
    pagination: false,
    sticky: true,
    size: "small",
    scroll: { y: "300px" },
  };

  return (
    <>
      <Table
        className="o-table"
        {...tableProps}
        style={{ marginBottom: "10px" }}
      />
    </>
  );
};

export default ProjectDonor;
