import { useState } from "react";
import io from "socket.io-client";
import Button from "../UI/button";
import Title from "./components/TitleProps";
import Modal from "./components/Modal";
import UploadFile from "./components/UploadFile";

const socket = io("http://localhost:3001"); // Conecta con el backend

interface ModalData {
  success: boolean;
  message: string;
  autores: any[];
  productos: any;
}

export default function UploadForm() {
  const [intellectualPropertyFile, setIntellectualPropertyFile] = useState<File | null>(null);
  const [authorDataFile, setAuthorDataFile] = useState<File | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [authorDataFileBase64, setAuthorDataFileBase64] = useState<string | null>(null);
  const [intellectualPropertyFileBase64, setIntellectualPropertyFileBase64] = useState<string | null>(null);

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
      setModalData({
        success: false,
        message: "Por favor, sube ambos archivos.",
        autores: [],
        productos: {},
      });
      setShowModal(true);
      return;
    }

    try {
      setIsNextDisabled(false);

      // Convertir los archivos a base64
      const intellectualPropertyFileBase64 = await convertFileToBase64(intellectualPropertyFile);
      const authorDataFileBase64 = await convertFileToBase64(authorDataFile);

      // Guardar los archivos base64 en el estado
      setIntellectualPropertyFileBase64(intellectualPropertyFileBase64);
      setAuthorDataFileBase64(authorDataFileBase64);

      // Enviar datos al backend usando socket
      socket.emit(
        "procesar_documentos",
        {
          documento_autores: authorDataFileBase64,
          documento_productos: intellectualPropertyFileBase64,
        },
        (response: any) => {
          if (response.success) {
            console.log("📢 Respuesta del servidor:", response);
            setModalData({
              success: response.success,
              message: response.message,
              autores: JSON.parse(response.autores),
              productos: JSON.parse(response.productos),
            });
          } else {
            console.error("❌ Error en la respuesta del servidor:", response.message);
            setModalData({
              success: response.success,
              message: response.message,
              autores: [],
              productos: {},
            });
          }
          setShowModal(true);
        }
      );
    } catch (error) {
      console.error("Error al guardar los documentos:", error);
      setModalData({
        success: false,
        message: "Error al procesar los documentos. Inténtalo de nuevo.",
        autores: [],
        productos: {},
      });
      setShowModal(true);
    }
  };

  const handleSaveEditedData = async (editedData: any) => {
    try {
      if (!authorDataFileBase64 || !intellectualPropertyFileBase64) {
        throw new Error("No se encontraron los archivos base64.");
      }

      // Enviar los datos editados al backend usando socket
      socket.emit(
        "procesar_documentos", // Mismo endpoint
        {
          documento_autores: authorDataFileBase64,
          documento_productos: intellectualPropertyFileBase64,
          editedData, // Enviar los datos editados
        },
        (response: any) => {
          if (response.success) {
            console.log("📢 Datos editados guardados correctamente:", response);
            alert("Datos editados guardados correctamente.");
          } else {
            console.error("❌ Error al guardar los datos editados:", response.message);
            alert("Error al guardar los datos editados.");
          }
        }
      );
    } catch (error) {
      console.error("Error al guardar los datos editados:", error);
      alert("Error al guardar los datos editados.");
    }
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString().split(",")[1]); // Retorna solo la parte base64 del archivo
        } else {
          reject("No se pudo convertir el archivo.");
        }
      };
      reader.onerror = () => reject("Error al leer el archivo.");
      reader.readAsDataURL(file);
    });
  };

  const closeModal = () => {
    setShowModal(false);
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
          onFileChange={(file) => handleFileChange(file, "Datos informativos de autores")}
          label="Cargar Datos informativos de autores"
        />

        <div className="flex justify-center mt-6 space-x-4">
          <Button
            className="bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Siguiente
          </Button>
          <Button
            className="bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSave}
            disabled={!intellectualPropertyFile || !authorDataFile}
          >
            Guardar
          </Button>
        </div>

        {showModal && modalData && (
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            modalData={modalData}
            onSave={handleSaveEditedData}
          />
        )}
      </form>
    </div>
  );
}