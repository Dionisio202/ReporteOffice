import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import { BonitaUtilities } from "../bonita/bonita-utilities";
import { useSaveTempState } from "../hooks/datos_temprales";
import { useBonitaService } from "../../services/bonita.service";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ConfirmationScreen() {
  const { saveTempState } = useSaveTempState(socket);
  const [selectedDocuments, setSelectedDocuments] = useState({
    certificado: false,
  });

  const [usuario, setUsuario] = useState<{
    user_id: string;
    user_name: string;
  } | null>(null);
  const [bonitaData, setBonitaData] = useState<{
    processId: string;
    taskId: string;
    caseId: string;
    processName: string;
  } | null>(null);

  const bonita: BonitaUtilities = new BonitaUtilities();
  const { obtenerUsuarioAutenticado, obtenerDatosBonita, error } =
    useBonitaService();
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

  // 🔹 Guardar estado temporal cada 10 segundos
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

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }
  }, [selectedDocuments, bonitaData, usuario, saveTempState]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Documentos confirmados:", selectedDocuments);
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask(); // Llamada para cambiar la tarea
    // Aquí puedes agregar la lógica para navegar a otra página si es necesario
  };

  return (
    <CardContainer title="Certificado">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <p className="text-lg">Confirmación de entrega de certificado:</p>

        {/* Sección de checkbox */}
        <div className="space-y-3">
          <Checkbox
            label="Entrega de Certificado de Título de Registro"
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
