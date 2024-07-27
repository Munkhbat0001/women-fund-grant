import React, { forwardRef, useRef, useState } from "react";
import {
  Image,
  Space,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Card,
  InputNumber,
  Switch,
  Button,
  message,
  Checkbox,
  Upload,
} from "antd";
import Screen from "../../screens/modal/Screen";
import OForm from "../../screens/form/OForm";
import OInputNumber from "../../screens/form/OInputNumber";
import { validator } from "../../utils/validator";
import {
  CUSTOMER_PROJECT_MEMBER_POST,
  FILE_DOWNLOAD,
  FILE_REMOVE,
} from "../../utils/operation";
import FileUpload from "../FileUpload";
import { UploadOutlined } from "@ant-design/icons";
import { showConfirm } from "../modals/Confirmation";
import { useAxios } from "../../hooks";
import { normFile } from "../../utils";

const StepFiveModal = ({ projectId, hide, ...other }, ref) => {
  const formRef = useRef(null);
  const [mode, setMode] = useState();
  const [selectedData, setSelectedData] = useState({});

  const prop = {
    title: "Төсөл хэрэгжүүлэх багийн гишүүн нэмэх",
    okText: "Хадгалах",
    width: 700,
    clearScreen: (row) => {
      console.log("row: ", row);
      if (row) {
        setMode(row.mode);
        // const workExperiencePath = row.workExperiencePath && [
        //   {
        //     uid: `${row.memberId}`,
        //     name: row.workExperiencePath,
        //     status: "done",
        //     url: `${row.workExperiencePath}`,
        //   },
        // ];
        // setSelectedData({
        //   ...row,
        //   workExperiencePath,
        // });
      } else {
        setMode(null);
        setSelectedData({});
      }
    },
    onOk: () => {
      formRef.current.submit();
    },
    ...other,
    onCancel: () => {
      const values = formRef.current.getFieldsValue();
      console.log("values: ", values);
      if (values.workExperiencePath && values.workExperiencePath.length > 0) {
        const name = values.workExperiencePath[0].response;
        if (name) {
          showConfirm({
            title: "Хадгалаагүй зураг байна. Устгах уу?",
            onOk: () => {
              useAxios(FILE_REMOVE + `/${name}`, {}, { method: "DELETE" }).then(
                (res) => {
                  console.log("res: ", res);
                  hide && hide();
                }
              );
            },
          });
        } else {
          hide && hide();
        }
      } else {
        hide && hide();
      }
    },
  };

  const beforeSave = (values) => {
    values.projectId = projectId;
    // if (values.workExperiencePath && values.workExperiencePath.length > 0) {
    //   values.workExperiencePath =
    //     values.workExperiencePath[0].response ||
    //     values.workExperiencePath[0].url;
    // }
    console.log("values: ", values);
    return values;
  };

  const formProps = {
    insertAPI: CUSTOMER_PROJECT_MEMBER_POST,
    updateAPI: CUSTOMER_PROJECT_MEMBER_POST,
    ...other,
    idField: "memberId",
    id: selectedData.memberId,
    mode,
    selectedData,
    beforeSave,
    itemTypes: {
      workExperiencePath: "file",
    },
  };

  let token = "";
  if (localStorage.getItem("customer")) {
    const user = JSON.parse(localStorage.getItem("customer"));
    token = user.token;
  }

  const onRemove = (value) => {
    console.log("value: ", value);
    useAxios(FILE_REMOVE + `/${value.response}`, {}, { method: "DELETE" }).then(
      (res) => {
        console.log("res: ", res);
        // hide && hide();
      }
    );
  };

  return (
    <Screen ref={ref} {...prop}>
      <OForm ref={formRef} {...formProps}>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="lastName"
              label="Овог"
              rules={validator().required().build()}
            >
              <Input placeholder="Овог"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="firstName"
              label="Нэр"
              rules={validator().required().build()}
            >
              <Input
                allowClear
                style={{ width: "100%" }}
                placeholder="Нэр"
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="position"
              label="Албан тушаал"
              rules={validator().required().build()}
            >
              <Input placeholder="Албан тушаал"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="role"
              label="Төсөлд гүйцэтгэх үүрэг"
              rules={validator().required().build()}
            >
              <Input.TextArea
                style={{ width: "100%" }}
                placeholder="Төсөлд гүйцэтгэх үүрэг"
              ></Input.TextArea>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item
              name="email"
              label="И-мэйл"
              rules={validator().required().build()}
            >
              <Input placeholder="И-мэйл"></Input>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item
              name="mobileNumber"
              label="Утас"
              rules={validator().required().build()}
            >
              <OInputNumber
                style={{ width: "100%" }}
                placeholder="Утас"
                formatter={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col flex="1">
            <Form.Item name="leader" valuePropName="checked" label="">
              <Checkbox>Удирдах ажилтан</Checkbox>
            </Form.Item>
          </Col>
          <Col flex="1">
            <Form.Item name="owner" valuePropName="checked" label="">
              <Checkbox>Төсөл хариуцах ажилтан</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <Form.Item
              name="workExperiencePath"
              label="Файл хавсаргах"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              {/* <FileUpload dir="member" /> */}
              <Upload
                action={`/api/upload/file/member`}
                headers={{ Authorization: `Bearer ${token}` }}
                name="file"
                listType="picture"
                maxCount={1}
                // onRemove={onRemove}
                showUploadList={{ showRemoveIcon: false }}
              >
                <Button icon={<UploadOutlined />}> CV хавсаргах</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </OForm>
    </Screen>
  );
};

export default forwardRef(StepFiveModal);
