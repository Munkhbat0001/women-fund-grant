import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import OInputNumber from "../../screens/form/OInputNumber";
import { useAxios } from "../../hooks";
import {
  CONST_CITY,
  CONST_CUSTOMER_GENDER,
  CONST_CUSTOMER_ROAD,
  CONST_CUSTOMER_TARGET,
  CONST_DISTRICT,
  CUSTOMER_GET,
  CUSTOMER_PUT,
} from "../../utils/operation";
import OSelect from "../../screens/form/OSelect";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { normFile } from "../../utils";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const Information = () => {
  const [form] = Form.useForm();
  const [cityId, setCityId] = useState(0);
  let customer = {};
  let token;
  if (localStorage.getItem("customer")) {
    customer = JSON.parse(localStorage.getItem("customer"));
    token = customer?.token;
  }

  useEffect(() => {
    useAxios(CUSTOMER_GET.format(customer.customerId)).then((res) => {
      let filePath, frontPassportLink, backPassportLink;
      if (res.certificatePath || res.rulePath) {
        filePath = [
          {
            uid: `${customer.customerId}`,
            name: `${
              customer.typeId === 100 ? res.certificatePath : res.rulePath
            }`,
            status: "done",
            url: `http://167.71.221.137:8021/file/${
              customer.typeId === 100 ? res.certificatePath : res.rulePath
            }`,
          },
        ];
      }

      if (res.frontPassportLink) {
        frontPassportLink = [
          {
            uid: `${customer.customerId}`,
            name: `${res.frontPassportLink}`,
            status: "done",
            url: `http://167.71.221.137:8021/file/${res.frontPassportLink}`,
          },
        ];
      }
      if (res.backPassportLink) {
        backPassportLink = [
          {
            uid: `${customer.customerId}`,
            name: `${res.backPassportLink}`,
            status: "done",
            url: `http://167.71.221.137:8021/file/${res.backPassportLink}`,
          },
        ];
      }

      form.setFieldsValue({
        ...res,
        dateOfEstablishment: res.dateOfEstablishment
          ? dayjs(res.dateOfEstablishment, "YYYY-MM-DD")
          : null,
        filePath,
        frontPassportLink,
        backPassportLink,
      });
    });
  }, []);

  const onFinish = (values) => {
    const payload = {
      ...values,
      customerId: customer.customerId,
      typeId: customer.typeId,
      dateOfEstablishment: values.dateOfEstablishment.format("YYYY-MM-DD"),
      certificatePath: Array.isArray(values.filePath)
        ? values.filePath[0].response
        : null,
      rulePath: Array.isArray(values.filePath)
        ? values.filePath[0].response
        : null,
      frontPassportLink: Array.isArray(values.frontPassportLink)
        ? values.frontPassportLink[0].response
        : null,
      backPassportLink: Array.isArray(values.backPassportLink)
        ? values.backPassportLink[0].response
        : null,
    };

    useAxios(CUSTOMER_PUT.format(customer.customerId), payload, {
      method: "PUT",
      showSuccess: true,
    }).then((res) => {});
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={12}>
          <Col flex="1" className="column">
            <Form.Item
              name="name"
              label={
                customer?.typeId === 100 ? "Байгууллагын нэр" : "Бүлгийн нэр"
              }
              rules={validator().required().build()}
            >
              <Input
                placeholder={
                  customer?.typeId === 100 ? "Байгууллагын нэр" : "Бүлгийн нэр"
                }
              />
            </Form.Item>
          </Col>
          {customer?.typeId === 100 && (
            <Col flex="1" className="column">
              <Form.Item
                name="certificateNumber"
                label="Байгууллагын гэрчилгээний дугаар"
                rules={validator().required().build()}
              >
                <Input placeholder="Байгууллагын гэрчилгээний дугаар" />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={12}>
          {/* {customer?.typeId === 100 && (
            <Col flex="1" className="column">
              <Form.Item
                name="directorName"
                label="Гүйцэтгэх захиралын нэр"
                rules={validator().required().build()}
              >
                <Input placeholder="Гүйцэтгэх захиралын нэр" />
              </Form.Item>
            </Col>
          )} */}
          <Col flex="1" className="column">
            <Form.Item
              name="employerCount"
              label="Байгууллагын ажилчдын тоо"
              rules={validator().required().build()}
            >
              <OInputNumber
                placeholder="Байгууллагын ажилчдын тоо"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col flex="1" className="column">
            <Form.Item
              name="dateOfEstablishment"
              label="Байгуулагдсан огноо"
              rules={validator().required().build()}
            >
              <DatePicker
                placeholder="Байгуулагдсан огноо"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="roadText"
              label="Үйл ажиллагааны чиглэл"
              rules={validator().required().build()}
            >
              <Input.TextArea
                placeholder="Үйл ажиллагааны чиглэл"
                showCount
                maxLength={300}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1" className="column">
            <Form.Item
              name="roadId"
              label="Тохирох үйл ажиллагааны чиглэлийг сонгоно уу."
              rules={validator().required().build()}
            >
              <OSelect
                placeholder="Тохирох үйл ажиллагааны чиглэлийг сонгоно уу."
                selectAPI={CONST_CUSTOMER_ROAD}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="1" className="column">
            <Form.Item
              name="targetGroupText"
              label="Зорилтот бүлэг"
              rules={validator().required().build()}
            >
              <Input.TextArea
                placeholder="Зорилтот бүлэг"
                showCount
                maxLength={300}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="targetGroupId"
              label="Тохирох зорилтот бүлгийг сонгоно уу"
              rules={validator().required().build()}
            >
              <OSelect
                placeholder="Тохирох зорилтот бүлгийг сонгоно уу"
                selectAPI={CONST_CUSTOMER_TARGET}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="areaCityId"
              label="Аймаг/Дүүрэг"
              rules={validator().required().build()}
            >
              <OSelect
                showSearch
                placeholder="Аймаг"
                selectAPI={CONST_CITY}
                selectName="name"
                selectValue="id"
                style={{ width: "100%" }}
                onChange={(val) => {
                  setCityId(val);
                  form.setFieldValue("areaDistrictId", undefined);
                }}
              />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="areaDistrictId"
              label="Сум/Хороо"
              rules={validator().required().build()}
            >
              <OSelect
                showSearch
                placeholder="Дүүрэг"
                selectAPI={CONST_DISTRICT}
                selectName="name"
                selectValue="id"
                style={{ width: "100%" }}
                parentId={cityId}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="contactAddress"
              label="Дэлгэрэнгүй хаяг"
              rules={validator().required().build()}
            >
              <Input placeholder="Дэлгэрэнгүй хаяг" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="contactPhone"
              label="Холбоо барих утас"
              rules={validator().required().build()}
            >
              <Input placeholder="Холбоо барих утас" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="contactEmail"
              label="Холбоо барих мэйл хаяг"
              // rules={validator().required().build()}
            >
              <Input placeholder="Холбоо барих мэйл хаяг" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="websiteLink"
              label="Вэбсайт"
              // rules={validator().required().build()}
            >
              <Input placeholder="Вэбсайт" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="facebookLink"
              label="Facebook"
              // rules={validator().required().build()}
            >
              <Input placeholder="Facebook" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="twitterLink"
              label="Twitter"
              // rules={validator().required().build()}
            >
              <Input placeholder="Twitter" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="instagramLink"
              label="Instagram"
              // rules={validator().required().build()}
            >
              <Input placeholder="Instagram" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item
              name="linkedInLink"
              label="LinkedIn"
              // rules={validator().required().build()}
            >
              <Input placeholder="LinkedIn" />
            </Form.Item>
          </Col>
        </Row>
        {customer?.typeId === 100 && (
          <>
            <Divider orientation="left">
              Байгууллагын удирдлагын мэдээлэл
            </Divider>
            <Row gutter={12}>
              <Col flex="1">
                <Form.Item
                  name="directorLastName"
                  label="Овог"
                  rules={validator().required().build()}
                >
                  <Input placeholder="Овог" />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item
                  name="directorName"
                  label="Нэр"
                  rules={validator().required().build()}
                >
                  <Input placeholder="Нэр" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col flex="1">
                <Form.Item
                  name="directorPosition"
                  label="Албан тушаал"
                  rules={validator().required().build()}
                >
                  <Input placeholder="Албан тушаал" />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item
                  name="directorGender"
                  label="Хүйс"
                  rules={validator().required().build()}
                >
                  <OSelect
                    placeholder="Хүйс"
                    selectAPI={CONST_CUSTOMER_GENDER}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Дансны мэдээлэл</Divider>
            <Row gutter={12}>
              <Col flex="1">
                <Form.Item
                  name="bankCode"
                  label="Банк"
                  rules={validator().required().build()}
                >
                  <Input placeholder="Банк" />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item
                  name="bankAccount"
                  label="Банкны дугаар"
                  rules={validator().required().build()}
                >
                  <OInputNumber
                    placeholder="Банкны дугаар"
                    style={{ width: "100%" }}
                    formatter={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Row gutter={24}>
          <Col>
            <Form.Item
              name="filePath"
              label={
                customer.typeId === 100
                  ? "Гэрчилгээ хавсаргах"
                  : "Хурлын тэмдэглэл"
              }
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={validator().required().build()}
            >
              <Upload
                action={`/api/upload/file/certificate`}
                headers={{ Authorization: `Bearer ${token}` }}
                name="file"
                listType="picture"
                maxCount={1}
                // onRemove={onRemove}
                showUploadList={{ showRemoveIcon: false }}
              >
                <Button icon={<UploadOutlined />}>
                  {customer.typeId === 100
                    ? "Гэрчилгээ хавсаргах"
                    : "Хурлын тэмдэглэл"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        {customer.typeId === 100 && (
          <Row gutter={12}>
            <Col>
              <Form.Item
                name="frontPassportLink"
                label="Иргэний үнэмлэх урд"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={validator().required().build()}
              >
                <Upload
                  action={`/api/upload/file/identitycard`}
                  headers={{ Authorization: `Bearer ${token}` }}
                  name="file"
                  listType="picture"
                  maxCount={1}
                  // onRemove={onRemove}
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />}>
                    {" "}
                    Иргэний үнэмлэх урд
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="backPassportLink"
                label="Иргэний үнэмлэх ард"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={validator().required().build()}
              >
                <Upload
                  action={`/api/upload/file/identitycard`}
                  headers={{ Authorization: `Bearer ${token}` }}
                  name="file"
                  listType="picture"
                  maxCount={1}
                  // onRemove={onRemove}
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />}>Иргэний үнэмлэх ард</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row justify="end">
          <Col>
            <Button
              icon={<SaveOutlined />}
              type="primary"
              onClick={() => form.submit()}
            >
              Хадгалах
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Information;
