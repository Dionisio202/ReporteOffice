import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import logoUTA from "../../assets/img/logoUTA.png"; 

const socket = io("http://localhost:3001");

const Format = () => {
  const [actividad, setActividad] = useState([]); // Cambio de null a [] para evitar errores

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`✅ Conectado al servidor con ID: ${socket.id}`);
      socket.emit("get_poa");
    });

    // Escuchar la respuesta del servidor
    socket.on("poa_response", (response) => {
      if (response?.success) {
        console.log("📡 Datos recibidos:", response.data);
        setActividad(response.data);
      } else {
        console.error("❌ Error al obtener actividad:", response?.message);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err);
    });

    return () => {
      socket.disconnect(); // Desconectar al desmontar el componente
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 border shadow-lg">
       <div className="max-w-5xl mx-auto p-6  shadow-lg flex items-center justify-between">
  <img 
    src={logoUTA}
    alt="Logo UTA"
    className="h-40"
  />
  <div className="text-center flex-grow">
    <h1 className="text-2xl font-bold">UNIVERSIDAD TÉCNICA DE AMBATO</h1>
    <h2 className="text-xl font-semibold mt-2">DIRECCIÓN DE INNOVACIÓN Y EMPRENDIMIENTO</h2>
    <h3 className="text-lg font-medium mt-2">PLAN OPERATIVO ANUAL 2025</h3>
  </div>
  <img 
    src={logoUTA}
    alt="Logo UTA"
    className="h-40"
  />
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
            actividad.map((act, index) => (
              <tr key={index} className="text-center">
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
                <td className="border px-2 py-1">{act.responsables.join(", ")}</td>
              </tr>
            ))
          ) : (
            <tr>a
              <td colSpan="12" className="text-center py-4 text-gray-500">⌛ Cargando actividad...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Format;
