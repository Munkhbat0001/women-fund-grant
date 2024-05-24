import React from "react";
import ListScreen from "../../screens/list/ListScreen";
import { CUSTOMER_GRANT } from "../../utils/operation";
import GrantAdd from "./GrantAdd";

const initial = {
  idField: "grantId",
  selectAPI: CUSTOMER_GRANT,
  insertAPI: CUSTOMER_GRANT,
  updateAPI: CUSTOMER_GRANT,
  creatable: true,
  editable: true,
};

const GrantList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "grantId",
    },
    {
      title: "Гарчиг",
      dataIndex: "title",
    },
    {
      title: "Эхлэх огноо",
      dataIndex: "beginDate",
    },
    {
      title: "Дуусах огноо",
      dataIndex: "endDate",
    },
    {
      title: "Төлөв",
      dataIndex: "statusName",
    },
  ];

  return (
    <>
      <ListScreen
        initial={initial}
        columns={columns}
        form={GrantAdd}
        scroll={{ x: "0" }}
      />
    </>
  );
};

export default GrantList;
