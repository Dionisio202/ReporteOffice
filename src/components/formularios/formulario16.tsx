import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import { useBonitaService } from "../../services/bonita.service";
import { useSaveTempState } from "../hooks/datos_temprales";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function DocumentForm() {
  const { saveTempState } = useSaveTempState(socket);
  const [memoCode, setMemoCode] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState({
    solicitud: false,
    comprobantePago: false,
    curPago: false,
    contrato: false,
    accionPersonal: false,
    cedulaRepresentante: false,
    rucUTA: false,
  });

  type BonitaData = {
    taskId: string;
    caseId: string;
    processId: string;
    processName: string;
  };

  type Usuario = {
    user_id: string;
    user_name: string;
  };

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [bonitaData, setBonitaData] = useState<BonitaData | null>(null);
  const bonita = new BonitaUtilities();
  const { obtenerUsuarioAutenticado, obtenerDatosBonita, error } =
    useBonitaService();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await obtenerUsuarioAutenticado();
      if (userData) setUsuario(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!usuario) return;
    const fetchData = async () => {
      try {
        const data = await obtenerDatosBonita(usuario.user_id);
        if (data) setBonitaData(data);
      } catch (error) {
        console.error("❌ Error obteniendo datos de Bonita:", error);
      }
    };
    fetchData();
  }, [usuario]);

  useEffect(() => {
    if (bonitaData && usuario) {
      const interval = setInterval(async () => {
        try {
          await saveTempState({
            id_registro: `${bonitaData.processId}-${bonitaData.caseId}`,
            id_tarea: parseInt(bonitaData.taskId),
            jsonData: JSON.stringify(selectedDocuments),
            id_funcionario: parseInt(usuario.user_id),
          });
        } catch (error) {
          console.error("Error al guardar estado temporal:", error);
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedDocuments, bonitaData, usuario]);

  const handleMemoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoCode(event.target.value);
  };

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Código del memorando:", memoCode);
    console.log("Documentos seleccionados:", selectedDocuments);
  };

  const handleNext = async () => {
    try {
      await bonita.changeTask();
      alert("Avanzando a la siguiente página...");
    } catch (error) {
      console.error("Error al cambiar la tarea:", error);
      alert("Ocurrió un error al intentar avanzar.");
    }
  };

  return (
    <CardContainer title="Formulario de Documentos">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
        <div className="space-y-3">
          <Checkbox
            label="Solicitud"
            value={selectedDocuments.solicitud}
            onChange={(checked) => handleChange("solicitud", checked)}
          />
          <Checkbox
            label="Comprobante de Pago"
            value={selectedDocuments.comprobantePago}
            onChange={(checked) => handleChange("comprobantePago", checked)}
          />
          <Checkbox
            label="CUR de Pago"
            value={selectedDocuments.curPago}
            onChange={(checked) => handleChange("curPago", checked)}
          />
          <Checkbox
            label="Contrato de Cesión de Derechos"
            value={selectedDocuments.contrato}
            onChange={(checked) => handleChange("contrato", checked)}
          />
          <Checkbox
            label="Acción de Personal de Representante Legal"
            value={selectedDocuments.accionPersonal}
            onChange={(checked) => handleChange("accionPersonal", checked)}
          />
          <Checkbox
            label="Copia de Cédula de Representante Legal"
            value={selectedDocuments.cedulaRepresentante}
            onChange={(checked) => handleChange("cedulaRepresentante", checked)}
          />
          <Checkbox
            label="RUC UTA"
            value={selectedDocuments.rucUTA}
            onChange={(checked) => handleChange("rucUTA", checked)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={handleNext}
        >
          Siguiente
        </button>
        {usuario && (
          <p className="text-center text-gray-700 mt-2">
            Usuario autenticado: <b>{usuario.user_name}</b> (ID:{" "}
            {usuario.user_id})
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </CardContainer>
  );
}
