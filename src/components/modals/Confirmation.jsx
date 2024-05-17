import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

export function showConfirm({
  title = "Итгэлтэй байна уу?",
  cancelText = "Буцах",
  content = undefined,
  onOk,
  onCancel,
  onCallBack = (result) => {},
} = {}) {
  confirm({
    title,
    cancelText,
    icon: <ExclamationCircleFilled />,
    content,
    onOk() {
      if (onOk) onOk();
      onCallBack("OK");
    },
    onCancel() {
      if (onCancel) onCancel();
      onCallBack("CANCEL");
    },
  });
}
