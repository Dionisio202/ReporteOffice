import React, { useState } from "react";
import clsx from "clsx";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import Card from "../../components/cards/card";
import CardContent from "../../components/cards/cardcontent";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/tables/table";
import Button from "../../components/UI/button";
import { CheckCircle, AlertCircle, XCircle, FileText } from "lucide-react";

const COLORS = {
  red: "#d9534f",
  yellow: "#f0ad4e",
  green: "#5cb85c",
  gray: "#d3d3d3",
};

const initialData = [
  { year: "POA 2025", progress: 10, label: "1 actividad", color: COLORS.red, status: "red" },
  { year: "POA 2025", progress: 40, label: "3 actividad", color: COLORS.yellow, status: "yellow" },
  { year: "POA 2024", progress: 100, label: "Completo", color: COLORS.green, status: "green" },
];

const initialTableData = [
  { name: "POA 2026", progress: "-", status: "gray" },
  { name: "POA 2025", progress: "40%", status: "yellow" },
  { name: "POA 2024", progress: "100%", status: "green" },
];

const Principal:React.FC = () => {
  const [data, setData] = useState(initialData);
  const [tableData, setTableData] = useState(initialTableData);

  const handleChangeStatus = (index, newStatus) => {
    const updatedTable = [...tableData];
    updatedTable[index].status = newStatus;
    setTableData(updatedTable);
  };

  const pieData = Object.keys(COLORS).map((status) => ({
    name: status.toUpperCase(),
    value: tableData.filter((d) => d.status === status).length,
    color: COLORS[status],
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-md w-full text-center font-semibold text-lg">
        Dashboard de Documentos
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mt-6">
        <Card className="w-full">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText /> Estado de Documentos
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Avance</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.progress}</TableCell>
                    <TableCell>
                      <span className={clsx("inline-block w-4 h-4 rounded-full", {
                        "bg-gray-500": row.status === "gray",
                        "bg-yellow-500": row.status === "yellow",
                        "bg-green-500": row.status === "green",
                        "bg-red-500": row.status === "red",
                      })}></span>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" onClick={() => handleChangeStatus(index, "green")}>
                          <CheckCircle className="text-green-500" />
                        </Button>
                        <Button variant="outline" onClick={() => handleChangeStatus(index, "yellow")}>
                          <AlertCircle className="text-yellow-500" />
                        </Button>
                        <Button variant="outline" onClick={() => handleChangeStatus(index, "red")}>
                          <XCircle className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Estado General</h2>
            <PieChart width={300} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 w-full max-w-6xl">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Avance de Documentos</h2>
          <LineChart width={600} height={300} data={data} className="w-full">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default Principal;
