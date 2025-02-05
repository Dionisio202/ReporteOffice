import { useState } from "react";
import { EmailInput } from "./components/EmailInput";
import DocumentViewer from "../files/DocumentViewer";// Importa el DocumentViewer

// Simulamos documentos precargados estáticamente (solo .docx)
const staticDocuments = {
  datos: {
    key: "fdti", // Clave única para el documento
    title: "Documento de Datos", // Título del documento
    nombre: "Formato_datos_informativos_autores.docx", // Nombre del documento para la API
  },
  otroDocumento: {
    key: "fsr",
    title: "Documento de registro",
    nombre: "Formato_solicitud_registro.docx", // Nombre del documento para la API
  },
};

export default function WebPage() {
  const [selectedDocument, setSelectedDocument] = useState<{
    key: string;
    title: string;
    nombre: string;
  } | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set()); // Set para almacenar documentos seleccionados
  const [emails, setEmails] = useState<string>(""); // Estado para los correos electrónicos

  // Función para seleccionar el documento a visualizar
  const handleViewDocument = (documentType: keyof typeof staticDocuments) => {
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

  // Lista ordenada de documentos (solo .docx)
  const documentList = [
    { type: "datos", label: "Documento de Datos", icon: "fas fa-file-word text-blue-500" },
    { type: "otroDocumento", label: "Otro Documento", icon: "fas fa-file-word text-blue-500" },
  ];

  return (
    <div className="flex w-full h-screen p-2 bg-gray-200">
      {/* Container for the table, email input, and document viewer */}
      <div className="flex w-full flex-col md:flex-row gap-4 mt-4">
        {/* Left half - Table and Email Input */}
        <div className="w-full md:w-1/3 space-y-4">
          {/* Tabla de documentos */}
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

          {/* Formulario para ingresar correos */}
          <div className="mt-8 md:w-8/4">
            <EmailInput />
          </div>
        </div>

        {/* Right half - Document Viewer */}
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