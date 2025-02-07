import { useState } from "react";
import DropdownCard from "./components/DropdownCard"; // Importamos el componente DropdownCard
import DocumentViewer from "../files/DocumentViewer"; // Asegúrate de importar DocumentViewer correctamente

// Simulamos documentos precargados estáticamente
const staticDocuments = {
  "Validación de Transferencias": {
    key: "validacion-001",
    title: "Contrato Cesión de Derechos",
    nombre: "Contrato_Cesion_Derechos.pdf",
  }
};

export default function Formulario6() {
  // Estado para almacenar el documento seleccionado
  const [selectedDocument, setSelectedDocument] = useState<{
    key: string;
    title: string;
    nombre: string;
  } | null>(null);

  // Función para seleccionar el documento a visualizar
  const handleViewDocument = (documentType: keyof typeof staticDocuments) => {
    const document = staticDocuments[documentType]; // Ahora TypeScript sabe que 'documentType' es una clave válida
    setSelectedDocument({
      key: document.key,
      title: document.title,
      nombre: document.nombre,
    });
  };

  return (
    <div className="flex w-full h-screen p-2 bg-gray-200">
      <div className="flex w-full flex-col md:flex-row gap-4 mt-4">
        {/* Menú en la mitad izquierda con DropdownCard */}
        <div className="w-full md:w-1/3 space-y-4">
          <DropdownCard
            options={Object.keys(staticDocuments)} // Usamos las claves de staticDocuments
            onSelect={handleViewDocument} // Actualiza el documento seleccionado
            defaultLabel="Selecciona un documento"
          />
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
