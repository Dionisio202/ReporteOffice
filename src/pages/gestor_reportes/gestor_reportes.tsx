import Sidebar from "../../components/sidebar/slidebar";
import ReportTable from "../../components/tables/ReporTable";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const GestorReportes = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleFilterChange = (selectedPeriods: string[]) => {
    setFilters(selectedPeriods);
  };
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col w-full">
      {/* Título mejorado para la página */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={handleHome}
          className="text-blue-600 hover:underline text-sm"
        >
          &lt; Volver
        </button>
        <h1 className="text-3xl font-semibold text-center text-gray-800 my-6 tracking-wide shadow-sm w-full">
          Reportes POA 2025
        </h1>
      </div>

      {/* Barra lateral */}
      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} />

        {/* Contenido principal */}
        <div className="w-3/4 p-4">
          <ReportTable filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default GestorReportes;
