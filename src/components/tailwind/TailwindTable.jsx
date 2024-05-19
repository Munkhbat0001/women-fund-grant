import React from "react";

const TailwindTable = ({ columns = [], rows = [] }) => {
  const classRow = {
    bold: "font-medium",
    textGray900: "text-gray-900",
    whitespace: "whitespace-nowrap",
    darkTextWhite: "dark:text-white",
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => {
              return (
                <th key={col.key} scope="col" className="px-6 py-3">
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.name} className=" border-b dark:border-gray-700">
                {columns.map((col) => {
                  const cls = Object.values(classRow).join(" ");
                  let render;
                  if (col.render) {
                    render = col.render(row[col.name], row);
                  } else {
                    render = row[col.name];
                  }

                  return (
                    <td key={col.key} className={`px-6 py-4 ${cls}`}>
                      {render}
                    </td>
                  );
                })}
                {/* <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TailwindTable;
