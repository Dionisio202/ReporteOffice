import { useState } from "react";
import UploadFile from "./components/UploadFile";

export default function UploadForm() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [memoCode, setMemoCode] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Datos enviados:", { memoCode, comment, selectedType, file });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-xl font-bold text-center mb-4">Formulario 3</h1>

        {/* Componente de subida de archivos */}
        <UploadFile onFileChange={handleFileChange} />

        {/* Campo para código del memorando */}
        <div className="mb-4">
          <label htmlFor="memoCode" className="block font-semibold">
            Ingrese el código del memorando generado
          </label>
          <input
            id="memoCode"
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
            required
          />
        </div>

        {/* Campo de comentario */}
        <div className="mb-4">
          <label htmlFor="comment" className="block font-semibold">Comentario</label>
          <textarea
            id="comment"
            className="w-full border p-2 rounded mt-1"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Selector de tipo de registro */}
        <div className="mb-4">
          <label htmlFor="selectedType" className="block font-semibold">Tipo Registro</label>
          <select
            id="selectedType"
            className="w-full border p-2 rounded mt-1"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo de registro</option>
            <option value="obras_literarias">Registro de Obra Literarias</option>
            <option value="obras_artisticas">Registro de Obras Artísticas y Musicales</option>
            <option value="obras_audiovisuales">Registro de Obras Audiovisuales</option>
            <option value="registro_software">Registro de Programas de Ordenador (Software)</option>
            <option value="programas_radio">Registro de Publicaciones Periódicas y Programas de Radio</option>
            <option value="fonogramas">Registro de Fonogramas</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-[#7A171A] transition duration-300"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
