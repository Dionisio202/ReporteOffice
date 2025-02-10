import { useState, useEffect } from "react";
import UploadFile from "./components/UploadFile"; // Componente para cargar archivos
import { io } from "socket.io-client";
import BonitaUtilities from '/src/components/bonita/bonita-utilities.js';

// 📌 Conectar WebSocket al puerto 3001
const socket = io("http://localhost:3001");

export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notificaciones, setNotificaciones] = useState<string[]>([]);
  const bonita: BonitaUtilities = new BonitaUtilities();

  useEffect(() => {
    // 📢 Escuchar notificaciones en tiempo real
    socket.on("nuevoMemorando", (data) => {
      setNotificaciones((prev) => [`Nuevo memorando: ${data.codigo_documento}`, ...prev]);
    });

    return () => {
      socket.off("nuevoMemorando");
    };
  }, []);
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask()
    // Aquí puedes agregar la lógica para navegar a otra página
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!memoCode) {
      alert("Por favor, ingrese el código del memorando.");
      return;
    }

    try {
      // Solo enviamos el código del memorando al backend, sin archivo
      const response = await fetch("http://localhost:3001/api/memorando", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memoCode }), // Solo enviamos el código, no el archivo
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-4">Formulario de Registro</h1>

        <div className="mb-4">
          <label className="block font-semibold">Ingrese el código del memorando generado</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        <UploadFile onFileChange={setFile} /> {/* Componente para cargar archivo, pero no lo enviamos */}

        <button type="submit" className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400"
         onClick={handleNext}

        >
          Siguiente
        </button>
      </form>

      {/* 📢 Mostrar notificaciones en tiempo real */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Notificaciones</h2>
        <ul className="bg-white p-4 rounded-lg shadow">
          {notificaciones.length === 0 ? (
            <li className="text-gray-500">No hay notificaciones aún.</li>
          ) : (
            notificaciones.map((noti, index) => <li key={index} className="text-green-600">{noti}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}
