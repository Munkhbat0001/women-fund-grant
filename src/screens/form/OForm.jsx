import { Form, Space, Button } from "antd";
import React, { forwardRef, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const OForm = (
  {
    idField,
    insertAPI,
    updateAPI,
    detailAPI,
    afterSave,
    beforeSave,
    mode,
    id,
    children,
    selectedData,
    initValue,
    isSetValue,
    itemTypes = {},
    onFinish,
    ...others
  } = {},
  ref
) => {
  const [form] = Form.useForm();

  const getDetail = (newId) => {
    if (selectedData) {
      Object.entries(itemTypes).forEach(([key, value]) => {
        if (selectedData.hasOwnProperty(key) && selectedData[key]) {
          if (value == "datetime")
            selectedData[key] = dayjs(selectedData[key], "YYYY-MM-DD HH:mm");
          if (value == "date")
            selectedData[key] = dayjs(selectedData[key], "YYYY-MM-DD");
          if (value == "time")
            selectedData[key] = dayjs(selectedData[key], "HH:mm");
          if (value == "file" && selectedData[key]) {
            selectedData[key] = [
              {
                uid: `${id}`,
                name: `${selectedData[key]}`,
                status: "done",
                url: `${import.meta.env.API_URL}/file/${selectedData[key]}`,
              },
            ];
          }
        }
      });
      form.setFieldsValue(selectedData);
    } else {
      // useAxios();
    }
  };

  useEffect(() => {
    if ((mode == "edit" && id) || isSetValue === true) {
      getDetail(id);
    } else if (mode == "create" && initValue) {
      form.setFieldsValue(initValue);
    }
  }, [mode, id]);

  const onSave = async (values) => {
    const url = mode === "edit" ? updateAPI + `/${id}` : insertAPI;
    const method = mode === "edit" ? "PUT" : "POST";

    if (beforeSave) {
      values = await beforeSave(values);
    }

    if (mode == "edit") values[idField] = id;

    Object.entries(itemTypes).forEach(([key, value]) => {
      if (values.hasOwnProperty(key) && values[key]) {
        if (value == "datetime")
          values[key] = values[key].format("YYYY-MM-DD HH:mm");
        if (value == "date") values[key] = values[key].format("YYYY-MM-DD");
        if (value == "time") values[key] = values[key].format("HH:mm");
        if (
          value == "file" &&
          Array.isArray(values[key]) &&
          values[key][0].response
        ) {
          values[key] = values[key][0].response;
        } else if (Array.isArray(values[key]) && values[key][0].url) {
          values[key] = values[key][0].url;
        }
      }
    });

    useAxios(url, values, { method, showSuccess: true }).then((res) => {
      afterSave && afterSave(values, res);
    });
  };

  const formProps = {
    layout: "vertical",
    onFinish: onFinish ?? onSave,
    // onFinishFailed: onFail
  };

  return (
    <Form form={form} ref={ref} {...formProps}>
      {children}
    </Form>
  );
};

export default forwardRef(OForm);
