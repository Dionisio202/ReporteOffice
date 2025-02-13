import { useState } from "react";
import DocumentViewer from "../files/DocumentViewer"; // Importa tu componente de visor de documentos
import { BonitaUtilities } from "../bonita/bonita-utilities";

export default function WebPage() {
  const [codigo, setCodigo] = useState(""); // Código del comprobante
  const [codigoGuardado, setCodigoGuardado] = useState<string | null>(null); // Código guardado después de hacer clic en Siguiente
  const [documento, setDocumento] = useState<string>("Formato_datos_informativos_autores.docx"); // Documento predeterminado
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
  };

  const handleSiguiente = () => {
    if (codigo.trim() !== "") {
      setCodigoGuardado(codigo); // Guarda el código ingresado
      // Aquí podrías hacer una llamada a la base de datos para actualizar el documento si es necesario
      // Por ejemplo:
      // fetchDocumentoFromDatabase(codigo).then(setDocumento);
      setCodigo(""); // Limpia el input después de guardar el código
      bonita.changeTask()
      alert("Avanzando a la siguiente página...");

    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Comprobante de Pago</h1>

      {/* DocumentViewer para mostrar el documento siempre */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 mb-8">
        <DocumentViewer
          keyDocument={codigoGuardado || "default"} // Cambia según el código guardado
          title="Documento del Comprobante"
          documentName={documento} // Nombre del documento que estás cargando desde la base de datos
        />
      </div>

      {/* Input para ingresar el código del comprobante */}
      <div className="w-full max-w-md">
        <label className="block text-gray-700 font-medium mb-2">
          Ingrese el código del comprobante
        </label>
        <input
          type="text"
          value={codigo}
          onChange={handleCodigoChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el código del comprobante"
        />
        <button
          onClick={handleSiguiente}
          className="w-full bg-[#931D21]  text-white py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Siguiente
        </button>
      </div>

      {/* Mostrar el código guardado solo si existe */}
      {codigoGuardado && (
        <p className="mt-4 text-black-600 font-medium">
          Código guardado: {codigoGuardado}
        </p>
      )}
    </div>
  );
}
