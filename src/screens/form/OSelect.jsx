import useAxios from "../../hooks/useAxios";
// import useBreakpoint from '@/hooks/useBreakpoint';
import { Select } from "antd";
import { useEffect, useState } from "react";

const OSelect = ({
  options,
  selectAPI,
  selectName,
  selectValue,
  parentId,
  isOnlyParent = false,
  isWithId = false,
  ...others
}) => {
  const isMobile = false;

  const [localOptions, setLocalOptions] = useState([]);

  useEffect(() => {
    if (!isOnlyParent)
      if (!options && !parentId) {
        useAxios(selectAPI).then((res) => {
          setLocalOptions(
            res.map((item) => ({
              label: !isWithId
                ? item[selectName || "name"]
                : item[selectValue || "id"] +
                  " - " +
                  item[selectName || "name"],
              value: item[selectValue || "id"],
            }))
          );
        });
      } else {
        setLocalOptions(options);
      }
  }, [selectAPI]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  useEffect(() => {
    if (!options && parentId) {
      selectAPI += `/${parentId}`;

      useAxios(selectAPI).then((res) => {
        setLocalOptions(
          res.map((item) => ({
            label: !isWithId
              ? item[selectName || "name"]
              : item[selectValue || "id"] + " - " + item[selectName || "name"],
            value: item[selectValue || "id"],
          }))
        );
      });
    } else {
      setLocalOptions(options);
    }
  }, [parentId]);

  const props = { style: { width: isMobile ? "200px" : "150px" }, ...others };

  return (
    <Select
      allowClear={true}
      {...props}
      options={localOptions}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default OSelect;
