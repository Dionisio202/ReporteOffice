import { useState } from "react";

export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    contrato: false,
    acta: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Documentos confirmados:", selectedDocuments);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-4">Confirmación de Firma</h1>
        <p className="text-lg mb-4">Confirmación de firma en los documentos de:</p>

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
            <label htmlFor="contrato" className="font-semibold">Contrato de Cesión de Derechos de Patrimoniales</label>
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
            <label htmlFor="acta" className="font-semibold">Acta de Participación</label>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400">Siguiente</button>
      </form>
    </div>
  );
}
