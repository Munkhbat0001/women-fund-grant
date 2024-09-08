import { Table } from "antd";
import React from "react";
import { MEASURE_UNIT } from "../../../utils/constants";
import { formatMoney } from "../../../utils";

const BudgetTable = ({ dataSource }) => {
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
      <Table
        className="o-table"
        bordered
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        summary={summary}
        // scroll={{ x: "100vw" }}
      />
    </>
  );
};

export default BudgetTable;
