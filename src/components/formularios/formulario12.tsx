import { useState } from "react";
import DocumentViewer from "../files/DocumentViewer"; // Importa tu componente de visor de documentos
import { BonitaUtilities } from "../bonita/bonita-utilities";

export default function WebPage() {
  const [codigo, setCodigo] = useState(""); // Código del comprobante
  const [codigoGuardado, setCodigoGuardado] = useState<string | null>(null); // Código guardado después de hacer clic en Siguiente
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Estado para el mensaje de alerta
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
  };

  const handleSiguiente = () => {
    if (codigo.trim() !== "") {
      setCodigoGuardado(codigo); // Guarda el código ingresado
      setCodigo(""); // Limpia el input después de guardar el código
      bonita.changeTask();
      setAlertMessage("Avanzando a la siguiente página...");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Comprobante de Pago</h1>

      {/* DocumentViewer para mostrar el documento siempre */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 mb-8">
        {codigoGuardado ? (
          <DocumentViewer
            keyDocument={codigoGuardado} // Pass the saved code as keyDocument
            title="Documento del Comprobante"
            documentName="Formato_datos_informativos_autores.docx" // Nombre predeterminado del documento
          />
        ) : (
          <p className="text-gray-500">
            Por favor, ingrese el código del comprobante para ver el documento.
          </p>
        )}
      </div>

      {/* Input para ingresar el código del comprobante */}
      <div className="w-full max-w-md">
        <label
          htmlFor="codigo"
          className="block text-gray-700 font-medium mb-2"
        >
          Ingrese el código del comprobante
        </label>
        <input
          id="codigo"
          type="text"
          value={codigo}
          onChange={handleCodigoChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el código del comprobante"
        />

        <button
          onClick={handleSiguiente}
          className="w-full bg-[#931D21] text-white py-2 rounded hover:bg-gray-400 transition duration-300"
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

      {/* Mostrar mensaje de alerta */}
      {alertMessage && (
        <div className="mt-4 p-2 bg-yellow-200 text-black rounded">
          {alertMessage}
        </div>
      )}
    </div>
  );
}
