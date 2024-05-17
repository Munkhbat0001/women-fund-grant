import React from "react";

const TailwindTable = ({ columns = [], rows = [] }) => {
  // columns = [
  //   {
  //     key: "1",
  //     label: "Product name",
  //     name: "name",
  //     bold: true,
  //   },
  //   {
  //     key: "2",
  //     label: "Color",
  //     name: "color",
  //   },
  //   {
  //     key: "3",
  //     label: "Category",
  //     name: "category",
  //   },
  //   {
  //     key: "4",
  //     label: "Price",
  //     name: "price",
  //   },
  //   {
  //     key: "5",
  //     label: "Action",
  //     name: "action",
  //   },
  // ];
  // rows = [
  //   {
  //     name: "Apple MacBook Pro 17",
  //     color: "Silver",
  //     category: "Laptop",
  //     price: "$2999",
  //     action: "Edit",
  //   },
  //   {
  //     name: "Microsoft Surface Pro",
  //     color: "White",
  //     category: "Laptop PC",
  //     price: "$1999",
  //     action: "Edit",
  //   },
  //   {
  //     name: "Magic Mouse 2",
  //     color: "Black",
  //     category: "Accessories",
  //     price: "$99",
  //     action: "Edit",
  //   },
  //   {
  //     name: "Google Pixel Phone",
  //     color: "Gray",
  //     category: "Phone",
  //     price: "$799",
  //     action: "Edit",
  //   },
  //   {
  //     name: "Apple Watch 5",
  //     color: "Red",
  //     category: "Wearables",
  //     price: "$799",
  //     action: "Edit",
  //   },
  // ];

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
                  const cl = Object.values(classRow).join(" ");
                  console.log("cl: ", cl);
                  return (
                    <td key={col.key} className={`px-6 py-4 ${cl}`}>
                      {row[col.name]}
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
