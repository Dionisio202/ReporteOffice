import { useState } from "react";

export default function UploadForm() {
  const [selectedType, setSelectedType] = useState("");
  const [memoCode, setMemoCode] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile && uploadedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos enviados:", { memoCode, comment, selectedType, file });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-4">Formulario 3</h1>

        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center mb-4">
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer font-semibold">Elegir un archivo para subir</label>
          {file && <p className="mt-2 text-sm text-blue-600">Archivo seleccionado: {file.name}</p>}
          {preview && <img src={preview} alt="Vista previa" className="mt-2 max-w-full h-32 object-cover" />}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Ingrese el código del memorando generado</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded mt-1" 
            value={memoCode} 
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Comentario</label>
          <textarea 
            className="w-full border p-2 rounded mt-1" 
            rows="3" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Tipo Registro</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tipo Registro</option>
            <option value="obras_literarias">REGISTRO DE OBRA LITERARIAS</option>
            <option value="obras_artisticas">REGISTRO DE OBRAS ARTISTICAS Y MUSICALES</option>
            <option value="obras_audiovisuales">REGISTRO DE OBRAS AUDIOVISUALES</option>
            <option value="registro_software">REGISTRO DE PROGRAMAS DE ORDENADOR (SOFTWARE)</option>
            <option value="programas_radio">REGISTRO DE PUBLICACIONES PERIODICAS Y PROGRAMAS DE RADIO</option>
            <option value="fonogramas">REGISTRO DE FONOGRAMAS</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400">Siguiente</button>
      </form>
    </div>
  );
}