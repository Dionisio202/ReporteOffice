import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import logoUTA from "../../assets/img/logoUTA.png";

const socket = io("http://localhost:3001");

interface Actividad {
  id: number;
  nombre_actividad: string;
  indicador_actividad: string;
  proyeccion_actividad: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  gastos_t_humanos: number;
  gasto_b_capital: number;
  total_actividad: number;
  responsables: string[];
}

// 🔹 Función para obtener actividades desde el servidor
const fetchActivities = (): Promise<Actividad[]> => {
  console.log("📡 Solicitando actividades al servidor...");
  return new Promise((resolve, reject) => {
    socket.emit("get_poa");

    socket.once("poa_response", (response: { success: boolean; data: Actividad[]; message?: string }) => {
      if (response?.success && Array.isArray(response.data)) {
        console.log("📡 Datos recibidos:", response.data);
        resolve(response.data);
      } else {
        console.error("❌ Error en la respuesta del servidor:", response?.message);
        reject(new Error(response?.message || "Error al obtener datos"));
      }
    });
  });
};

const Format: React.FC = () => {
  const [actividad, setActividad] = useState<Actividad[]>([]); // Estado vacío inicialmente

  useEffect(() => {
    // Conectar y solicitar actividades
    socket.on("connect", () => {
      console.log(`✅ Conectado al servidor con ID: ${socket.id}`);
      fetchActivities()
        .then((data) => setActividad(data))
        .catch((error) => console.error(error));
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    // Cleanup: eliminar listeners al desmontar el componente
    return () => {
      socket.off("connect");
      socket.off("poa_response");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 border shadow-lg">
      <div className="max-w-5xl mx-auto p-6 shadow-lg flex items-center justify-between">
        <img src={logoUTA} alt="Logo UTA" className="h-40" />
        <div className="text-center flex-grow">
          <h1 className="text-2xl font-bold">UNIVERSIDAD TÉCNICA DE AMBATO</h1>
          <h2 className="text-xl font-semibold mt-2">DIRECCIÓN DE INNOVACIÓN Y EMPRENDIMIENTO</h2>
          <h3 className="text-lg font-medium mt-2">PLAN OPERATIVO ANUAL 2025</h3>
        </div>
        <img src={logoUTA} alt="Logo UTA" className="h-40" />
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-[#931D21] text-white">
            <th className="border px-2 py-1">Actividad</th>
            <th className="border px-2 py-1">Indicador</th>
            <th className="border px-2 py-1">Línea Base</th>
            <th className="border px-2 py-1">Proyección</th>
            <th className="border px-2 py-1">T1</th>
            <th className="border px-2 py-1">T2</th>
            <th className="border px-2 py-1">T3</th>
            <th className="border px-2 py-1">T4</th>
            <th className="border px-2 py-1">Gasto T. Humanos</th>
            <th className="border px-2 py-1">Gasto B. Capital</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {actividad.length > 0 ? (
            actividad.map((act) => (
              <tr key={act.id} className="text-center">
                <td className="border px-2 py-1">{act.nombre_actividad}</td>
                <td className="border px-2 py-1">{act.indicador_actividad}</td>
                <td className="border px-2 py-1">0.00</td>
                <td className="border px-2 py-1">{act.proyeccion_actividad}</td>
                <td className="border px-2 py-1">{act.t1}</td>
                <td className="border px-2 py-1">{act.t2}</td>
                <td className="border px-2 py-1">{act.t3}</td>
                <td className="border px-2 py-1">{act.t4}</td>
                <td className="border px-2 py-1">${act.gastos_t_humanos}</td>
                <td className="border px-2 py-1">${act.gasto_b_capital}</td>
                <td className="border px-2 py-1">${act.total_actividad}</td>
                <td className="border px-2 py-1">
                  {Array.isArray(act.responsables) ? act.responsables.join(", ") : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-4 text-gray-500">
                ⌛ Cargando actividad...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Format;