import { useState } from "react";

const useList = () => {
  const [formProps, setFormProps] = useState({
    selectedId: null,
    selectedData: {},
    formMode: "create",
  });

  const setMode = (mode, id, data) => {
    setFormProps({
      formMode: mode,
      selectedId: id,
      selectedData: { id, ...data },
    });
  };

  return {
    formProps,
    setMode,
  };
};

export default useList;
