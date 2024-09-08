import React, { forwardRef, useState } from "react";
import Screen from "../../../screens/modal/Screen";
import { Col, Descriptions, Row } from "antd";

const SurveyBeforeDetail = ({ ...other }, ref) => {
  const [data, setData] = useState({});
  const props = {
    title: "Тэтгэлгийн өмнөх судалгаа",
    footer: null,
    clearScreen: (row) => {
      setData(row);
    },
    ...other,
  };

  return (
    <Screen ref={ref} {...props}>
      <Row>
        <Col span={24}>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Байгууллагын нэр:">
              {data.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Бөглөсөн огноо:">
              {data.fillDate}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллагын үндсэн стратеги юу вэ?:">
              {data.mainStrategy}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллага хяналт, шинжилгээ-үнэлгээг үйл ажиллагаандаа хийдэг үү, тийм бол хэрхэн хийдэг вэ?:">
              {data.monitoring}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллага үйл ажиллагаандаа өөрсдийн зорилтот бүлгийн хамт олон, олон нийтийн оролцоог хэрхэн хангадаг вэ?:">
              {data.targetGroup}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллага ажилчдынхаа сайн сайхан байдал, хамтын халамжинд хэрхэн анхаардаг вэ?:">
              {data.consider}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллага ямар нэгэн сүлжээ, эвслийн гишүүн үү, тийм бол ямар сүлжээ эвсэлд нэгдсэн бэ?:">
              {data.alliance}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллагын оффисын эзэмшлийн хэлбэр эдгээрийн аль нь вэ?:">
              {data.propertyName}
            </Descriptions.Item>
            <Descriptions.Item label="Танай байгууллагын жилийн төсөвт зардлын эзлэх хувь:"></Descriptions.Item>
            <Descriptions.Item label="цалингийн зардал:">
              {data.salaryExpenses}%
            </Descriptions.Item>
            <Descriptions.Item label="үйл ажиллагааны зардал:">
              {data.operatingExpenses}%
            </Descriptions.Item>
            <Descriptions.Item label="захиргааны зардал:">
              {data.managementExpenses}%
            </Descriptions.Item>
            <Descriptions.Item
              label="Танай байгууллага ямар нэг төсөл, хөтөлбөр хэрэгжүүлж байсан уу?
     Хэрэв тийм бол, өмнөх хэрэгжүүлэлтэд нь ямар нэгэн хүндрэл,
     бэрхшээл тулгарч байсан эсэхийг дэлгэрэнгүй бичнэ үү:"
            >
              {data.implementProject}
            </Descriptions.Item>
            <Descriptions.Item
              label="Танай байгууллагад анхан шатны баримт бүрдүүлэлтээ хангаж,
     нягтлан бодох бүртгэлийн дагуу санхүүгийн тайлангаа тогтмол гаргахад асуудал гардаг уу?
     Хэрэв тийм бол, санхүүгийн тайлан, баримт бүрдүүлэлт дээр ямар дэмжлэг,
     туслалцаа хэрэгтэй байдаг талаар дэлгэрэнгүй бичнэ үү.:"
            >
              {data.financeReport}
            </Descriptions.Item>
            <Descriptions.Item
              label="Боломжтой бол, сүүлийн 3 жилийн хугацаанд хамгийн их санхүүжилт олгосон донор
     болон санхүүжилтийн хэмжээг хуваалцана уу.:"
            >
              {data.lastThreeMaxFunding}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Screen>
  );
};

export default forwardRef(SurveyBeforeDetail);
