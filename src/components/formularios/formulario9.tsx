import React, { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox";
import { BonitaUtilities } from "../bonita/bonita-utilities";

const Formulario9: React.FC = () => {
  const [checkedState, setCheckedState] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const bonita: BonitaUtilities = new BonitaUtilities();
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask()
    // Aquí puedes agregar la lógica para navegar a otra página
  };
  const handleCheckboxChange = (checkboxName: string, newValue: boolean) => {
    setCheckedState({
      ...checkedState,
      [checkboxName]: newValue, // Actualizamos solo el checkbox que cambió
    });
  };

  return (
    <CardContainer title="Pantalla 9">
      {/* Sección de Checkbox */}
      <div className="flex flex-col space-y-4">
        <Checkbox
          label="Firma Contrato de Cesión de Derechos Patrimoniales"
          value={checkedState.checkbox1}
          onChange={(newValue) => handleCheckboxChange("checkbox1", newValue)}
        />

        <Checkbox
          label="Remitido por Quipux a DINNOVA"
          value={checkedState.checkbox2}
          onChange={(newValue) => handleCheckboxChange("checkbox2", newValue)}
        />
      </div>

      {/* Botón Enviar */}
      <div className="mt-6 text-center">
        <button className="bg-[#931D21] hover:bg-[#7A171A] text-white py-3 px-8 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
         onClick={handleNext}
        >
          Enviar
        </button>
      </div>
    </CardContainer>
  );
};

export default Formulario9;
