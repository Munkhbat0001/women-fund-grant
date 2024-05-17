import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";
import enUSIntl from "antd/locale/en_US";
import { validationMessagesMn } from "./locales/antdValidation";
import { CustomerProvider } from "./context/CustomerContext";

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
    <CustomerProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </CustomerProvider>
  </ConfigProvider>
);
