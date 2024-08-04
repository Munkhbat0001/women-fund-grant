import { Button, Descriptions } from "antd";
import React from "react";

const ReportIntegratedStep5View = ({ report }) => {
  return (
    <>
      <Descriptions bordered size="small" title="Тайлан" column={1}>
        <Descriptions.Item label="Тайлан бичсэн хүний нэр" span={2}>
          {report?.reportWriter}
        </Descriptions.Item>
        <Descriptions.Item label="Төсөл хэрэгжиж дууссан огноо" span={2}>
          {report?.projectEndDate}
        </Descriptions.Item>
        <Descriptions.Item label="Аймаг" span={2}>
          {report?.projectCityName}
        </Descriptions.Item>
        <Descriptions.Item label="Дүүрэг" span={2}>
          {report?.projectDistrictName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Энэхүү төсөл нь юугаараа шинэлэг байсан бэ?"
          span={2}
        >
          {report?.projectResultOne}
        </Descriptions.Item>
        <Descriptions.Item
          label="Төсөл хэрэгжсэнээр бий болсон хамгийн чухал өөрчлөлтүүдийн талаар бичнэ үү ( өөрчлөлт нь хувь хүн, хамт олон, байгууллага гэх мэт бүх түвшинд байж болно)."
          span={2}
        >
          {report?.projectResultTwo}
        </Descriptions.Item>
        <Descriptions.Item
          label="Уг төслийг хэрэгжүүлснээр олж авсан сургамжаа хуваалцана уу."
          span={2}
        >
          {report?.projectResultThree}
        </Descriptions.Item>
        <Descriptions.Item
          label="Төслийн цаашдын тогтвортой байдлыг хэрхэн анхаарах вэ?"
          span={2}
        >
          {report?.projectResultFour}
        </Descriptions.Item>
        <Descriptions.Item label="Тохирох үр дүн" span={2}>
          {report?.projectResultName}
        </Descriptions.Item>
        <Descriptions.Item
          label="Төслийн хүрээнд хийсэн олон нийтэд нээлттэй контентийн линкийг хуваалцана уу."
          span={2}
        >
          {report?.contentLink}
        </Descriptions.Item>
        <Descriptions.Item
          label="Боломжтой бол, төслийн хүрээнд боловсруулсан мэдлэгийн бүтээгдэхүүнийг энд хавсаргана уу."
          span={2}
        >
          <Button
            type="link"
            onClick={() => {
              window.open(
                `http://152.42.174.142:8021/file/${report?.attachmentPath}`,
                "_blank"
              );
            }}
          >
            Татах
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default ReportIntegratedStep5View;
