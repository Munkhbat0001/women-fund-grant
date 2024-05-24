import { Form, Button, Input, InputNumber, Space, Col, DatePicker } from "antd";
// import ODatePicker from "../form/ODatePicker";
import OSelect from "../form/OSelect";
// import OInput from "../form/OInput";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { validator } from "../../utils/validator";

const dateFormat = "YYYY-MM-DD";

export const InputItem = (type, inputProps = {}, onChange = null) => {
  let input = "";

  switch (type) {
    case "number":
      inputProps = { ...inputProps };
      input = <InputNumber {...inputProps} />;
      // input = <OFloatInput {...inputProps} />;
      break;
    case "text":
      inputProps = { ...inputProps };
      input = <Input allowClear {...inputProps} />;
      break;
    case "checkbox":
      inputProps = { ...inputProps };
      input = (
        <>
          {" "}
          <Checkbox allowClear {...inputProps}>
            {inputProps.placeholder}
          </Checkbox>{" "}
        </>
      );
      break;
    case "date":
      inputProps = { ...inputProps };
      input = <DatePicker allowClear format={dateFormat} {...inputProps} />;
      break;
    case "select":
      inputProps = { ...inputProps };
      input = <OSelect allowClear {...inputProps}></OSelect>;
      break;
    default:
      break;
  }

  return input;
};

const TopSearch = ({ filters, onFilter, queryParams, ...others }) => {
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: {
      // offset: 8,
      // span: 16,
    },
  };

  const formStyle = {
    paddingBottom: 12,
  };

  const handleSearch = (values) => {
    const itemTypes = filters.filter((x) => x.type === "date");
    itemTypes.map((item) => {
      const filterName = item.filterName ? item.filterName : item.dataIndex;
      if (values[filterName])
        values[filterName] = values[filterName].format("YYYY-MM-DD");
    });

    onFilter(values);
  };

  const onClear = () => {
    // form.resetFields();
    form.setFieldsValue(
      Object.keys(form.getFieldsValue()).reduce(
        (acc, curr) => ({ ...acc, [curr]: undefined }),
        {}
      )
    );
    onFilter(form.getFieldsValue());
  };

  return (
    <>
      <div>
        <Form form={form} onFinish={handleSearch} layout="inline">
          {filters.map(
            ({
              type,
              title,
              filterName,
              dataIndex,
              pattern,
              selectName,
              selectValue,
              selectAPI,
              options,
              topWidth,
              topMaxLength,
              isRequired = false,
            }) => {
              let inputProps = {
                style: { width: "150px" },
                placeholder: title,
              };

              if (type === "text") {
                inputProps.pattern = pattern;
              }

              if (type === "select") {
                inputProps.selectAPI = selectAPI;
                inputProps.selectName = selectName;
                inputProps.selectValue = selectValue;
                inputProps.showSearch = true;
                inputProps.options = options;
              }
              if (topWidth) {
                inputProps.style.width = topWidth;
              }

              if (topMaxLength) {
                inputProps.maxLength = topMaxLength;
              }

              if (type === "checkbox") {
                tailLayout.valuePropName = "checked";
              }

              if (isRequired === true) {
                console.log("isRequired: ", isRequired);
                console.log(
                  "filterName ? filterName : dataIndex: ",
                  filterName ? filterName : dataIndex
                );
                tailLayout.rules = validator().required("Оруулна уу").build();
              } else {
                tailLayout.rules = [];
              }

              return (
                <Form.Item
                  key={dataIndex}
                  name={filterName ? filterName : dataIndex}
                  {...tailLayout}
                  style={formStyle}
                >
                  {/* <Input placeholder={title} /> */}
                  {InputItem(type, inputProps)}
                </Form.Item>
              );
            }
          )}
          <Col key="mobileNumber" className="gutter-row">
            <Space>
              <Button
                className="ml-auto"
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Хайх
              </Button>
              <Button type="default" onClick={onClear} icon={<RedoOutlined />}>
                Дахин тохируулах
              </Button>
            </Space>
          </Col>
        </Form>
      </div>
    </>
  );
};

export default TopSearch;
