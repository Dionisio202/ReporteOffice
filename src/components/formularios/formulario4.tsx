import { useState, useEffect } from "react";
import UploadFile from "./components/UploadFile"; // Componente para cargar archivos
import { io } from "socket.io-client";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
import Button from "../UI/button";
// 📌 Conectar WebSocket al puerto 3001
const socket = io("http://localhost:3001");

export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [notificaciones, setNotificaciones] = useState<string[]>([]);
  // @ts-ignore
  const [file, setFile] = useState<File | null>(null); // Agregado estado para el archivo
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
  useEffect(() => {
    // 📢 Escuchar notificaciones en tiempo real
    socket.on("nuevoMemorando", (data) => {
      setNotificaciones((prev) => [
        `Nuevo memorando: ${data.codigo_documento}`,
        ...prev,
      ]);
    });

    return () => {
      socket.off("nuevoMemorando");
    };
  }, []);

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

    const formData = new FormData();
    formData.append("memoCode", memoCode);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/memorando", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  // @ts-ignore
  function handleFileChange(file: File | null, arg1: string): void {
    throw new Error("Function not implemented.");
  }

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
        <h1 className="text- font-extralight text-center mb-8">
          Subir código y documento emitido para certificación.
        </h1>

        <div className="mb-4">
          <label htmlFor="memoCode" className="block font-semibold">
            Ingrese el código del memorando generado para certificación
          </label>
          <input
            id="memoCode" // Agregar id para el label
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        {/* Componente para cargar archivo, pero no lo enviamos */}

        <UploadFile
          id="intellectual-property-file"
          onFileChange={(file) =>
            handleFileChange(
              file,
              "Solicitud de Registro de Propiedad Intelectual"
            )
          }
          label="Subir Certificación Presupuestaria"
        />
        <Button
          className="mt-5 w-full bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
          onClick={handleNext}
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

      {/* 📢 Mostrar notificaciones en tiempo real */}
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
