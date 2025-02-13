import { useState, useEffect } from "react";
import UploadFile from "./components/UploadFile"; // Componente para cargar archivos
import { io } from "socket.io-client";
import { BonitaUtilities } from "../bonita/bonita-utilities";

// 📌 Conectar WebSocket al puerto 3001
const socket = io("http://localhost:3001");

export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [notificaciones, setNotificaciones] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null); // Agregado estado para el archivo
  const bonita: BonitaUtilities = new BonitaUtilities();

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

  const handleNext = async () => {
    alert("Avanzando a la siguiente página...");
    try {
      await bonita.changeTask(); // Esperar a que la tarea cambie (si es una operación asíncrona)
    } catch (error) {
      console.error("Error al cambiar de tarea:", error); // Captura errores
    }
    // Aquí puedes agregar la lógica para navegar a otra página
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

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-xl font-bold text-center mb-4">
          Formulario de Registro
        </h1>

        <div className="mb-4">
          <label htmlFor="memoCode" className="block font-semibold">
            Ingrese el código del memorando generado
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
          label="Cargar Solicitud de registro de propiedad intelectual"
        />
        <button
          type="button" // Cambiado a "button" para evitar enviar el formulario
          className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-red-600"
          onClick={handleNext}
        >
          Siguiente
        </button>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
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
