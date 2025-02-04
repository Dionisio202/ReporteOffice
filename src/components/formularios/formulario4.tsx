import { useState } from "react";
import UploadFile from "./components/UploadFile";

export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Manejo del archivo cuando se cambia
  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Datos enviados:", { memoCode, file });
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
          <label className="block font-semibold">
            Ingrese el código del memorando generado
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        <UploadFile onFileChange={handleFileChange} /> {/* Llamamos a handleFileChange aquí */}

        <button
          type="submit"
          className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
