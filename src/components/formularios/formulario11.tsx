import React, { useState } from "react";
import CardContainer from "./components/CardContainer";
import UploadFile from "./components/UploadFile";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Button from "../UI/button";
import Title from "./components/TitleProps";

type Payload = {
  nombre: string;
  id_registro_per: string;
  id_tipo_documento: string;
  document: string;
};

const Formulario11: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (event) => {
        // Envolver el ProgressEvent en un Error
        reject(new Error("Error al leer el archivo: " + event.type));
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, cargue un archivo.");
      return;
    }

    // Validación de tamaño y tipo de archivo
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
      return;
    }
    if (!file.type.startsWith("image/") && !file.type.startsWith("application/pdf")) {
      alert("Solo se permiten archivos de imagen o PDF.");
      return;
    }

    setLoading(true);

    try {
      const fileName = file.name;
      const dotIndex = fileName.lastIndexOf(".");
      const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;

      const fileBase64 = await convertFileToBase64(file);

      const payload: Payload = {
        nombre: baseName + "_3-Test001",
        id_registro_per: "3",
        id_tipo_documento: "3",
        document: fileBase64,
      };

      const response = await fetch("http://formulario.midominio.com:3001/api/get-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Archivo enviado con éxito.");
      } else {
        alert("Hubo un problema al enviar el archivo.");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al enviar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer title="Solicitud de Registro de Propiedad Intelectual">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-1 rounded-lg shadow-lg">
        <Title text="Comprobante de Pago SENADI" size="2xl" className="text-center mb-3" />
       
        <UploadFile
          id="document-file"
          onFileChange={setFile}
          label="Subir comprobante de pago de la solicitud del registro de la propiedad intelectual"
        />

        <Button type="submit" className="mt-5 w-full bg-blue-600 text-white px-6 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Datos"}
        </Button>

        <Button className="mt-5 bg-[#931D21] text-white rounded-lg px-6 min-w-full hover:bg-blue-700" onClick={handleNext}>
          Siguiente Proceso
        </Button>
      </form>
    </CardContainer>
  );
};

export default Formulario11;