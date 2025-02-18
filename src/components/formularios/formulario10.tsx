import { useState, useEffect, ChangeEvent } from "react";
import CardContainer from "./components/CardContainer";
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

  // 🔹 Manejo de cambios en los checkboxes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
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

  // 🔹 Guardar estado temporal cada 10 segundos si hay datos
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("📌 Documentos confirmados:", selectedDocuments);
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
