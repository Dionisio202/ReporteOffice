import { useState } from "react";
import DropdownCard from "./components/DropdownCard"; // Componente para el dropdown
import DocumentViewer from "../files/DocumentViewer"; // Componente para visualizar el documento
import Button from "../UI/button"; // Componente botón
// @ts-ignore
import BonitaUtilities  from "../bonita/bonita-utilities";

// Definimos un tipo para nuestros documentos
type StaticDocument = {
  key: string;
  title: string;
  nombre: string;
};
const nombrePlantilla="fsvt-001";
const codigoProceso="test-002";
const staticDocuments: Record<string, StaticDocument> = {
  //valores a enviar 
  "Validación de Transferencias": {
    key: `${nombrePlantilla}-${codigoProceso}`,           
    title: "Validación",
    nombre: `${nombrePlantilla}-${codigoProceso}.docx`,   
  },
};

export default function Formulario6() {
  // Estado para almacenar el documento seleccionado
  const [selectedDocument, setSelectedDocument] = useState<StaticDocument | null>(null);
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleNext = async () => {
    try {
      await bonita.changeTask();
      alert("Avanzando a la siguiente página...");
    } catch (error) {
      console.error("Error al cambiar la tarea:", error);
      alert("Ocurrió un error al intentar avanzar.");
    }
  };

  // Función para seleccionar el documento a visualizar y llamar a la API de verificación
  const handleViewDocument = async (documentType: keyof typeof staticDocuments) => {
    const document = staticDocuments[documentType];
    
    if (documentType === "Validación de Transferencias") {
      try {
        // Llamada a la API usando los valores del documento estático
        const apiUrl = `http://formulario.midominio.com:3001/api/verificar-documento?key=${document.key}&nombre=${nombrePlantilla}.docx&id_registro_per=3&id_tipo_documento=3`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Respuesta de la API:", data);
        // Aquí puedes procesar 'data' para actualizar información del documento si es necesario
      } catch (error) {
        console.error("Error al llamar a la API:", error);
      }
    }
    setSelectedDocument(document);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-200 flex flex-col justify-between">
      {/* Contenedor superior con Dropdown y botón */}
      <div className="flex flex-row items-center gap-4 py-6">
        <DropdownCard
          options={Object.keys(staticDocuments)}
          onSelect={handleViewDocument}
          defaultLabel="Selecciona un documento"
        />
        <Button
          className="w-40 bg-[#931D21] text-white p-2 rounded hover:bg-[#7A171A] transition duration-300"
          onClick={handleNext}
        >
          Siguiente
        </Button>
      </div>

      <div className="flex-grow">
        {selectedDocument ? (
          <DocumentViewer
            keyDocument={selectedDocument.key}
            title={selectedDocument.title}
            documentName={selectedDocument.nombre}
            mode="edit"
            callbackUrl="http://formulario.midominio.com:3001/api/save-document"
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
