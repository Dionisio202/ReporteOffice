import React, { useState } from "react";
import { FaEye, FaEdit, FaDownload } from "react-icons/fa"; // Importamos los iconos de Font Awesome

interface ReportTableProps {
  filters: string[]; // Recibimos los filtros como prop
}

const ReportTable: React.FC<ReportTableProps> = ({ filters }) => {
  const reports = [
    { name: "Reporte_Trimestre1", period: "T1" },
    { name: "Reporte_Trimestre2", period: "T2" },
    { name: "Reporte_Trimestre3", period: "T3" },
    { name: "Reporte_Semestre1", period: "S1" },
    { name: "Reporte_Semestre2", period: "S2" },
    { name: "Reporte_Trimestre4", period: "T4" },
    { name: "Reporte_Trimestre5", period: "T5" },
    { name: "Reporte_Trimestre6", period: "T6" },
    { name: "Reporte_Trimestre7", period: "T7" },
    { name: "Reporte_Trimestre8", period: "T8" },
    // Agrega más datos si es necesario
  ];

  const reportsPerPage = 5; // Número de reportes por página
  const [currentPage, setCurrentPage] = useState(1);

  // Filtramos los informes basados en los filtros seleccionados
  const filteredReports = reports.filter((report) =>
    filters.length > 0 ? filters.includes(report.period) : true
  );

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage); // Total de páginas

  const startIndex = (currentPage - 1) * reportsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            <th className="px-6 py-3 text-left text-sm font-medium">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Periodo</th>
            <th className="px-2 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.length > 0 ? (
            currentReports.map((report, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition duration-300"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{report.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{report.period}</td>
                <td className="px-2 py-4">
                  <div className="flex space-x-2 justify-center">
                    <button
                      title="Ver"
                      className="text-blue-500 hover:text-blue-700 flex items-center space-x-2 py-1 px-3 rounded-md hover:bg-blue-50 transition duration-200"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      title="Editar"
                      className="text-yellow-500 hover:text-yellow-700 flex items-center space-x-2 py-1 px-3 rounded-md hover:bg-yellow-50 transition duration-200"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      title="Descargar"
                      className="text-green-500 hover:text-green-700 flex items-center space-x-2 py-1 px-3 rounded-md hover:bg-green-50 transition duration-200"
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500 text-sm">
                No se encontraron informes para los períodos seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginador Mejorado */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"
          >
            <span className="mr-2">Anterior</span>
          </button>

          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-200"
          >
            <span className="ml-2">Siguiente</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
          >
            Primero
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-200"
          >
            Último
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
