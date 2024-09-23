import React, { forwardRef, useState } from "react";
import Screen from "../../../../screens/modal/Screen";
import { Descriptions } from "antd";

const ReportStatusView = ({ ...other }, ref) => {
  const [data, setData] = useState({});
  const props = {
    title: "Шалтгаан",
    footer: null,
    clearScreen: (row) => {
      setData(row);
    },
    ...other,
  };
  return (
    <>
      <Screen ref={ref} {...props}>
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="Төлөв:">
            {data?.statusName}
          </Descriptions.Item>
          <Descriptions.Item label="Төлөвийн шалтгаан:">
            {data?.statusDescription}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Санхүүгийн төлөв:">
            {data?.financeStatusName}
          </Descriptions.Item>
          <Descriptions.Item label="Санхүүгийн төлөвийн шалтгаан:">
            {data?.financeStatusDescription}
          </Descriptions.Item> */}
        </Descriptions>
      </Screen>
    </>
  );
};

export default forwardRef(ReportStatusView);
