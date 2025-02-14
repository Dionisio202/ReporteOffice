import { useState} from "react";
import { io } from "socket.io-client"; // Importar socket.io-client
import UploadFile from "./components/UploadFile";
import Button from "../UI/button.js";
import Title from "./components/TitleProps";
import Modal from "./components/Modal"; 

// Configurar la conexión con WebSocket
const socket = io("http://localhost:3001"); // Asegúrate de que esta URL sea la correcta

export default function UploadForm() {
  const [intellectualPropertyFile, setIntellectualPropertyFile] = useState<File | null>(null);
  const [authorDataFile, setAuthorDataFile] = useState<File | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const modalData = {
    fecha: "2025-01-29",
    lugar: "Ambato",
    destinatario: {
      nombre: "Rubén Eduardo Nogales Portero",
      titulo: "Ingeniero",
      cargo: "Director de Innovación y Emprendimiento",
      institucion: "Universidad Técnica de Ambato",
    },
    solicitante: {
      nombre: "Dr. Iván Guillermo Toapanta Yugcha",
      cargo: "Coordinador Subrogante del proyecto.",
    },
    productos: [
      { id: "1", nombre: "Infografía: Superbacterias En Ríos Y Piscinas" },
      { id: "2", nombre: "Tríptico: Superbacterias En Ríos Y Piscinas" },
    ],
    proyecto: {
      tipo: "Vinculación",
      titulo: "Superbacterias Contaminantes De Agua Dulce",
      resolucion: { numero: "UTA-CONIN-2023-0060-R", fecha: "2023-04-03" },
    },
  };

  const handleFileChange = (file: File | null, fileType: string) => {
    if (file) {
      console.log(`Archivo subido para ${fileType}:`, file);
      fileType === "Solicitud de Registro de Propiedad Intelectual"
        ? setIntellectualPropertyFile(file)
        : setAuthorDataFile(file);
    }
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!intellectualPropertyFile || !authorDataFile) {
      setShowModal(true); // Abre el modal si faltan archivos
      return;
    }

    try {
      alert("Guardando documentos...");
      setIsNextDisabled(false);
      setShowModal(true); // Abre el modal después de guardar

      // Enviar los datos por WebSocket
      socket.emit("saveData", {
        intellectualPropertyFile,
        authorDataFile,
      });
    } catch (error) {
      setShowModal(true);
    }
  };

  const buttonStyles =
    "bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200";

  const closeModal = () => {
    setShowModal(false); // Cierra el modal
  };

  const handleSaveModalData = async (updatedData: any) => {
    try {
      console.log("Datos editados:", updatedData);
      // Enviar datos al backend mediante WebSocket
      socket.emit("saveModalData", updatedData);
      alert("Datos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar datos:", error);
      alert("Hubo un error al guardar los datos.");
    }
  };

  return (
    <div className="flex flex-col items-center p-1 bg-gradient-to-r to-gray-100 min-h-screen">
      <form className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl border border-gray-700">
        <Title
          text="Atención de Solicitud de Registro de Propiedad Intelectual"
          size="2xl"
          className="text-center text-gray-800 mb-3 text-lg"
        />
        <h1 className="text-sm font-bold text-center text-gray-900 mb-9">
          Revisión y Análisis de Requerimiento
        </h1>

        <UploadFile
          id="intellectual-property-file"
          onFileChange={(file) =>
            handleFileChange(file, "Solicitud de Registro de Propiedad Intelectual")
          }
          label="Cargar Solicitud de registro de propiedad intelectual"
        />

        <UploadFile
          id="author-data-file"
          onFileChange={(file) =>
            handleFileChange(file, "Datos informativos de autores")
          }
          label="Cargar Datos informativos de autores"
        />

        <div className="flex justify-center mt-6 space-x-4">
          <Button
            className={buttonStyles}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Siguiente
          </Button>
          <Button
            className={buttonStyles}
            onClick={handleSave}
            disabled={!intellectualPropertyFile || !authorDataFile}
          >
            Guardar
          </Button>
        </div>

        {showModal && (
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            modalData={modalData}
            onSave={handleSaveModalData}
          />
        )}
      </form>
    </div>
  );
}
