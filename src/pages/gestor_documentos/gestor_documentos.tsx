import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import Filters from "../../components/reports/Filters";
import { FaEye, FaEdit, FaDownload } from "react-icons/fa";

const GestorDocumentos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2025");
  const [documentType, setDocumentType] = useState({ PEDI: false, PAC: false, POA: false, Todos: true });
  const [downloadDropdown, setDownloadDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);  // Estado para manejar el modal
  const [currentDoc, setCurrentDoc] = useState(null);  // Estado para almacenar el documento actual

  const documentos = [
    { nombre: "POA 2025-signed-signed", año: "2025", tipo: "POA" },
    { nombre: "Reporte Anual 2024", año: "2025", tipo: "POA" },
    { nombre: "Informe PEDI 2025", año: "2025", tipo: "PEDI" },
    { nombre: "Reporte PAC 2024", año: "2024", tipo: "PAC" },
    { 
      nombre: "Emprendimiento", 
      año: "2025", 
      tipo: "PAC", 
      archivo: "https://docs.google.com/document/d/11eauEQ8WR0RKkG-CHRBUVntn-oOGzTGEwhDr-ztKwKQ/edit?usp=drive_link" 
    }
  ];

  const handleTypeChange = (type) => {
    setDocumentType((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredDocs = documentos.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(search.toLowerCase()) &&
      doc.año === year &&
      (documentType["Todos"] || documentType[doc.tipo])
  );

  const handleDownload = (format, doc) => {
    const filePath = doc.archivo; // Usando el link de Google Drive
    const fileName = `${doc.nombre}.${format}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadDropdown(null);
  };

  const handleEdit = () => {
    navigate("/ReporteEditor");
  };

  const handleHome = () => {
    navigate("/");
  };

  // Maneja la apertura del modal para ver el archivo
  const handleView = (doc) => {
    setCurrentDoc(doc);
    setShowModal(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentDoc(null);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={handleHome}
          className="w-1/4 bg-[#931D21] text-white rounded-lg shadow-md overflow-x-auto mb-6"
        >
          &lt; Atrás
        </button>
        <h1 className="text-3xl font-semibold text-center text-gray-800 my-6 tracking-wide shadow-sm w-full">
          DOCUMENTOS DINNOVA
        </h1>
      </div>

      <div className="flex space-x-6">
        <div className="w-1/4">
          <Filters documentType={documentType} handleTypeChange={handleTypeChange} />
        </div>
        <div className="w-3/4">
          <div className="mb-4">
            <Search search={search} setSearch={setSearch} year={year} setYear={setYear} />
          </div>

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
                    <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition-all">
                      <td className="py-3 px-6 text-left">{doc.nombre}</td>
                      <td className="py-3 px-6 text-left">{doc.año}</td>
                      <td className="py-3 px-6 text-left">{doc.tipo}</td>
                      <td className="py-3 px-6 text-center relative">
                        <div className="flex items-center justify-center space-x-3">
                          <button title="Ver" className="text-blue-500 hover:text-blue-700" onClick={() => handleView(doc)}>
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button title="Editar" onClick={handleEdit} className="text-yellow-500 hover:text-yellow-700">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            title="Descargar"
                            className="text-green-500 hover:text-green-700 relative"
                            onClick={() => setDownloadDropdown(downloadDropdown === index ? null : index)}
                          >
                            <FaDownload className="w-4 h-4" />
                          </button>
                          {downloadDropdown === index && (
                            <div className="absolute mt-1 bg-white border rounded-md shadow-lg right-0">
                              <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => handleDownload("pdf", doc)}>PDF</button>
                              <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => handleDownload("xlsx", doc)}>Excel</button>
                              <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => handleDownload("docx", doc)}>Word</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 px-6 text-center text-gray-500" colSpan={4}>No se encontraron documentos.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para ver el archivo */}
      {showModal && currentDoc && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">Cerrar</button>
            <h2 className="text-xl font-semibold mb-4">Vista Previa del Documento</h2>
            <iframe src={currentDoc.archivo} width="100%" height="600px" title="Document Preview"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorDocumentos;
