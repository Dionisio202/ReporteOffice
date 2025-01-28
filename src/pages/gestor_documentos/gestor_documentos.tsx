
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate
import Search from "../../components/search/Search";
import Filters from "../../components/reports/Filters";

import { FaEye, FaEdit, FaDownload } from "react-icons/fa";

const GestorDocumentos = () => {
  const navigate = useNavigate(); // Inicializamos el hook useNavigate

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2025");
  const [documentType, setDocumentType] = useState({ PEDI: false, PAC: false, POA: false, Todos: true });

  const documentos = [
    { nombre: "POA 2025-signed-signed", año: "2025", tipo: "POA" },
    { nombre: "Reporte Anual 2024", año: "2025", tipo: "POA" },
    { nombre: "Informe PEDI 2025", año: "2025", tipo: "PEDI" },
    { nombre: "Reporte PAC 2024", año: "2024", tipo: "PAC" }
  ];

  const handleTypeChange = (type) => {
    setDocumentType((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredDocs = documentos.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(search.toLowerCase()) &&
      doc.año === year &&
      (documentType["Todos"] || documentType[doc.tipo]) // Si "Todos" está marcado, no se filtra por tipo
  );


  const handleEdit = () => {
    navigate("/ReporteEditor");
  };
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={handleHome}
          className="bg-[#931D21] text-white rounded-lg shadow-md overflow-x-auto mb-6"
        >
          &lt; Volver
        </button>
        <h1 className="text-3xl font-semibold text-center text-gray-800 my-6 tracking-wide shadow-sm w-full">
          DOCUMENTOS DINNOVA
        </h1>
      </div>

      {/* Filtros y Tabla */}
      <div className="flex space-x-6">
        <div className="w-1/4">
          <Filters documentType={documentType} handleTypeChange={handleTypeChange} />
        </div>
        <div className="w-3/4">
          {/* Busqueda */}
          <div className="mb-4">
            <Search search={search} setSearch={setSearch} year={year} setYear={setYear} />
          </div>

          {/* Tabla de Documentos */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-6">
            <table className="w-full table-auto border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#931D21] text-white text-sm font-semibold">
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Año</th>
                  <th className="py-3 px-6 text-left">Tipo</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
                    >
                      <td className="py-3 px-6 text-left">{doc.nombre}</td>
                      <td className="py-3 px-6 text-left">{doc.año}</td>
                      <td className="py-3 px-6 text-left">{doc.tipo}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center space-x-3">
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
                    <td
                      className="py-3 px-6 text-center text-gray-500"
                      colSpan={4}
                    >
                      No se encontraron documentos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestorDocumentos;