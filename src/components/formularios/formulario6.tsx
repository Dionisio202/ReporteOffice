import { useState } from "react";
import DropdownCard from "./components/DropdownCard";
import DocumentViewer from "../files/DocumentViewer";
// @ts-ignore
import BonitaUtilities  from "../bonita/bonita-utilities";
import io from "socket.io-client";

const socket = io("http://formulario.midominio.com:3001");
type StaticDocument = {
  key: string;
  title: string;
  nombre: string;
};
const nombrePlantilla1="Contrato_Cesion_Derechos";
const nombrePlantilla2="Acta_Porcentaje_Participacion";
const codigoProceso="3-TT001";
const staticDocuments: Record<string, StaticDocument> = {
  "Contrato Cesion de Derechos": {
    key: `${nombrePlantilla1}_${codigoProceso}`,       
    title: "Contrato Cesión de Derechos",
    nombre: `${nombrePlantilla1}_${codigoProceso}.docx`,
  },
  "Acta de Participación": {
    key: `${nombrePlantilla2}_${codigoProceso}`,       
    title: "Acta de Participación",
    nombre: `${nombrePlantilla2}_${codigoProceso}.docx`,
  },
};

export default function Formulario6() {
  const [selectedDocument, setSelectedDocument] = useState<StaticDocument | null>(null);
  const bonita: BonitaUtilities = new BonitaUtilities();

  // Modificamos la función para aceptar un string
  const handleViewDocument = async (documentType: string) => {
    const document = staticDocuments[documentType];
    if (document) {
      // Emitir evento al servidor para verificar o generar el documento id_registro, id_tarea 
      socket.emit('generar_documentos', { id_registro:"3", id_tarea: "TT001"}, (response:any) => {
        if (response.success) {
          console.log('Respuesta del servidor:', response.message);
          // Puedes manejar la respuesta según tus necesidades
        } else {
          console.error('Error del servidor:', response.message);
        }
      });

      setSelectedDocument(document);
    }
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <div className="w-full h-full p-4 bg-gray-200 flex flex-col justify-between">
      <div className="flex flex-row items-center gap-4 py-6">
        <DropdownCard
          options={Object.keys(staticDocuments)}
          onSelect={handleViewDocument}
          defaultLabel="Selecciona un documento"
        />
        <button
          className="w-40 bg-[#931D21] text-white p-2 rounded hover:bg-[#7A171A] transition duration-300"
          onClick={handleNext}
        >
          Siguiente
        </button>
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