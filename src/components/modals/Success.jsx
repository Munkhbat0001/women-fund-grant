import React, { forwardRef } from "react";
import Screen from "../../screens/modal/Screen";
import { Button, Result } from "antd";

const Success = ({ title, subTitle = "", hide, ...other }, ref) => {
  const props = {
    title: "",
    footer: null,
    maskClosable: true,
    width: "450px",
    ...other,
  };

  return (
    <>
      <Screen ref={ref} {...props}>
        <Result
          status="success"
          title={title}
          subTitle={subTitle}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                hide && hide();
              }}
            >
              Хаах
            </Button>,
          ]}
        />
      </Screen>
    </>
  );
};

export default forwardRef(Success);
