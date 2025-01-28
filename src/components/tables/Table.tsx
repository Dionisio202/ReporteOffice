import React from "react";
import RowTable from "../tables/RowTable";

const Table: React.FC = () => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Columna 1</th>
          <th className="p-2">Columna 2</th>
          <th className="p-2">Columna 3</th>
        </tr>
      </thead>
      <tbody>
        <RowTable />
        <RowTable />
        <RowTable />
      </tbody>
    </table>
  );
};

export default Table;
