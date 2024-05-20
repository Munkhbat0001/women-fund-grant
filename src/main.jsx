import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";
import enUSIntl from "antd/locale/en_US";
import { validationMessagesMn } from "./locales/antdValidation";
import { SystemProvider } from "./context/SystemContext";

const formConfig = {
  validateMessages: validationMessagesMn,
};

export const antdConfig = {
  // theme: {
  //   token: {
  //     colorPrimary: "#FFCC29",
  //   },
  // },
  locale: enUSIntl,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider form={formConfig} {...antdConfig}>
    <SystemProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </SystemProvider>
  </ConfigProvider>
);
