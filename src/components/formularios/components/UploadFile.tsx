import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center mb-4 max-w-sm mx-auto">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="hidden" 
        id="file-upload" 
      />
      <label 
        htmlFor="file-upload" 
        className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800"
      >
        Elegir archivo
      </label>
      {file && <p className="mt-2 text-xs text-gray-700">Archivo seleccionado: {file.name}</p>}
      {preview && <img src={preview} alt="Vista previa" className="mt-2 max-w-full h-24 object-cover" />}
    </div>
  );
};

export default FileUpload;
