import { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox

export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    oficio: false,
  });

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
    <CardContainer title="Oficio Proceso 17">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <p className="text-lg">Confirmación de firma de oficio:</p>

        {/* Sección de checkboxes */}
        <div className="space-y-3">
          <Checkbox
            label="Oficio Firmado?"
            value={selectedDocuments.oficio}
            onChange={(checked) => handleChange("contrato", checked)}
          />
        </div>

        {/* Botón Siguiente */}
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
