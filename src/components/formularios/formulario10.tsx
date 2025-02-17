import { useState, ChangeEvent } from "react";
import CardContainer from "./components/CardContainer";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    contrato: false,
    acta: false,
  });

  const bonita: BonitaUtilities = new BonitaUtilities();

  // Especificamos el tipo del evento como ChangeEvent<HTMLInputElement>
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Documentos confirmados:", selectedDocuments);
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <CardContainer title="Contrato de Cesión de Derechos">
      <Title
        text="Firma y Emisión de documento firmado"
        className="text-center text-gray-800 mb-3 text-lg"
      />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="contrato"
              checked={selectedDocuments.contrato}
              onChange={handleChange}
              id="contrato"
              className="mr-2"
            />
            <label htmlFor="contrato" className="font-semibold">
              Contrato de Cesión de Derechos de Patrimoniales
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="acta"
              checked={selectedDocuments.acta}
              onChange={handleChange}
              id="acta"
              className="mr-2"
            />
            <label htmlFor="acta" className="font-semibold">
              Acta de Participación
            </label>
          </div>
        </div>

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
