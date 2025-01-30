
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Definir el tipo de los datos que esperamos recibir
interface Actividad {
  nombre_actividad: string;
  indicador_actividad: string;
  proyeccion_actividad: string;
  t1: string;
  t2: string;
  t3: string;
  t4: string;
  gastos_t_humanos: number;
  gasto_b_capital: number;
  total_actividad: number;
  responsables: string[];
}

interface DataFetcherProps {
  setActividad: React.Dispatch<React.SetStateAction<Actividad[]>>;
}

const socket: Socket = io("http://localhost:3001");

const DataFetcher: React.FC<DataFetcherProps> = ({ setActividad }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`✅ Conectado al servidor con ID: ${socket.id}`);
      socket.emit("get_poa");
    });

    socket.on("poa_response", (response) => {
      console.log("📡 Respuesta del servidor:", response);
      if (response?.success && Array.isArray(response.data)) {
        setActividad(response.data); // Establecer los datos
      } else {
        console.error("❌ Error en la respuesta del servidor:", response);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    return () => {
      socket.off("poa_response");
      socket.disconnect();
    };
  }, [setActividad]);

  return null;
};

export default DataFetcher;
