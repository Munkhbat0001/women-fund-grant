import { InputNumber } from "antd";

export default ({ formatter, ...others }) => {
  //   const isMobile = useBreakpoint();

  const props = { style: { width: "150px" }, ...others };

  if (!formatter) {
    props.formatter = (value) =>
      `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return <InputNumber {...props} />;
};
