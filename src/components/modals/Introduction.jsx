import React, { forwardRef, useState } from "react";
import Screen from "../../screens/modal/Screen";
import { useNavigate } from "react-router-dom";

const Introduction = ({ ...other }, ref) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const props = {
    title: "Хүсэлт илгээх",
    okText: "Хүсэлт илгээх",
    onOk: () => {
      navigate(`/request/${data.grantId}`);
    },
    clearScreen: (row) => {
      setData(row);
    },
    ...other,
  };

  return (
    <>
      <Screen ref={ref} {...props}>
        {<div dangerouslySetInnerHTML={{ __html: data.body }} />}
      </Screen>
    </>
  );
};

export default forwardRef(Introduction);
