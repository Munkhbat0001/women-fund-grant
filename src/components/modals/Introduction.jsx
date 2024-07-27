import React, { forwardRef } from "react";
import Screen from "../../screens/modal/Screen";

const Introduction = ({ ...other }, ref) => {
  const props = {
    title: "ta",
    ...other,
  };

  return (
    <>
      <Screen ref={ref} {...props}>
        <div>test</div>
      </Screen>
    </>
  );
};

export default forwardRef(Introduction);
