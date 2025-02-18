import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Checkbox from "./components/Checkbox"; // Importamos el componente Checkbox
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
import io from "socket.io-client";
import { useBonitaService } from "../../services/bonita.service";

const socket = io("http://localhost:3001");

export default function ConfirmationScreen() {
  const [selectedDocuments, setSelectedDocuments] = useState({
    contrato: false,
    acta: false,
  });

  const bonita: BonitaUtilities = new BonitaUtilities();
  const { obtenerIdProceso, obtenerTareas, error } = useBonitaService(); // Usa el servicio

  const handleChange = (name: string, checked: boolean) => {
    setSelectedDocuments((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Efecto para obtener el ID del proceso y las tareas (solo una vez)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proceso = await obtenerIdProceso();
        console.log("Proceso obtenido:", proceso);

        if (proceso) {
          const tareas = await obtenerTareas(proceso.id);
          console.log("Tareas obtenidas:", tareas);

          if (tareas && tareas.length > 0) {
            // Enviar los datos al servidor a través del socket
            socket.emit("guardar_estado_temporal", {
              id_registro: proceso.id, // Usar el ID del proceso
              id_tarea: tareas[0].caseId, // Usar el ID de la primera tarea
              jsonData: JSON.stringify(selectedDocuments), // Enviar el estado de los checkboxes
              id_funcionario: 1, // Reemplaza con el ID del funcionario real
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener el proceso o las tareas:", error);
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []); // Array de dependencias vacío para ejecutar solo una vez

  // Efecto para verificar el estado de los checkboxes cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      // Enviar datos al servidor
      socket.emit("documentos", selectedDocuments);
    }, 10000); // 10000 milisegundos = 10 segundos

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


