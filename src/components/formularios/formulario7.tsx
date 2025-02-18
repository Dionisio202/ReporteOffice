import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; 
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
import io from "socket.io-client";
import { useBonitaService } from "../../services/bonita.service";
import { useSaveTempState } from "../hooks/datos_temprales";

const socket = io("http://localhost:3001");
export default function ConfirmationScreen() {
  const { saveTempState } = useSaveTempState(socket);
  const [selectedDocuments, setSelectedDocuments] = useState({
    contrato: false,
    acta: false,
  });

  const [usuario, setUsuario] = useState<{ user_id: string; user_name: string } | null>(null);
  const [bonitaData, setBonitaData] = useState<{
    processId: string;
    taskId: string;
    caseId: string;
    processName: string;
  } | null>(null);

  const bonita: BonitaUtilities = new BonitaUtilities();
  const { obtenerUsuarioAutenticado, obtenerDatosBonita, error } = useBonitaService();

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // 🔹 Obtener el usuario autenticado al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await obtenerUsuarioAutenticado();
      if (userData) {
        setUsuario(userData);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Obtener datos de Bonita una vez que se tenga el usuario
  useEffect(() => {
    if (!usuario) return;

    const fetchData = async () => {
      try {
        const data = await obtenerDatosBonita(usuario.user_id);
        if (data) {
          setBonitaData(data);
        }
      } catch (error) {
        console.error("❌ Error obteniendo datos de Bonita:", error);
      }
    };

    fetchData();
  }, [usuario]);

  // 🔹 Obtener el usuario autenticado al montar el componente
  useEffect(() => {
    if (bonitaData && usuario) {
      const interval = setInterval(async () => {
        try {
          await saveTempState({
            id_registro: (bonitaData.processId+"-"+bonitaData.caseId),
            id_tarea: parseInt(bonitaData.taskId),
            jsonData: JSON.stringify(selectedDocuments),
            id_funcionario: parseInt(usuario.user_id)
          });
        } catch (error) {
          console.error("Error al guardar estado temporal:", error);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [selectedDocuments, bonitaData, usuario]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("📌 Documentos confirmados:", selectedDocuments);
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <CardContainer title="Confirmación de Firma">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Title
          text="Contrato de Cesión de Derechos y Acta de Participación"
          className="text-center text-gray-800 mb-3 text-xs"
        />

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

        <button
          type="submit"
          className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={handleNext}
        >
          Siguiente
        </button>

        {usuario && (
          <p className="text-center text-gray-700 mt-2">
            Usuario autenticado: <b>{usuario.user_name}</b> (ID: {usuario.user_id})
          </p>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </CardContainer>
  );
}