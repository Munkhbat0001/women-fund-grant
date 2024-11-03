import React, { useContext, useRef, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  MinusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Select,
  Table,
  Upload,
  Checkbox,
  Dropdown,
  notification,
} from "antd";
import StepFiveModal from "./StepFiveModal";
import useAxios from "../../hooks/useAxios";
import {
  CUSTOMER_PROJECT_MEMBER,
  CUSTOMER_PROJECT_MEMBER_DELETE,
  FILE_DOWNLOAD,
} from "../../utils/operation";
import { ProjectContext } from "../../pages/ProjectRequest";
import FileUpload from "../FileUpload";
import { showConfirm } from "../modals/Confirmation";

const commands = [
  // {
  //   key: "edit",
  //   label: "Засах",
  // },
  {
    key: "delete",
    label: "Устгах",
  },
];

const StepFive = () => {
  const formRef = useRef(null);
  const {
    project: { projectId, memberList },
    next,
    prev,
    getProject,
  } = useContext(ProjectContext);

  const _onMenuClick = (key, row) => {
    switch (key) {
      case "edit":
        formRef.current.show();
        formRef.current.clear({ ...row, mode: "edit" });
        break;
      case "delete":
        showConfirm({
          title: `${row.firstName} нэртэй хүнийг устгахдаа итгэлтэй байна уу?`,
          onOk: () => {
            useAxios(
              CUSTOMER_PROJECT_MEMBER_DELETE + `/${row.memberId}`,
              {},
              { method: "DELETE", showSuccess: true }
            ).then((res) => {
              getProject();
            });
          },
        });

        break;
      case "download":
        window.open(
          `http://167.71.221.137:8021/file/${row.workExperiencePath}`,
          "_blank"
        );
        // useAxios(
        //   `http://152.42.174.142:8021/file/${row.workExperiencePath}`,
        //   {},
        //   { responseType: "arraybuffer", showLoader: false }
        // ).then((res) => {
        //   // const file = new Blob([res], { type: "application/octet-stream" });
        //   // const fileURL = URL.createObjectURL(file);
        //   // const pdfWindow = window.open();
        //   // pdfWindow.location.href = fileURL;
        // });
        break;
    }
  };

  const columns = [
    {
      title: "Овог",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Албан тушаал",
      dataIndex: "position",
    },
    {
      title: "Төсөлд гүйцэтгэх үүрэг",
      dataIndex: "role",
    },
    {
      title: "И-мэйл",
      dataIndex: "email",
    },
    {
      title: "Утас",
      dataIndex: "mobileNumber",
    },
    {
      title: "Удирдах ажилтан",
      dataIndex: "leader",
      width: "100px",
      align: "center",
      render: (leader) => {
        return <Checkbox checked={leader} />;
      },
    },
    {
      title: "Төсөл хариуцах ажилтан",
      dataIndex: "owner",
      width: "100px",
      align: "center",
      render: (owner) => {
        return <Checkbox checked={owner} />;
      },
    },
    {
      title: "Файл",
      dataIndex: "workExperiencePath",
      width: "100px",
      align: "center",
      render: (text, row) => {
        return (
          <Button type="link" onClick={() => _onMenuClick("download", row)}>
            Татах
          </Button>
        );
      },
    },
    {
      title: "Үйлдэл",
      dataIndex: "workExperiencePath",
      width: "100px",
      align: "center",
      render: (text, row) => {
        return (
          <Space>
            <Dropdown
              trigger="click"
              menu={{
                items: commands,
                onClick: ({ key }) => _onMenuClick(key, row),
              }}
            >
              <Button>
                <Space>
                  Үйлдэл
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const onFinish = (values) => {};

  // const fetch = () => {
  //   if (projectId)
  //     useAxios(CUSTOMER_PROJECT_MEMBER + `/${projectId}`).then((res) => {
  //       setDataSource(res);
  //     });
  // };

  return (
    <>
      <Row justify="end" style={{ width: "100%", marginBottom: "16px" }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            formRef.current.show();
            formRef.current.clear(null);
          }}
        >
          Гишүүн нэмэх
        </Button>
      </Row>
      <Table
        rowKey={"memberId"}
        style={{ width: "100%" }}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={memberList}
        scroll={{ x: "0" }}
      />
      {React.createElement(StepFiveModal, {
        ref: formRef,
        hide: () => formRef.current.hide(),
        projectId: projectId,
        afterSave: () => {
          getProject();
          formRef.current.hide();
        },
      })}
      <Row
        gutter={12}
        justify="end"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Space>
          <Button
            // size="large"
            onClick={() => {
              prev && prev();
            }}
          >
            Буцах
          </Button>
          <Button
            // size="large"
            type="primary"
            onClick={() => {
              if (memberList.length === 0) {
                notification.warning({
                  message: "Анхааруулга",
                  description: "Багын гишүүдийг оруулна уу",
                });
              } else {
                next && next();
              }
            }}
          >
            Баталгаажуулах
          </Button>
        </Space>
      </Row>
    </>
    // <Form
    //   name="dynamic_form_nest_item"
    //   onFinish={onFinish}
    //   //   style={{
    //   //     maxWidth: 600,
    //   //   }}
    //   autoComplete="off"
    //   initialValues={{
    //     users: [{}],
    //   }}
    // >
    //   <Form.List name="users">
    //     {(fields, { add, remove }) => (
    //       <>
    //         {fields.map(({ key, name, ...restField }) => (
    //           <Space
    //             key={key}
    //             style={{ display: "flex", marginBottom: 8 }}
    //             align="baseline"
    //           >
    //             <Form.Item {...restField} name={[name, "lastName"]}>
    //               <Input placeholder="Овог" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "firstName"]}>
    //               <Input placeholder="Нэр" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "position"]}>
    //               <Input placeholder="Албан тушаал" />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "role"]}>
    //               <Input
    //                 placeholder="Төсөлд гүйцэтгэх үүрэг"
    //                 style={{ width: "200px" }}
    //               />
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "workExperiencePath"]}>
    //               <div style={{ width: "200px" }}>
    //                 <FileUpload dir="member" />
    //               </div>
    //             </Form.Item>
    //             {/* <Form.Item {...restField} name={[name, "last"]}>
    //               <Checkbox>Удирдах ажилтан</Checkbox>
    //             </Form.Item>
    //             <Form.Item {...restField} name={[name, "last"]}>
    //               <Checkbox>Төсөл хариуцах ажилтан</Checkbox>
    //             </Form.Item> */}
    //             <MinusCircleOutlined
    //               style={{ width: "30px" }}
    //               onClick={() => remove(name)}
    //             />
    //           </Space>
    //         ))}
    //         <Form.Item>
    //           <Button
    //             type="dashed"
    //             onClick={() => add()}
    //             block
    //             icon={<PlusOutlined />}
    //           >
    //             Add field
    //           </Button>
    //         </Form.Item>
    //       </>
    //     )}
    //   </Form.List>
    // </Form>
  );
};

export default StepFive;
