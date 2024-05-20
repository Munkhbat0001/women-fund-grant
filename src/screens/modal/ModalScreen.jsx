// import { SystemContext } from "@/context/SystemContext";
import { Modal, Space, Button, Spin } from "antd";
import { forwardRef, useContext, useState } from "react";

const ModalScreen = ({ onCancel, onOk, children, ...others }, ref) => {
  //   const { loading } = useContext(SystemContext);
  const [loading, setLoading] = useState(false);

  const customFooter = [
    <Space className="ml-auto">
      <Button onClick={onCancel}>Болих</Button>
      <Button type="primary" onClick={onOk}>
        Хадгалах
      </Button>
    </Space>,
  ];

  const modalProps = {
    closable: true,
    // keyboard: false,
    centered: true,
    mask: true,
    // maskClosable: false,
    destroyOnClose: true,
    width: 1000,
    cancelText: "Буцах",
    onCancel,
    onOk,
    confirmLoading: loading,
    ...others,
  };

  return (
    <Modal {...modalProps}>
      <Spin tip="Loading" spinning={loading}>
        <div style={bodyStyles}>{children}</div>
      </Spin>
    </Modal>
  );
};

export default forwardRef(ModalScreen);

const bodyStyles = {
  padding: "12px",
  // backgroundColor: "#f5f5f5"
};
