import React, { useEffect, useState } from "react";
import { Pagination, Row } from "antd";
import TailwindTable from "../../components/tailwind/TailwindTable";
import { useAxios } from "../../hooks";

const serverQueryParams = (current, pageSize, search, serverPaging = true) => {
  if (serverPaging === true)
    return (
      `?page=${current}&pageSize=${pageSize}` + (search ? "&" + search : "")
    );
  else return search ? "?" + search : "";
};

const CustomerTable = (
  {
    selectAPI,
    autoload = true,
    serverPaging = true,
    columns = [],
    pageSize = 20,
  },
  ref
) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total: 0,
  });

  const fetch = (pagination) => {
    setLoading(true);
    const { current, pageSize } = pagination;
    const queryParam = serverQueryParams(current, pageSize, "", serverPaging);
    useAxios(selectAPI + queryParam, {}, { showLoader: false })
      .then((res) => {
        if (serverPaging === true) {
          setDataSource(res.list);
          setPagination({
            current: current,
            pageSize: pageSize,
            total: res.rowCount,
          });
        } else {
          setDataSource(res);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(pagination);
  }, []);

  const onChangePagination = (current, pageSize) => {
    const page = { current, pageSize, total: pagination.total };
    setPagination((prev) => {
      return {
        ...prev,
        ...page,
      };
    });

    fetch(page);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <TailwindTable columns={columns} rows={dataSource} />
      </div>
      <div className=" p-4">
        <Row justify="end">
          <Pagination
            size="small"
            defaultCurrent={1}
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={onChangePagination}
            showTotal={(total) => `Нийт ${total}`}
            pageSizeOptions={[10, 20, 30, 40]}
          />
        </Row>
      </div>
    </>
  );
};

export default CustomerTable;
