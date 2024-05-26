import React, { useContext } from "react";
import CustomerTable from "../screens/listTailwind/CustomerTable";
import { CUSTOMER_GRANT } from "../utils/operation";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../context/SystemContext";

const GrantList = () => {
  const navigate = useNavigate();
  const { loggedIn, user, logout, loading } = useContext(SystemContext);

  const onClick = (row) => {
    // todo энэ тэтгэлэг дээр хүсэлт явуулсан эсэхийг шалгахаа шийдээгүй
    if (loggedIn === 2) {
      navigate("/login");
    } else {
      navigate(`/request/${row.grantId}`);
    }
  };

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
      label: "Үйлдэл",
      name: "action",
      render: (text, row) => {
        return (
          <Button type="link" onClick={() => onClick(row)}>
            Хүсэлт илгээх
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className="container pt-[150px] pb-[100px] ">
        <CustomerTable
          idField="grantId"
          selectAPI={CUSTOMER_GRANT}
          columns={columns}
        />
      </div>
    </>
  );
};

export default GrantList;
