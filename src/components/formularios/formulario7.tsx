import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    contrato: false,
    acta: false,
  });
  const bonita: BonitaUtilities = new BonitaUtilities();

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Efecto para verificar el estado de los checkboxes cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      //Envio de datos al servidor
      socket.emit("documentos", selectedDocuments);
    }, 10000); // 5000 milisegundos = 5 segundos

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [selectedDocuments]); // Dependencia: el estado de los checkboxes

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Documentos confirmados:", selectedDocuments);
  };
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
    // Aquí puedes agregar la lógica para navegar a otra página
  };
  return (
    <CardContainer title="Confirmación de Firma">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Title
          text="Contrato de Cesión de Derechos y Acta de Participación"
          className="text-center text-gray-800 mb-3 text-xs"
        />
        {/* Sección de checkboxes */}
        <div className="space-y-3">
          <Checkbox
            label="Contrato de Cesión de Derechos Patrimoniales"
            value={selectedDocuments.contrato}
            onChange={(checked) => handleChange("contrato", checked)}
          />

          <Checkbox
            label="Acta de Participación"
            value={selectedDocuments.acta}
            onChange={(checked) => handleChange("acta", checked)}
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