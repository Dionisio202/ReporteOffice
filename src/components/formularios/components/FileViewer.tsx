import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";

// Configurar el worker de pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [docContent, setDocContent] = useState<string>("");
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      if (uploadedFile.name.endsWith(".docx")) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onload = async (e) => {
          if (e.target?.result) {
            const result = await mammoth.convertToHtml({ arrayBuffer: e.target.result as ArrayBuffer });
            setDocContent(result.value);
          }
        };
      } else if (uploadedFile.name.endsWith(".pdf")) {
        setDocContent(""); // Limpiar contenido DOCX si se carga un PDF
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages); // Al cargar el documento, obtener el número de páginas
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {/* Input de archivo estilizado */}
      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
        Seleccionar Archivo
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Área de visualización */}
      <div className="w-full max-w-4xl h-[50vh] mt-6 overflow-auto bg-white border rounded-lg shadow-md p-4">
        {file && file.name.endsWith(".pdf") && (
          <Document file={URL.createObjectURL(file)} onLoadSuccess={onDocumentLoadSuccess}>
            {/* Puedes agregar lógica para mostrar más de una página si es necesario */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
            ))}
          </Document>
        )}

        {file && file.name.endsWith(".docx") && (
          <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: docContent }} />
        )}

        {!file && <p className="text-gray-500 text-center">Selecciona un archivo PDF o DOCX para visualizar.</p>}
      </div>
    </div>
  );
};

export default FileViewer;
