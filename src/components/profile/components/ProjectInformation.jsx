import { Col, Descriptions, Row } from "antd";
import React, { useEffect, useState } from "react";
import { formatMoney } from "../../../utils";
import { useAxios } from "../../../hooks";
import { CUSTOMER_PROJECT_GET } from "../../../utils/operation";

const ProjectInformation = ({ data = {}, ...other }) => {
  const [project, setProject] = useState({});

  useEffect(() => {
    useAxios(CUSTOMER_PROJECT_GET.format(data.projectId)).then((res) => {
      console.log("res: ", res);
      setProject(res);
    });
  }, []);

  return (
    <>
      <Row gutter={12}>
        <Col span={24}>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="ID:">
              {project?.projectId}
            </Descriptions.Item>
            <Descriptions.Item label="Төслийн нэр:">
              {project?.projectName}
            </Descriptions.Item>
            <Descriptions.Item label="Үндэслэл:" span={2}>
              {project?.introduction}
            </Descriptions.Item>
            <Descriptions.Item label="Төсөл хэрэгжүүлснээр:" span={4}>
              {project?.benefit}
            </Descriptions.Item>
            <Descriptions.Item label="Төсөл хэрэгжиж эхлэх огноо:">
              {project?.beginDate}
            </Descriptions.Item>
            <Descriptions.Item label="Төсөл хэрэгжиж дуусах огноо:">
              {project?.endDate}
            </Descriptions.Item>
            <Descriptions.Item label="Хүлээгдэж буй үр дүн:">
              {project?.resultName}
            </Descriptions.Item>
            <Descriptions.Item label="Төслийн зорилтот бүлэг:">
              {project?.groupName}
            </Descriptions.Item>
            <Descriptions.Item label="Шууд үр шим хүртэгчийн тоо:">
              {project?.directBenefitCount}
            </Descriptions.Item>
            <Descriptions.Item label="Шууд бус үр шим хүртэгчийн тоо:">
              {project?.notDirectBenefitCount}
            </Descriptions.Item>
            <Descriptions.Item label="Санхүүжилтийн хэмжээ:" span={2}>
              {formatMoney(project?.requestAmount)}
            </Descriptions.Item>
            <Descriptions.Item label="Төсөл хэрэгжүүлэх арга зүй:" span={4}>
              {project?.planText}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );
};

export default ProjectInformation;
