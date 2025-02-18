import { useCallback, useState } from "react";
import { Proceso, Tarea } from "../interfaces/bonita.interface";
import { SERVER_BONITA_URL } from "../config";
export const useBonitaService = () => {
  const [error, setError] = useState<string | null>(null);

  // 🔹 Obtener el ID del proceso
  const obtenerIdProceso = useCallback(async (): Promise<{
    id: string;
    name: string;
  } | null> => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "Iniciando consulta para obtener el ID y el nombre del proceso..."
        );
      }

      const response = await fetch(
        `${SERVER_BONITA_URL}/bonita/API/bpm/process?p=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": "tu_token_aqui",
          },
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const jsonData: Proceso[] = await response.json();
      if (jsonData.length === 0) throw new Error("No se encontraron procesos.");

      return { id: jsonData[0].id, name: jsonData[0].name };
    } catch (error) {
      console.error("Error al obtener el ID y el nombre del proceso:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      return null;
    }
  }, []);

  // 🔹 Obtener tareas asociadas a un proceso
  const obtenerTareas = useCallback(
    async (processId: string): Promise<Tarea[] | null> => {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("Iniciando consulta para obtener las tareas...");
        }

        const response = await fetch(
          `${SERVER_BONITA_URL}/bonita/API/bpm/task?p=0&c=10&f=processId=${processId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Bonita-API-Token": "tu_token_aqui",
            },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);

        return await response.json();
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        return null;
      }
    },
    []
  );

  // 🔹 Obtener la tarea actual del usuario
  const obtenerTareaActual = useCallback(
    async (userId: string): Promise<Tarea | null> => {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("Buscando tarea asignada al usuario...");
        }

        const response = await fetch(
          `${SERVER_BONITA_URL}/bonita/API/bpm/task?p=0&c=1&f=assigned_id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Bonita-API-Token": "tu_token_aqui",
            },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);

        const jsonData: Tarea[] = await response.json();
        return jsonData.length > 0 ? jsonData[0] : null;
      } catch (error) {
        console.error("Error al obtener la tarea actual:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        return null;
      }
    },
    []
  );

  // 🔹 Obtener los detalles de una tarea específica
  const obtenerDetallesTarea = useCallback(async (taskId: string) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("Obteniendo detalles de la tarea...");
      }

      const response = await fetch(
        `${SERVER_BONITA_URL}/bonita/API/bpm/userTask/${taskId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": "tu_token_aqui",
          },
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      return await response.json();
    } catch (error) {
      console.error("Error al obtener los detalles de la tarea:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      return null;
    }
  }, []);

  // 🔹 Obtener los detalles del proceso usando el processId
  const obtenerProceso = useCallback(
    async (processId: string): Promise<Proceso | null> => {
      try {
        const response = await fetch(
          `${SERVER_BONITA_URL}/bonita/API/bpm/process/${processId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Bonita-API-Token": "tu_token_aqui",
            },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);

        return await response.json();
      } catch (error) {
        console.error("Error al obtener el proceso:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        return null;
      }
    },
    []
  );

  // 🔹 Función principal que obtiene todos los datos en un solo flujo
  const obtenerDatosBonita = useCallback(
    async (userId: string) => {
      try {
        // 1️⃣ Obtener la tarea asignada al usuario
        const tarea = await obtenerTareaActual(userId);
        if (!tarea) {
          console.warn("No hay tarea asignada al usuario.");
          return;
        }

        console.log("Tarea actual:", tarea);

        // 2️⃣ Obtener detalles de la tarea (incluye caseId)
        const detallesTarea = await obtenerDetallesTarea(tarea.id);
        if (!detallesTarea) {
          console.warn("No se pudieron obtener los detalles de la tarea.");
          return;
        }

        console.log("Detalles de la tarea:", detallesTarea);

        // 3️⃣ Obtener detalles del proceso usando processDefinitionId
        const proceso = await obtenerProceso(tarea.processId);
        if (!proceso) {
          console.warn("No se pudieron obtener los detalles del proceso.");
          return;
        }

        console.log("Proceso:", proceso);

        // 🔹 Retornar los datos que necesitamos
        return {
          taskId: tarea.id,
          caseId: detallesTarea.caseId,
          processId: tarea.processId,
          processName: proceso.name,
        };
      } catch (error) {
        console.error("Error en obtenerDatosBonita:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    },
    [obtenerTareaActual, obtenerDetallesTarea, obtenerProceso]
  );

  // 🔹 Función para obtener el usuario autenticado
  const obtenerUsuarioAutenticado = useCallback(async (): Promise<{
    user_id: string;
    user_name: string;
  } | null> => {
    try {
      const response = await fetch(
        `${SERVER_BONITA_URL}/bonita/API/system/session/unusedId`,
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

      const data = await response.json();
      return { user_id: data.user_id, user_name: data.user_name };
    } catch (error) {
      console.error("❌ Error al obtener el usuario autenticado:", error);
      setError(
        `Error obteniendo usuario: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
      return null;
    }
  }, []);

  return { obtenerIdProceso, obtenerTareas, obtenerDatosBonita, obtenerUsuarioAutenticado, error };
};
