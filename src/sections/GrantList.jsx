import React from "react";
import CustomerTable from "../screens/listTailwind/CustomerTable";
import { CUSTOMER_GRANT } from "../utils/operation";

const GrantList = () => {
  const columns = [
    {
      key: "1",
      label: "Тэтгэлэг",
      name: "title",
      bold: true,
    },
    {
      key: "2",
      label: "Эхлэх огноо",
      name: "beginDate",
    },
    {
      key: "3",
      label: "Дуусах огноо",
      name: "endDate",
    },
    {
      key: "4",
      label: "Price",
      name: "body",
    },
    {
      key: "5",
      label: "Action",
      name: "action",
    },
  ];

  return (
    <>
      <div className="container pt-[150px] pb-[100px] ">
        <CustomerTable selectAPI={CUSTOMER_GRANT} columns={columns} />
      </div>
    </>
  );
};

export default GrantList;
