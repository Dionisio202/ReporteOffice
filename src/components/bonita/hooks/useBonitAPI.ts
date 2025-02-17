// hooks/useBonitaAPI.ts
import { useState, useCallback } from "react";
import { Proceso, Tarea } from "../../../interfaces/bonita.interface";

const API_URL = "http://localhost:48615/bonita/API/bpm";

export const useBonitaAPI = (token: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async <T>(url: string, options: RequestInit): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "X-Bonita-API-Token": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const obtenerIdProceso = useCallback(async (): Promise<{ id: string; name: string } | null> => {
    const data = await fetchData<Proceso[]>(`${API_URL}/process?p=0`, {
      method: "GET",
    });

    if (!data || data.length === 0) {
      setError("No se encontraron procesos.");
      return null;
    }

    const proceso = data[0];
    return { id: proceso.id, name: proceso.name };
  }, [fetchData]);

  const obtenerTareas = useCallback(async (processId: string): Promise<Tarea[] | null> => {
    const data = await fetchData<Tarea[]>(`${API_URL}/task?p=0&c=10&f=processId=${processId}`, {
      method: "GET",
    });

    if (!data) {
      setError("No se encontraron tareas.");
      return null;
    }

    return data;
  }, [fetchData]);

  return { obtenerIdProceso, obtenerTareas, loading, error };
};