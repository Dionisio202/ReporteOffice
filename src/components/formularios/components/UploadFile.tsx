import React, { useState } from "react";

interface UploadFileProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFileName(selectedFile ? selectedFile.name : "");
    onFileChange(event);
  };

  return (
    <div className="mb-4">
      <label htmlFor="file-upload" className="block font-semibold text-gray-700">
        Subir archivo
      </label>
      <div className="relative mt-2">
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.png"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-500 transition"
        >
          <span className="text-gray-600">{fileName || "Seleccionar archivo..."}</span>
        </label>
      </div>
      {fileName && (
        <p className="mt-2 text-sm text-gray-500">
          Archivo seleccionado: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default UploadFile;
