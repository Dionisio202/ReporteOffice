import { useState } from "react";
import CardContainer from "./components/CardContainer";
import BonitaUtilities from '/src/components/bonita/bonita-utilities.js';

export default function MemoCodeForm() {
  const [memoCode, setMemoCode] = useState("");
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Código de Memorando:");
  };
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask()
    // Aquí puedes agregar la lógica para navegar a otra página
  };
  return (
    <CardContainer title="Ingreso del Código del Memorando">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Input para el código del memorando */}
        <div>
          <label className="block font-semibold">Ingrese el código del memorando generado</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#931D21]"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
          />
        </div>

        {/* Botón Siguiente */}
        <button
          type="submit"
          className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={handleNext}

        >
          Siguiente
        </button>
      </form>
    </CardContainer>
  );
}
