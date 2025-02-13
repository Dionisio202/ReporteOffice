import { useState } from "react";
import DropdownCard from "./components/DropdownCard";
import DocumentViewer from "../files/DocumentViewer";
import { BonitaUtilities } from "../bonita/bonita-utilities";

type StaticDocument = {
  key: string;
  title: string;
  nombre: string;
};

const staticDocuments: Record<string, StaticDocument> = {
  "Contrato Cesion de Derechos": {
    key: "jfda-001",
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
  const [selectedDocument, setSelectedDocument] = useState<StaticDocument | null>(null);
  const bonita: BonitaUtilities = new BonitaUtilities();

  // Modificamos la función para aceptar un string
  const handleViewDocument = (documentType: string) => {
    const document = staticDocuments[documentType];
    if (document) {
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