import { useState } from "react";
import DropdownCard from "./components/DropdownCard"; // Importamos el componente DropdownCard
import DocumentViewer from "../files/DocumentViewer"; // Asegúrate de importar DocumentViewer correctamente
import Button from "../UI/button"; // Importamos el componente Button

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

  // Función para seleccionar el documento a visualizar
  const handleViewDocument = (documentType: keyof typeof staticDocuments) => {
    const document = staticDocuments[documentType];
    setSelectedDocument({
      key: document.key,
      title: document.title,
      nombre: document.nombre,
    });
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-200 flex flex-col justify-between">
      {/* Contenedor del DropdownCard en el centro superior */}
      <div className="flex flex-row items-center gap-4 py-6">
        <DropdownCard
          options={Object.keys(staticDocuments)}
          onSelect={handleViewDocument}
          defaultLabel="Selecciona un documento"
        />
        <Button className="w-40 bg-[#931D21] text-white p-2 rounded hover:bg-[#7A171A] transition duration-300">
          Siguiente
        </Button>
      </div>

      {/* Contenedor del DocumentViewer - Ocupa todo el espacio restante */}
      <div className="flex-grow">
        {selectedDocument ? (
          <DocumentViewer
            keyDocument={selectedDocument.key}
            title={selectedDocument.title}
            documentName={selectedDocument.nombre}
            className="w-full h-full" // Hace que el visor ocupe todo el espacio disponible
          />
        ) : (
          <p className="text-center text-gray-500">
            Selecciona un documento para visualizarlo
          </p>
        )}
      </div>
    </div>
  );
}
