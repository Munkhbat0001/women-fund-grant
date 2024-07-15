import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";
import "./assets/main.less";
import enUSIntl from "antd/locale/en_US";
import { validationMessagesMn } from "./locales/antdValidation";
import { SystemProvider } from "./context/SystemContext";
import WithAxios from "./context/WithAxios";

const formConfig = {
  validateMessages: validationMessagesMn,
};

export const antdConfig = {
  theme: {
    token: {
      colorPrimary: "#884cdb",
    },
  },
  locale: enUSIntl,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider form={formConfig} {...antdConfig}>
    <SystemProvider>
      {/* <React.StrictMode> */}
      <WithAxios>
        <App />
      </WithAxios>
      {/* </React.StrictMode> */}
    </SystemProvider>
  </ConfigProvider>
);
