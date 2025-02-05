import { useState } from "react";
import DropdownCard from "./components/DropdownCard";
import DocumentViewer from "../files/DocumentViewer"; // Asegúrate de importar DocumentViewer correctamente

// Simulamos documentos precargados estáticamente
const staticDocuments = {
  "Contrato Cesion de Derechos": {
    key: "contract-001",
    title: "Contrato Cesión de Derechos",
    nombre: "Contrato_Cesion_Derechos.pdf",
  },
  "Acta de Participación": {
    key: "act-001",
    title: "Acta de Participación",
    nombre: "Acta_Participacion.pdf",
  },
};

export default function Formulario6() {
  // Estado para almacenar el documento seleccionado
  const [selectedDocument, setSelectedDocument] = useState<{
    key: string;
    title: string;
    nombre: string;
  } | null>(null);

  // Estado para almacenar las opciones seleccionadas (checkbox)
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());

  // Función para seleccionar el documento a visualizar
  const handleViewDocument = (documentType: string) => {
    const document = staticDocuments[documentType];
    setSelectedDocument({
      key: document.key,
      title: document.title,
      nombre: document.nombre,
    });
  };

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (documentType: string) => {
    setSelectedDocs((prev) => {
      const newSelectedDocs = new Set(prev);
      if (newSelectedDocs.has(documentType)) {
        newSelectedDocs.delete(documentType); // Desmarcar el checkbox
      } else {
        newSelectedDocs.add(documentType); // Marcar el checkbox
      }
      return newSelectedDocs;
    });
  };

  // Lista ordenada de documentos (solo .pdf o .docx)
  const documentList = [
    { type: "Contrato Cesion de Derechos", label: "Contrato Cesión de Derechos" },
    { type: "Acta de Participación", label: "Acta de Participación" },
  ];

  return (
    <div className="flex w-full h-screen p-2 bg-gray-200">
      <div className="flex w-full flex-col md:flex-row gap-4 mt-4">
        {/* Menú en la mitad izquierda */}
        <div className="w-full md:w-1/3 space-y-4">
          {/* Menú desplegable de documentos */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Documento</th>
                  <th className="px-4 py-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {documentList.map((doc) => (
                  <tr key={doc.type} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{doc.label}</td>
                    <td className="px-4 py-2 flex items-center space-x-4">
                      {/* Checkbox para seleccionar documento */}
                      <input
                        type="checkbox"
                        checked={selectedDocs.has(doc.type)}
                        onChange={() => handleCheckboxChange(doc.type)}
                        className="h-4 w-4"
                      />
                      <button
                        onClick={() => handleViewDocument(doc.type)}
                        className="bg-[#931D21] text-white py-1 px-4 rounded hover:bg-gray-400 transition duration-300"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Área del documento en la mitad derecha */}
        <div className="w-full md:w-2/3 pl-6 mt-4">
          {selectedDocument ? (
            <DocumentViewer
              keyDocument={selectedDocument.key}
              title={selectedDocument.title}
              documentName={selectedDocument.nombre} // Pasamos el nombre del documento
            />
          ) : (
            <p className="text-center text-gray-500">Selecciona un documento para visualizarlo</p>
          )}
        </div>
      </div>
    </div>
  );
}
