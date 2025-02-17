import { useCallback, useState } from "react";
import {Proceso, Tarea} from "../interfaces/bonita.interface";

export const useBonitaService = () => {
  const [error, setError] = useState<string | null>(null);

  const obtenerIdProceso = useCallback(async (): Promise<{ id: string; name: string } | null> => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Iniciando consulta para obtener el ID y el nombre del proceso...");
      }

      const response = await fetch(
        "http://localhost:48615/bonita/API/bpm/process?p=0",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": "tu_token_aqui",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const jsonData: Proceso[] = await response.json();

      if (jsonData.length === 0) {
        throw new Error("No se encontraron procesos.");
      }

      const proceso = jsonData[0];
      return { id: proceso.id, name: proceso.name };
    } catch (error) {
      console.error("Error al obtener el ID y el nombre del proceso:", error);
      setError(`Error al obtener el proceso: ${error instanceof Error ? error.message : "Error desconocido"}`);
      return null;
    }
  }, []);

  const obtenerTareas = useCallback(async (processId: string): Promise<Tarea[] | null> => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Iniciando consulta para obtener las tareas...");
      }

      const response = await fetch(
        `http://localhost:48615/bonita/API/bpm/task?p=0&c=10&f=processId=${processId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": "tu_token_aqui",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const jsonData: Tarea[] = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      setError(`Error al obtener las tareas: ${error instanceof Error ? error.message : "Error desconocido"}`);
      return null;
    }
  }, []);

  return { obtenerIdProceso, obtenerTareas, error };
};