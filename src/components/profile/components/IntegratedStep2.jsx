import { EditableProTable } from "@ant-design/pro-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Table,
} from "antd";
import { useAxios } from "../../../hooks";
import { REPORT_DATA, REPORT_DATA_POST } from "../../../utils/operation";
import { isEmpty } from "lodash";
import { IntegratedContext } from "../IntegratedAdd";

const groups = [
  {
    group: "a",
    text: "А. Шууд үр шим хүртэгчдийн тоо (төслийн үйл ажиллагаанд хамрагдаж үр шимийг хүртэгч)",
    isGroup: true,
  },
  {
    group: "training",
    targetGroup: "a",
    text: "Сургалт",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "immediate",
    targetGroup: "a",
    text: "Шууд тусламж, дэмжлэг",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "activity",
    targetGroup: "a",
    text: "Нөлөөллийн үйл ажиллагаа",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "company",
    targetGroup: "a",
    text: "Кампанит ажил",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "material",
    targetGroup: "a",
    text: "Ном, гарын авлага, материал хүлээн авсан",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "b",
    text: "Б. Шууд бус үр шим хүртэгчдийн тоо (төслийн үйл ажиллагаанд шууд хамрагдсан боловч шууд үр шимийг хүртэгч бус, үйл ажиллагаанд хамрагдаагүй боловч шууд бусаар үр шимийг хүртэгч)",
    isGroup: true,
  },
  {
    group: "meeting",
    targetGroup: "b",
    text: "Уулзалт, хэлэлцүүлэг",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "research",
    targetGroup: "b",
    text: "Судалгаа",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "social",
    targetGroup: "b",
    text: "Нийгмийн сүлжээний хандалт",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "c",
    text: "В. Эмэгтэйчүүдийн бүлгийн тоо",
    isGroup: true,
  },
  {
    group: "oldergroup",
    targetGroup: "c",
    text: "Төслийн хүрч ажилласан хуучин бүлгийн тоо",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "gender",
    targetGroup: "c",
    text: "Төслөөр дамжуулан шинээр үүсгэсэн охид, эмэгтэйчүүд, бэлгийн болон хүйсийн цөөнхийн бүлгийн тоо",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "d",
    text: "Г. Эмэгтэйчүүдийн бүлгийн гишүүдийн тоо",
    isGroup: true,
  },
  {
    group: "members",
    targetGroup: "d",
    text: "Хүрч ажилласан хуучин бүлгүүдийн нийт гишүүдийн тоо",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
  {
    group: "totalnumber",
    targetGroup: "d",
    text: "Шинээр үүсгэсэн бүлгүүдийн нийт гишүүдийн тоо",
    underTen: 0,
    tenSeventeen: 0,
    eighteenThirtyFive: 0,
    thirtySixFiftyFive: 0,
    overFiftyFive: 0,
    ruralWoman: 0,
    disabledWoman: 0,
    underEighteenBoy: 0,
    overEighteenBoy: 0,
    underEighteenSexual: 0,
    overEighteenSexual: 0,
    total: 0,
  },
];

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  // const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  // useEffect(() => {
  //   if (editing) {
  //     inputRef.current?.focus();
  //   }
  // }, [editing]);
  // const toggleEdit = () => {
  //   // setEditing(!editing);
  //   form.setFieldsValue({
  //     [dataIndex]: record[dataIndex],
  //   });
  // };

  useEffect(() => {
    // console.log("form: ", form);
    // console.log("dataIndex: ", dataIndex);
    // console.log("record: ", record);
    // console.log("record[dataIndex]: ", record[dataIndex]);
    if (dataIndex && record)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
  }, []);

  const save = async () => {
    try {
      const values = await form.validateFields();
      // toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  // if (editable) {
  childNode = editable ? (
    <Form.Item
      style={{
        margin: 0,
      }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title} оруулна уу`,
        },
      ]}
    >
      <Input ref={inputRef} onPressEnter={save} onBlur={save} />
    </Form.Item>
  ) : (
    <div
      className="editable-cell-value-wrap"
      style={{
        paddingRight: 24,
      }}
      // onClick={toggleEdit}
    >
      {children}
    </div>
  );
  // }
  return <td {...restProps}>{childNode}</td>;
};

const IntegratedStep2 = () => {
  const [dataSource, setDataSource] = useState([]);
  const { prev, next, loading, projectId, report } =
    useContext(IntegratedContext);

  useEffect(() => {
    useAxios(REPORT_DATA.format(projectId, 151)).then((res) => {
      const list = [...groups];
      if (isEmpty(res)) {
        setDataSource(groups);
      } else {
        list.map((item) => {
          if (!["a", "b", "c", "d"].includes(item.group)) {
            const data = res.find((x) => x.groupName === item.group);
            if (data) {
              item.id = data.id;
              item.reportId = data.reportId;
              item.projectId = data.projectId;
              item.typeId = data.typeId;
              item.groupName = data.group;
              item.targetGroup = data.targetGroup;
              item.underTen = parseFloat(data.underTen);
              item.tenSeventeen = parseFloat(data.tenSeventeen);
              item.eighteenThirtyFive = parseFloat(data.eighteenThirtyFive);
              item.thirtySixFiftyFive = parseFloat(data.thirtySixFiftyFive);
              item.overFiftyFive = parseFloat(data.overFiftyFive);
              item.ruralWoman = parseFloat(data.ruralWoman);
              item.disabledWoman = parseFloat(data.disabledWoman);
              item.underEighteenBoy = parseFloat(data.underEighteenBoy);
              item.overEighteenBoy = parseFloat(data.overEighteenBoy);
              item.underEighteenSexual = parseFloat(data.underEighteenSexual);
              item.overEighteenSexual = parseFloat(data.overEighteenSexual);
              item.total = parseFloat(data.total);
            }
          }
        });
        setDataSource(list);
      }
    });
  }, []);

  const sharedOnCell = (row, index) => {
    if (["a", "b", "c", "d"].includes(row.group)) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };

  const getColSum = (item) => {
    return (
      parseFloat(item.underTen || 0) +
      parseFloat(item.tenSeventeen || 0) +
      parseFloat(item.eighteenThirtyFive || 0) +
      parseFloat(item.thirtySixFiftyFive || 0) +
      parseFloat(item.overFiftyFive || 0) +
      parseFloat(item.ruralWoman || 0) +
      parseFloat(item.disabledWoman || 0) +
      parseFloat(item.underEighteenBoy || 0) +
      parseFloat(item.overEighteenBoy || 0) +
      parseFloat(item.underEighteenSexual || 0) +
      parseFloat(item.overEighteenSexual || 0)
    );
  };

  const defaultColumns = [
    {
      title: "Зорилтот бүлэг",
      dataIndex: "text",
      width: "200px",
      onCell: (row, index) => {
        return {
          colSpan: ["a", "b", "c", "d"].includes(row.group) ? 13 : 1,
        };
      },
    },
    {
      title: "Нийт",
      dataIndex: "total",
      align: "center",
      width: "100px",
      onCell: sharedOnCell,
      render: (text, row) => {
        return getColSum(row);
      },
    },
    {
      title: "10-аас доош насны охид",
      dataIndex: "underTen",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "10-17 насны охид",
      dataIndex: "tenSeventeen",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "18-35 насны эмэгтэй",
      dataIndex: "eighteenThirtyFive",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "36-55 насны эмэгтэй",
      dataIndex: "thirtySixFiftyFive",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "55-аас дээш насны эмэгтэй",
      dataIndex: "overFiftyFive",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "Хөдөөгийн эмэгтэй",
      dataIndex: "ruralWoman",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "Хөгжлийн бэрхшээлтэй эмэгтэй",
      dataIndex: "disabledWoman",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "18 нас хүрээгүй хөвгүүд",
      dataIndex: "underEighteenBoy",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "18-аас дээш насны эрэгтэй",
      dataIndex: "overEighteenBoy",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "18-аас доош насны бэлгийн/ хүйсийн цөөнх",
      dataIndex: "underEighteenSexual",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
    {
      title: "18-аас дээш насны бэлгийн/ хүйсийн цөөнх",
      dataIndex: "overEighteenSexual",
      onCell: sharedOnCell,
      editable: true,
      width: "120px",
    },
  ];
  const onFinish = () => {
    const data = [];
    dataSource.map((item) => {
      if (!["a", "b", "c", "d"].includes(item.group)) {
        data.push({
          id: item.id,
          reportId: item.reportId || report.reportId,
          projectId: item.projectId || projectId,
          typeId: item.typeId || 151,
          groupName: item.group,
          targetGroup: item.targetGroup,
          underTen: parseFloat(item.underTen),
          tenSeventeen: parseFloat(item.tenSeventeen),
          eighteenThirtyFive: parseFloat(item.eighteenThirtyFive),
          thirtySixFiftyFive: parseFloat(item.thirtySixFiftyFive),
          overFiftyFive: parseFloat(item.overFiftyFive),
          ruralWoman: parseFloat(item.ruralWoman),
          disabledWoman: parseFloat(item.disabledWoman),
          underEighteenBoy: parseFloat(item.underEighteenBoy),
          overEighteenBoy: parseFloat(item.overEighteenBoy),
          underEighteenSexual: parseFloat(item.underEighteenSexual),
          overEighteenSexual: parseFloat(item.overEighteenSexual),
          total: getColSum(item),
        });
      }
    });

    useAxios(REPORT_DATA_POST.format(projectId), data, {
      showSuccess: true,
      method: "POST",
    }).then((res) => {
      next && next();
    });
  };

  const handleSave = (row) => {
    console.log("row: ", row);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.group === item.group);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return { ...col };
    }
    return {
      ...col,
      onCell: (record) => {
        let obj = {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        };

        if (["a", "b", "c", "d"].includes(record.group)) obj.colSpan = 0;

        return obj;
      },
    };
  });
  return (
    <div>
      <Col xs={{ flex: "100%" }}>
        <Row gutter={12} justify="end">
          <Col>
            <Button
              onClick={() => {
                prev && prev();
              }}
            >
              Буцах
            </Button>
          </Col>
          <Col>
            <Button
              onClick={onFinish}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Үргэлжлүүлэх
            </Button>
          </Col>
        </Row>
      </Col>
      <Table
        size="small"
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: "100vw" }}
        sticky
      />
      {/* <Table
        size="small"
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        showHeader={false}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: "100vw" }}
      /> */}
    </div>
  );
};

export default IntegratedStep2;
