import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useAxios } from "../../../../hooks";
import { REPORT_DATA } from "../../../../utils/operation";
import { isEmpty } from "lodash";

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

const ReportStep2View = ({ report }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    useAxios(REPORT_DATA.format(report?.projectId, 150)).then((res) => {
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
        };

        if (["a", "b", "c", "d"].includes(record.group)) obj.colSpan = 0;

        return obj;
      },
    };
  });
  return (
    <div>
      <Table
        size="small"
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: "100vw" }}
        sticky
      />
    </div>
  );
};

export default ReportStep2View;
