import { useState } from "react";
import { EmailInput } from "./components/EmailInput";
import DocumentViewer from "../files/DocumentViewer"; // Importa el DocumentViewer
import Title from "./components/TitleProps";
// Simulamos documentos precargados estáticamente (solo .docx)
const staticDocuments = {
  datos: {
    key: "jfda-001",
    title: "Formato_datos_informativos_autores",
    nombre: "jfda-001.docx",
  },
  otroDocumento: {
    key: "jfsr-001",
    title: "Formato_solicitud_registro",
    nombre: "jfsr-001.docx",
  },
  //j de de jimmy - 
};

export default function WebPage() {
  const [selectedDocument, setSelectedDocument] = useState<{
    key: string;
    title: string;
    nombre: string;
  } | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  // Seleccionar documento a visualizar
  const handleViewDocument = (documentType: keyof typeof staticDocuments) => {
    const document = staticDocuments[documentType];
    setSelectedDocument({
      key: document.key,
      title: document.title,
      nombre: document.nombre,
    });
  };

  // Marcar o desmarcar documento
  const handleCheckboxChange = (documentType: keyof typeof staticDocuments) => {
    setSelectedDocs((prev) => {
      const newSelectedDocs = new Set(prev);
      if (newSelectedDocs.has(documentType)) {
        newSelectedDocs.delete(documentType);
      } else {
        newSelectedDocs.add(documentType);
      }
      return newSelectedDocs;
    });
  };

  const documentList = [
    { type: "datos", label: "Formato datos informativos de autores" },
    { type: "otroDocumento", label: "Formato Solicitud de registro" },
  ];

  return (
    <div className="flex w-full h-full p-2 bg-gray-200">
      <div className="flex w-full h-full flex-col md:flex-row gap-4 mt-4">
        {/* Panel Izquierdo - Tabla de documentos y correos */}
        <div className="w-full md:w-1/4 space-y-4">
        <Title text="Asesoramiento Registro Propiedad Intelectual" size="2xl" className="text-center text-gray-800 mb-4 text-xl" />
          {/* Tabla de documentos */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-1 text-left text-xs">Documento</th>
                  <th className="px-4 py-1 text-left text-xs">Acción</th>
                </tr>
              </thead>
              <tbody>
                {documentList.map((doc) => (
                  <tr key={doc.type} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-1 text-xs">{doc.label}</td>
                    <td className="px-4 py-1 text-xs flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedDocs.has(doc.type)}
                        onChange={() => handleCheckboxChange(doc.type as keyof typeof staticDocuments)}
                        className="h-4 w-4"
                      />
                      {/* Botón para visualizar */}
                      <button
                        onClick={() => handleViewDocument(doc.type as keyof typeof staticDocuments)}
                        className="bg-[#931D21] text-white py-1 px-4 rounded hover:bg-blue-500 transition duration-300"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Input de correos */}
          <div className="mt-3 md:w-8/4">
            <EmailInput />
          </div>
        </div>

        {/* Panel Derecho - Visor de documentos */}
        <div className="w-full h-full md:w-3/4 pl-6 mt-0.5">
          {selectedDocument ? (
            <DocumentViewer
              keyDocument={selectedDocument.key}
              title={selectedDocument.title}
              documentName={selectedDocument.nombre}
              mode="view"
              callbackUrl="http://formulario.midominio.com:3001/api/save-document"
            />
          ) : (
            <p className="text-center text-gray-500">Selecciona un documento para visualizarlo</p>
          )}
        </div>
      </div>
    </div>
  );
}