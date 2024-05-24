import { PageContainer } from "@ant-design/pro-components";

const BasePageContainer = (props) => {
  // console.log("props: ", props)
  return (
    <>
      <PageContainer>{props.children}</PageContainer>
    </>
  );
};

export default BasePageContainer;
