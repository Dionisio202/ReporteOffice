import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from "recharts";

const data = [
  { year: "POA 2025", progress: 10, label: "1 actividad", color: "#d9534f" },
  { year: "POA 2025", progress: 40, label: "3 actividad", color: "#f0ad4e" },
  { year: "POA 2024", progress: 100, label: "Completo", color: "#5cb85c" },
];

const tableData = [
  { name: "POA 2026", progress: "-", status: "gray" },
  { name: "POA 2025", progress: "40%", status: "yellow" },
  { name: "POA 2024", progress: "100%", status: "green" },
];

const Dashboard:React.FC = () => {
  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 rounded-xl mb-6 shadow-md">A Web Page</nav>
      
      {/* Table */}
      <Card className="mb-6">
        <CardContent>
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
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.progress}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block w-4 h-4 rounded-full bg-${row.status}-500`}
                    ></span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Chart */}
      <Card>
        <CardContent>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#8884d8" />
            {data.map((point, index) => (
              <Scatter key={index} data={[point]} fill={point.color} shape="circle" />
            ))}
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
