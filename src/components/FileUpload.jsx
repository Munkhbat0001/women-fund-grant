import React, { useState } from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ dir, ...other }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    console.log("fileList: ", newFileList);
    setFileList(newFileList);
  };

  let token = "";
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
  }

  console.log("other: ", other);

  return (
    <Upload
      action={`/api/v2/image-upload/${dir}`}
      headers={{ Authorization: `Bearer ${token}` }}
      onChange={onChange}
      fileList={fileList}
      //   listType="text"
    >
      <Button icon={<UploadOutlined />} style={{ width: "200px" }}>
        Файл хавсаргах
      </Button>
    </Upload>
  );
};

export default FileUpload;
