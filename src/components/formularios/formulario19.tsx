import { useState } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import UploadFile from "./components/UploadFile";
import { BonitaUtilities } from "../bonita/bonita-utilities";

export default function ConfirmationScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState({
    certificado: false,
  });
  const handleFileChange = (file: File | null) => {
    setFile(file);
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
  const bonita: BonitaUtilities = new BonitaUtilities();
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask()
    // Aquí puedes agregar la lógica para navegar a otra página
  };
  return (
    <CardContainer title="Validacion de Certificado">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <UploadFile onFileChange={handleFileChange} />
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
