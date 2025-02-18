import { useState } from "react";
import UploadFile from "./components/UploadFile"; // Componente para cargar archivos
// @ts-ignore
import BonitaUtilities  from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
import Button from "../UI/button";

export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [notificaciones] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!memoCode) {
      alert("Por favor, ingrese el código del memorando.");
      return;
    }

    if (!file) {
      alert("Por favor, cargue un archivo.");
      return;
    }

    // Extraer el nombre del archivo sin la extensión (por ejemplo, "edison202" de "edison202.pdf")
    const fileName = file.name;
    const dotIndex = fileName.lastIndexOf(".");
    const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;

    // Convertir el archivo a base64 usando FileReader
    const fileBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // El resultado viene en el formato: "data:<mime type>;base64,<base64String>"
        // Separamos y tomamos solo la parte base64
        const result = reader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

    // Construir el payload para enviar al back-end
    const payload = {
      // "nombre" se usará para formar el nombre final del documento en el back-end (se agregará la extensión)
      nombre: baseName+"_3-Test001",
      id_registro_per: "3",       // Ajusta según tu lógica
      id_tipo_documento: "3",      // Ajusta según tu lógica
      document: fileBase64,        // Archivo en base64
      memorando: memoCode,         // Valor del código del memorando
    };

    try {
      const response = await fetch("http://formulario.midominio.com:3001/api/get-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <Title
          text="Solicitud de Certificación Presupuestaria"
          size="2xl"
          className="text-center text-gray-800 mb-1 text-lg"
        />
        <h1 className="font-extralight text-center mb-8">
          Subir código y documento emitido para certificación.
        </h1>

        <div className="mb-4">
          <label htmlFor="memoCode" className="block font-semibold">
            Ingrese el código del memorando generado para certificación
          </label>
          <input
            id="memoCode"
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        <UploadFile
          id="document-file"
          onFileChange={(file) => setFile(file)}
          label="Subir Certificación Presupuestaria"
        />

        <Button
          type="submit"
          className="mt-5 w-full bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
        >
          Enviar Datos
        </Button>

        <Button
          className="mt-5 bg-[#931D21] text-white rounded-lg px-6 min-w-full hover:bg-blue-700 transition-colors duration-200"
          onClick={handleNext}
        >
          Siguiente Proceso
        </Button>
      </form>

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Notificaciones</h2>
        <ul className="bg-white p-4 rounded-lg shadow">
          {notificaciones.length === 0 ? (
            <li className="text-gray-500">No hay notificaciones aún.</li>
          ) : (
            notificaciones.map((noti) => (
              <li key={noti} className="text-green-600">
                {noti}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
