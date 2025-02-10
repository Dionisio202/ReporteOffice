import { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import BonitaUtilities from '/src/components/bonita/bonita-utilities.js';

export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    certificado: false,
  });
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask()
    // Aquí puedes agregar la lógica para navegar a otra página
  };

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Documentos confirmados:", selectedDocuments);
  };

  return (
    <CardContainer title="Certificado">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="space-y-3">
          <Checkbox
            label="Entrega de Certidicado de Titulo de Registro"
            value={selectedDocuments.certificado}
            onChange={(checked) => handleChange("certificado", checked)}
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
