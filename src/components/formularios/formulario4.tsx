import { useState } from "react";

export default function UploadForm() {
  const [selectedType, setSelectedType] = useState("");
  const [memoCode, setMemoCode] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    if (uploadedFile && uploadedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
      setLoading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    setLoading(true);

    if (uploadedFile && uploadedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
      setLoading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos enviados:", { memoCode, comment, selectedType, file });
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

        <div 
          className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center mb-4 w-full cursor-pointer bg-gray-50 text-center" 
          onClick={() => document.getElementById('file-upload').click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
          <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V12M17 16V12M7 12h10M7 12l5-5m0 0l5 5M7 12l5-5m0 0l5 5" />
          </svg>
          <p className="font-semibold text-gray-600">Elegir un archivo para subir</p>
          <p className="text-sm text-gray-500">o arrastra y suéltalo aquí</p>
          {file && <p className="mt-2 text-sm text-blue-600">Archivo seleccionado: {file.name}</p>}
          {loading && <p className="text-gray-500 mt-2">Cargando archivo...</p>}
          {preview && <img src={preview} alt="Vista previa" className="mt-2 max-w-full h-32 object-cover border border-gray-300 rounded-lg shadow-sm" />}
        </div>

        <button type="submit" className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400">Siguiente</button>
      </form>
    </div>
  );
}
