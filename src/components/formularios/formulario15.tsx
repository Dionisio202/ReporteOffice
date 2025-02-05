import { useState } from "react";
import DocumentViewer from "../files/DocumentViewer"; // Importa tu componente DocumentViewer

export default function WebPage() {
  const [checklist, setChecklist] = useState({
    curRecibido: false, // Estado del checkbox
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setChecklist((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 w-full">
      {/* Checkbox */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="checkbox"
          id="curRecibido"
          className="h-5 w-5 mr-2"
          checked={checklist.curRecibido}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="curRecibido" className="text-gray-700 text-lg font-medium">
          CUR de Pago Recibido
        </label>
      </div>

      {/* Contenedor del documento - Ocupa toda la pantalla */}
      <div className="w-full h-[calc(100vh-150px)] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2">Comprobante de Pago</h1>
        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
          <DocumentViewer
            keyDocument="default"
            title="Documento del Comprobante"
            documentName="Formato_datos_informativos_autores.docx"
          />
        </div>
      </div>

      {/* Botón Siguiente */}
      <button
        className="mt-4 bg-[#931D21] text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-gray-400 transition duration-300"
      >
        Siguiente
      </button>
    </div>
  );
}
