import { EditableProTable } from "@ant-design/pro-components";
import { Button, Col, Input, Row, Space, Tag } from "antd";
import React, { useState } from "react";

const groups = [
  {
    group: "a",
    text: "А. Шууд үр шим хүртэгчдийн тоо (төслийн үйл ажиллагаанд хамрагдаж үр шимийг хүртэгч)",
    isGroup: true,
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
  { group: "training", text: "Сургалт" },
  { group: "immediate", text: "Шууд тусламж, дэмжлэг" },
  { group: "activity", text: "Нөлөөллийн үйл ажиллагаа" },
  { group: "company", text: "Кампанит ажил" },
  { group: "material", text: "Ном, гарын авлага, материал хүлээн авсан" },
  {
    group: "b",
    text: "Б. Шууд бус үр шим хүртэгчдийн тоо (төслийн үйл ажиллагаанд шууд хамрагдсан боловч шууд үр шимийг хүртэгч бус, үйл ажиллагаанд хамрагдаагүй боловч шууд бусаар үр шимийг хүртэгч)",
    isGroup: true,
  },
  { group: "meeting", text: "Уулзалт, хэлэлцүүлэг" },
  { group: "research", text: "Судалгаа" },
  { group: "social", text: "Нийгмийн сүлжээний хандалт" },
  { group: "c", text: "В. Эмэгтэйчүүдийн бүлгийн тоо", isGroup: true },
  { group: "oldergroup", text: "Төслийн хүрч ажилласан хуучин бүлгийн тоо" },
  {
    group: "gender",
    text: "Төслөөр дамжуулан шинээр үүсгэсэн охид, эмэгтэйчүүд, бэлгийн болон хүйсийн цөөнхийн бүлгийн тоо",
  },
  {
    group: "d",
    text: "Г. Эмэгтэйчүүдийн бүлгийн гишүүдийн тоо",
    isGroup: true,
  },
  {
    group: "members",
    text: "Хүрч ажилласан хуучин бүлгүүдийн нийт гишүүдийн тоо",
  },
  {
    group: "totalnumber",
    text: "Шинээр үүсгэсэн бүлгүүдийн нийт гишүүдийн тоо",
  },
];

const ProgressStep2 = () => {
  const [editableKeys, setEditableRowKeys] = useState();
  const [dataSource, setDataSource] = useState(groups);

  const columns = [
    {
      title: "Зорилтот бүлэг",
      dataIndex: "text",
      width: "150px",
      renderFormItem: (v, v2, v3) => {
        // console.log("first: ", v, " v2: ", v2);
        return v2.record.text;
      },
      // renderFormItem: (_, { isEditable }) => {
      //   return <Input />;
      // },
      // render: (_, row) => {
      //   // console.log("row: ", row);
      //   return row?.labels?.map((item) => (
      //     <Tag key={item.key}>{item.label}</Tag>
      //   ));
      // },
      // render: (text, row) => {
      //   console.log("text: ", text, " row; ", row);
      //   return text;
      // },
    },
    {
      title: "Нийт",
      dataIndex: "total",
      renderFormItem: (v, { record }, v3) => {
        return record.total;
      },
    },

    {
      title: "10-аас доош насны охид",
      key: "underTen",
      dataIndex: "underTen",
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       whitespace: true,
      //       message: "此项是必填项",
      //     },
      //     {
      //       message: "必须包含数字",
      //       pattern: /[0-9]/,
      //     },
      //     {
      //       max: 16,
      //       whitespace: true,
      //       message: "最长为 16 位",
      //     },
      //     {
      //       min: 6,
      //       whitespace: true,
      //       message: "最小为 6 位",
      //     },
      //   ],
      // },
    },
    {
      title: "10-17 насны охид",
      key: "tenSeventeen",
      dataIndex: "tenSeventeen",
      // valueType: "select",
      // valueEnum: {
      //   all: { text: "全部", status: "Default" },
      //   open: {
      //     text: "未解决",
      //     status: "Error",
      //   },
      //   closed: {
      //     text: "已解决",
      //     status: "Success",
      //   },
      // },
    },
    {
      title: "18-35 насны эмэгтэй",
      dataIndex: "eighteenThirtyFive",
    },
    {
      title: "36-55 насны эмэгтэй",
      dataIndex: "thirtySixFiftyFive",
    },
    {
      title: "55-аас дээш насны эмэгтэй",
      dataIndex: "overFiftyFive",
    },
    {
      title: "Хөдөөгийн эмэгтэй",
      dataIndex: "ruralWoman",
    },
    {
      title: "Хөгжлийн бэрхшээлтэй эмэгтэй",
      dataIndex: "disabledWoman",
    },
    {
      title: "18 нас хүрээгүй хөвгүүд",
      dataIndex: "underEighteenBoy",
    },
    {
      title: "18-аас дээш насны эрэгтэй",
      dataIndex: "overEighteenBoy",
    },
    {
      title: "18-аас доош насны бэлгийн/ хүйсийн цөөнх",
      dataIndex: "underEighteenSexual",
    },
    {
      title: "18-аас дээш насны бэлгийн/ хүйсийн цөөнх",
      dataIndex: "overEighteenSexual",
    },
  ];

  return (
    <>
      <EditableProTable
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={false}
        scroll={{ x: "100vw" }}
        bordered
        editable={{
          // form,
          editableKeys,
          // onSave: async () => {
          //   await waitTime(2000);
          // },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        // editable={{
        //   type: "multiple",
        //   editableKeys,
        //   // actionRender: (row, config, defaultDoms) => {
        //   //   return [defaultDoms.delete];
        //   // },
        //   // actionRender: (row, config, dom) => [dom.save, dom.cancel],
        //   onValuesChange: (record, recordList) => {
        //     setDataSource(recordList);
        //   },
        //   onChange: setEditableRowKeys,
        // }}
      />
      <Col xs={{ flex: "100%" }}>
        <Row gutter={12} justify="end">
          <Space>
            <Button
              // size="large"
              onClick={() => {
                prev && prev();
              }}
            >
              Буцах
            </Button>
            <Button
              // size="large"
              type="primary"
              onClick={() => form.submit()}
            >
              Үргэлжлүүлэх
            </Button>
          </Space>
        </Row>
      </Col>
    </>
  );
};

export default ProgressStep2;
