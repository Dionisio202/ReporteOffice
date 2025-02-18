import { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import UploadFile from "./components/UploadFile";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    certificado: false,
  });
  const bonita: BonitaUtilities = new BonitaUtilities();
  const handleNext = async () => {
    try {
      await bonita.changeTask();
      alert("Avanzando a la siguiente página...");
    } catch (error) {
      console.error("Error al cambiar la tarea:", error);
      alert("Ocurrió un error al intentar avanzar.");
    }
  };
  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission

    console.log("Documentos confirmados:", selectedDocuments);

    // Handle the next step after form submission
    alert("Avanzando a la siguiente página...");
    const bonita = new BonitaUtilities();
    bonita.changeTask();
    // Aquí puedes agregar la lógica para navegar a otra página o realizar otras acciones
  };

  return (
    <CardContainer title="Certificado/Título de Registro.">
      <Title
        text="Validación de Certificado"
        className="text-center mb-6"
      />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <UploadFile onFileChange={() => {}} id={""} />{" "}
        {/* Placeholder function */}
        <div className="space-y-3">
          <Checkbox
            label="Certificado Válido?"
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
