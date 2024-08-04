import { Descriptions } from "antd";
import React from "react";

const ReportStep5View = ({ report }) => {
  return (
    <>
      <Descriptions bordered size="small" title="Тайлан" column={1}>
        <Descriptions.Item label="Тайлан бичсэн хүний нэр" span={2}>
          {report?.reportWriter}
        </Descriptions.Item>
        <Descriptions.Item
          label="Энэхүү тайлангийн хугацаан дахь хамгийн ололт амжилттай зүйл юу байсан бэ?"
          span={2}
        >
          {report?.processResultOne}
        </Descriptions.Item>
        <Descriptions.Item
          label="Уг төслийг хэрэгжүүлэхэд учирсан хүндрэл, сорилт бэрхшээл бий юу? тийм бол, хуваалцана уу?"
          span={2}
        >
          {report?.processResultTwo}
        </Descriptions.Item>
        <Descriptions.Item
          label="Төслийг цаашдын хэрэгжилтэд юуг анхаарах шаардлагатай гэж үзэж байна вэ? "
          span={2}
        >
          {report?.processResultThree}
        </Descriptions.Item>
        <Descriptions.Item
          label="Нэмэлт өөрчлөлт (хэрэв төслийн анхны саналд өөрчлөлт оруулах хүсэлт байвал үндэс, шалтгааны хамт энд бичнэ үү)"
          span={2}
        >
          {report?.additionalChanges}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default ReportStep5View;
