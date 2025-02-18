import { useState, useEffect } from "react";
import io from "socket.io-client";
import CardContainer from "./components/CardContainer";
import { EmailInput } from "./components/EmailInput";
import DocumentViewer from "../files/DocumentViewer";
// @ts-ignore
import BonitaUtilities  from "../bonita/bonita-utilities";
import { SERVER_BACK_URL } from "../../config.ts";

type DocumentType = {
  key: string;
  title: string;
  nombre: string;
};

const staticDocuments: Record<string, DocumentType> = {
  datos: {
    key: "Formato_datos_informativos_autores_3-Test001",
    title: "Comprobante de Pago",
    nombre: "Formato_datos_informativos_autores_3-Test001.pdf",
  },
};

const socket = io(SERVER_BACK_URL);

export default function ConfirmationScreen() {
  const urlSave = `${SERVER_BACK_URL}/api/save-document`;
  const [selectedDocument, setSelectedDocument] = useState<DocumentType>(staticDocuments.datos);
  const bonita = new BonitaUtilities();

  useEffect(() => {
    // Emitir el evento para obtener el código de almacenamiento y actualizar la key del documento
    socket.emit("obtener_codigo_almacenamiento", { id_registro: "3", id_tipo_documento: 6 }, (response: any) => {
      if (response.success) {
        console.log("Dato recibido:", response.jsonData);
        setSelectedDocument({
          key: response.jsonData, // Asigna la key recibida
          title: staticDocuments.datos.title, // Mantiene el título original
          nombre: `${response.jsonData}.pdf`, // Forma el nombre concatenando la key con la extensión
        });
      } else {
        console.error("Error:", response.message);
      }
    });

    return () => {
      socket.off("obtener_codigo_almacenamiento");
    };
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <CardContainer title="Certificado">
        <div className="flex flex-col space-y-6 h-full">
          {/* Sección para visualizar el documento usando DocumentViewer */}
          <div className="w-full p-4 border rounded-lg shadow-sm bg-gray-100 text-center">
            <DocumentViewer
              keyDocument={selectedDocument.key}
              title={selectedDocument.title}
              documentName={selectedDocument.nombre}
              mode="view"
              fileType="pdf"
              documentType="pdf"
              callbackUrl={urlSave}
            />
          </div>

          {/* Sección para el EmailInput */}
          <div className="flex-1 w-full h-full">
            <EmailInput />
          </div>

          {/* Botón Siguiente */}
          <button
            type="button"
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
