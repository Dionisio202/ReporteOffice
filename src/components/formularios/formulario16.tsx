import { useState } from "react";

export default function DocumentForm() {
  const [memoCode, setMemoCode] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState({
    solicitud: false,
    comprobantePago: false,
    curPogo: false,
    contratoCesion: false,
    accionPersonal: false,
    copiaCedula: false,
    rucUTA: false,
  });

  const handleMemoCodeChange = (event) => {
    setMemoCode(event.target.value);
  };

  const handleDocumentChange = (event) => {
    const { name, checked } = event.target;
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Código del memorando:", memoCode);
    console.log("Documentos seleccionados:", selectedDocuments);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-4">Formulario de Documentos</h1>

        <div className="flex mb-4">
          <label className="block font-semibold w-full">Código del Memorando:</label>
          <input 
            type="text" 
            className="w-1/2 border p-2 rounded mt-1 ml-4" 
            value={memoCode} 
            onChange={handleMemoCodeChange}
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-lg">Entregables expediente</h2>
          <div className="flex flex-col mt-2">
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="solicitud"
                checked={selectedDocuments.solicitud}
                onChange={handleDocumentChange}
                id="solicitud"
                className="mr-2"
              />
              <label htmlFor="solicitud">Solicitud</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="comprobantePago"
                checked={selectedDocuments.comprobantePago}
                onChange={handleDocumentChange}
                id="comprobantePago"
                className="mr-2"
              />
              <label htmlFor="comprobantePago">Comprobante de pago</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="curPogo"
                checked={selectedDocuments.curPogo}
                onChange={handleDocumentChange}
                id="curPogo"
                className="mr-2"
              />
              <label htmlFor="curPogo">CUR de Pogo</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="contratoCesion"
                checked={selectedDocuments.contratoCesion}
                onChange={handleDocumentChange}
                id="contratoCesion"
                className="mr-2"
              />
              <label htmlFor="contratoCesion">Contrato de cesión de derechos</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="accionPersonal"
                checked={selectedDocuments.accionPersonal}
                onChange={handleDocumentChange}
                id="accionPersonal"
                className="mr-2"
              />
              <label htmlFor="accionPersonal">Acción de personal del Representante legal</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="copiaCedula"
                checked={selectedDocuments.copiaCedula}
                onChange={handleDocumentChange}
                id="copiaCedula"
                className="mr-2"
              />
              <label htmlFor="copiaCedula">Copia de cédula del Representante legal</label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox"
                name="rucUTA"
                checked={selectedDocuments.rucUTA}
                onChange={handleDocumentChange}
                id="rucUTA"
                className="mr-2"
              />
              <label htmlFor="rucUTA">RUC UTA</label>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#931D21] text-white p-2 rounded hover:bg-gray-400">Siguiente</button>
      </form>
    </div>
  );
}
