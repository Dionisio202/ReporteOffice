import { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox";
import { EmailInput } from "./components/EmailInput";
import FileViewer from "./components/FileViewer";
import { BonitaUtilities } from "../bonita/bonita-utilities";

export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    certificado: false,
  });

  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const bonita: BonitaUtilities = new BonitaUtilities();

  // Simula la selección de un documento cualquiera
  const handleViewDocument = () => {
    const sampleFile = new Blob(["Ejemplo de documento"], {
      type: "application/pdf",
    });
    const file = new File([sampleFile], "documento_ejemplo.pdf", {
      type: "application/pdf",
    });
    setSelectedDocument(file);
  };

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Opcional: Evita el comportamiento por defecto del botón
    console.log("Documentos confirmados:", selectedDocuments);
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <CardContainer title="Certificado">
        {/* Contenedor principal en una sola columna */}
        <div className="flex flex-col space-y-6 h-full">
          {/* 📄 Sección de visualización del documento */}
          <div className="w-full p-4 border rounded-lg shadow-sm bg-gray-100 text-center">
            {selectedDocument ? (
              <FileViewer file={selectedDocument} />
            ) : (
              <div>
                <p className="text-gray-500">
                  Selecciona un documento para visualizarlo
                </p>
                <button
                  onClick={handleViewDocument}
                  className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Ver Documento
                </button>
              </div>
            )}
          </div>

          {/* ✅ Checkbox */}
          <Checkbox
            label="Entrega de Certificado de Título de Registro"
            value={selectedDocuments.certificado}
            onChange={(checked) => handleChange("certificado", checked)}
          />

          <div className="flex-1 w-full h-full">
            <EmailInput />
          </div>

          {/* ▶️ Botón Siguiente */}
          <button
            type="button" // Cambia el tipo a "button"
            className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            onClick={handleSubmit}
          >
            Siguiente
          </button>
        </div>
      </CardContainer>
    </div>
  );
}