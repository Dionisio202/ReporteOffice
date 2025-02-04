import React, { useState } from "react";
import CardContainer from "./components/CardContainer";

export default function DocumentForm() {
  const [memoCode, setMemoCode] = useState<string>("");
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
  });

  const handleMemoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoCode(event.target.value);
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Código del memorando:", memoCode);
    console.log("Checkboxes seleccionados:", checkedState);
  };

  return (
    <CardContainer title="Formulario de Documentos">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Código del Memorando */}
        <div className="flex flex-col">
          <label htmlFor="memoCode" className="block font-semibold">
            Código del Memorando:
          </label>
          <input
            id="memoCode"
            type="text"
            className="border p-2 rounded mt-1"
            value={memoCode}
            onChange={handleMemoCodeChange}
          />
        </div>

        {/* Entregables */}
        <div className="flex flex-col space-y-4">
          {[
            { id: "checkbox1", label: "Solicitud" },
            { id: "checkbox2", label: "Comprobante de Pago" },
            { id: "checkbox3", label: "CUR de Pago" },
            { id: "checkbox4", label: "Contrato de Cesión de Derechos" },
            { id: "checkbox5", label: "Acción de Personal de Representante Legal" },
            { id: "checkbox6", label: "Copia de Cédula de Representante Legal" },
            { id: "checkbox7", label: "RUC UTA" },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <input
                id={id}
                type="checkbox"
                checked={checkedState[id]}
                onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={id} className="cursor-pointer">
                {label}
              </label>
            </div>
          ))}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          Siguiente
        </button>
      </form>
    </CardContainer>
  );
}
