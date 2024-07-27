import React, { useContext, useEffect, useRef, useState } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Table, Checkbox } from "antd";
import { CUSTOMER_PROJECT_MEMBER_GET } from "../../../utils/operation";
import { useAxios } from "../../../hooks";

const ProjectMember = ({ data }) => {
  const [dataSource, setDataSource] = useState([]);

  const _onMenuClick = (key, row) => {
    switch (key) {
      case "download":
        useAxios(
          FILE_DOWNLOAD + `/${row.workExperiencePath}`,
          {},
          { responseType: "arraybuffer", showLoader: false }
        ).then((res) => {
          // const file = new Blob([res], { type: "application/octet-stream" });
          // const fileURL = URL.createObjectURL(file);
          // const pdfWindow = window.open();
          // pdfWindow.location.href = fileURL;
        });
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
  ];

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_MEMBER_GET.format(data.projectId)).then((res) => {
      setDataSource(res);
    });
  }, []);

  return (
    <>
      <Table
        rowKey={"memberId"}
        style={{ width: "100%" }}
        bordered
        size="small"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "0" }}
      />
    </>
  );
};

export default ProjectMember;
