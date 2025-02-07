import { useState } from "react";
import DocumentViewer from "../files/DocumentViewer"; // Importa tu componente DocumentViewer
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox";
export default function Formulario14() {
  const [checkedState, setCheckedState] = useState({
    checkbox1: false,
  });

  const handleCheckboxChange = (checkboxName: string, newValue: boolean) => {
    setCheckedState({
      ...checkedState,
      [checkboxName]: newValue,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 w-full">
      {/* CardContainer con la sección de registro */}
      <CardContainer title="Recepción">
        <div className="flex flex-col space-y-4">
          <Checkbox
            label="CUR de Pago Recibido"
            value={checkedState.checkbox1}
            onChange={(newValue) => handleCheckboxChange("checkbox1", newValue)}
          />
        </div>

        {/* Botón Enviar */}
        <div className="mt-6 text-center">
          <button className="bg-[#931D21] hover:bg-[#7A171A] text-white py-3 px-8 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
            Enviar
          </button>
        </div>
      </CardContainer>

      {/* Visor de Documento */}
      <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden mt-6">
        <DocumentViewer
          keyDocument="default"
          title="Documento del Comprobante"
          documentName="Formato_datos_informativos_autores.docx"
        />
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
