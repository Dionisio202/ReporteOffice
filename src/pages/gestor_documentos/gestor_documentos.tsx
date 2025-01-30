import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Search from "../../components/search/Search";
import Filters from "../../components/reports/Filters";
import Format from "../../components/reports/Format";
import { FaEye, FaTrash, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";

const GestorDocumentos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2025");
  const [documentType, setDocumentType] = useState({ POA: false });
  const [showModal, setShowModal] = useState(false);  
  const [currentDoc, setCurrentDoc] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Para mostrar el contenedor de confirmación

  const [documentos, setDocumentos] = useState([
    { nombre: "POA 2025-signed-signed", año: "2025", tipo: "POA" },
    { nombre: "Reporte Anual 2024", año: "2025", tipo: "POA" },
    { nombre: "Informe PEDI 2025", año: "2025", tipo: "PEDI" },
    { nombre: "Reporte PAC 2024", año: "2024", tipo: "POA"},
    {
      nombre: "Emprendimiento",
      año: "2025",
      tipo: "POA"
    }
  ]);

  const resetFilters = () => {
    setSearch("");
    setYear("2025");
    setDocumentType({ POA: false });
  };

  const handleTypeChange = () => {
    setDocumentType((prev) => ({ POA: !prev.POA }));
  };

  const isDisabled = !documentType["POA"];

  const filteredDocs = documentos.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(search.toLowerCase()) &&
      doc.año === year &&
      (documentType["Todos"] || documentType[doc.tipo])
  );

  const handleDownload = () => {
    if (currentDoc) {
      const doc = new jsPDF();
      
      const content = document.getElementById("format-content");
  
      // Verificar si el contenido existe, de lo contrario, se generará un PDF vacío
      if (content) {
        // Usamos el método html() para capturar el contenido visual del modal
        doc.html(content, {
          callback: function (doc) {
            doc.save(`${currentDoc.nombre}.pdf`);
          },
          margin: [10, 10, 10, 10], // Márgenes del documento
          autoPaging: true, // Paginación automática
          x: 10,
          y: 10,
        });
      } else {
        // Si no se encontró el contenido, generamos un PDF vacío con el nombre
        doc.text(`Documento: ${currentDoc.nombre}`, 10, 10); // Esto asegura que se descargue el archivo vacío
        doc.save(`${currentDoc.nombre}.pdf`);
      }
    } else {
      console.log("No se ha seleccionado un documento para descargar.");
    }
  };
  
  
  
  
  

  const handleDelete = () => {
    // Filtramos el documento eliminado de la lista de documentos
    setDocumentos(documentos.filter(d => d.nombre !== currentDoc.nombre));
    setShowDeleteConfirm(false); // Cerramos el contenedor de confirmación
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleReport = () => {
    navigate("/GestorReporte");
  };
  const handleFormat = () => {
    navigate("/Formato");
  };

  const handleView = (doc) => {
  console.log(doc);  // Verifica si el documento es el correcto
  setCurrentDoc(doc);
  setShowModal(true);
};


  const closeModal = () => {
    setShowModal(false);
    setCurrentDoc(null);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center justify-between w-full">
        <button onClick={handleHome} className="w-1/4 bg-[#931D21] text-white rounded-lg shadow-md overflow-x-auto mb-6">
          &lt; Atrás
        </button>
        <h1 className="text-3xl font-semibold text-center text-gray-800 my-6 tracking-wide shadow-sm w-full">
          DOCUMENTOS DINNOVA
        </h1>
      </div>

      <div className="flex space-x-6">
        <div className="w-1/4">
          <Filters documentType={documentType} handleTypeChange={handleTypeChange} disabled={isDisabled} />
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-[#931D21] text-white rounded-md hover:bg-gray-400 font-semibold"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="w-3/4">
          <div className="mb-4">
            <Search search={search} setSearch={setSearch} year={year} setYear={setYear} disabled={isDisabled} />
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
                      <td onClick={handleReport} className="py-3 px-6 text-left">{doc.nombre}</td>
                      <td className="py-3 px-6 text-left">{doc.año}</td>
                      <td className="py-3 px-6 text-left">{doc.tipo}</td>
                      <td className="py-3 px-6 text-center relative">
                        <div className="flex items-center justify-center space-x-3">
                          <button title="Ver" className="text-blue-500 hover:text-blue-700" onClick={handleFormat}>
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button title="Eliminar" onClick={() => { setCurrentDoc(doc); setShowDeleteConfirm(true); }} className="text-red-500 hover:text-red-700">
                            <FaTrash className="w-4 h-4" />
                          </button>
                          <button
                            title="Descargar"
                            className="text-green-500 hover:text-green-700"
                            onClick={handleDownload}
                          >
                            <FaDownload className="w-4 h-4" />
                          </button>
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

      {/* Modal para visualizar el formato */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 max-w-4xl">
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-500 text-lg">
              X
            </button>
            {/* Asignamos el ID para capturar el contenido */}
            <div id="format-content">
              <Format doc={currentDoc} />
            </div>
          </div>
        </div>
      )}

      {/* Contenedor de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <p className="text-gray-800 mb-4">¿Estás seguro de que deseas eliminar el documento: {currentDoc?.nombre}?</p>
            <div className="flex justify-between">
              <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Eliminar</button>
              <button onClick={closeDeleteConfirm} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorDocumentos;
