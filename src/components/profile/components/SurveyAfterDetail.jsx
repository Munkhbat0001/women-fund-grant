import React, { forwardRef, useState } from "react";
import { Col, Descriptions, Row } from "antd";
import Screen from "../../../screens/modal/Screen";

const SurveyAfterDetail = ({ ...other }, ref) => {
  const [data, setData] = useState({});
  const props = {
    title: "Тэтгэлгийн дараах судалгаа",
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
            <Descriptions.Item label="Энэхүү тэтгэлийн санхүүжилт нь танай байгууллагын анхны санхүүжилт эсэх:">
              {data.firstFunding ? "Тийм" : "Үгүй"}
            </Descriptions.Item>
            <Descriptions.Item label="Энэхүү төсөл нь танай байгууллагын хэрэгжүүлсэн анхны төсөл эсэх:">
              {data.firstProject ? "Тийм" : "Үгүй"}
            </Descriptions.Item>
            <Descriptions.Item label="Энэхүү тэтгэлгийн санхүүжилт нь танай байгууллагын жилийн төсвийн хэдэн хувийг эзэлж байна вэ?:">
              {data.budget}
            </Descriptions.Item>
            <Descriptions.Item label="Тэтгэлэг олгох үйл ажиллагаатай холбоотой санал хүсэлт байвал энд бичнэ үү.:">
              {data.fundAdvance}
            </Descriptions.Item>
            <Descriptions.Item
              label="Тэтгэлэг олгох хөтөлбөрөөс гадна тэтгэлгийн түнш болон хөдөлгөөнийг
     бэхжүүлэх зорилгын хүрээнд МОНЭС-ийн зохион байгуулдаг бусад
     үйл ажиллагаанд оролцох хүсэлтэй байгаа эсэх:"
            >
              {data.participate ? "Тийм" : "Үгүй"}
            </Descriptions.Item>
            <Descriptions.Item
              label="Тэтгэлэг олгох хөтөлбөрөөс гадна тэтгэлгийн түнш болон хөдөлгөөнийг
     бэхжүүлэх зорилгын хүрээнд МОНЭС-аас цаашид ямар үйл ажиллагаа зохион
     байгуулахыг хүсч байгаа талаарх саналаа энд бичнэ үү:"
            >
              {data.feedback}
            </Descriptions.Item>
            <Descriptions.Item label="Бусад санал хүсэлт:">
              {data.other}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Screen>
  );
};

export default forwardRef(SurveyAfterDetail);
