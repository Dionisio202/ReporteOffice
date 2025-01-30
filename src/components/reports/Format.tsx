import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import logoUTA from "../../assets/img/logoUTA.png";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

const socket = io("http://192.168.220.55:3001");

const Format = () => {
  const [actividad, setActividad] = useState([
    {
      nombre_actividad: "Desarrollo de software académico",
      indicador_actividad: "Número de sistemas implementados",
      proyeccion_actividad: "5",
      t1: "1",
      t2: "2",
      t3: "1",
      t4: "1",
      gastos_t_humanos: "2000",
      gasto_b_capital: "500",
      total_actividad: "2500",
      responsables: ["Ing. Pérez"],
    },
    {
      nombre_actividad: "Capacitación docente en TIC",
      indicador_actividad: "Docentes capacitados",
      proyeccion_actividad: "20",
      t1: "5",
      t2: "5",
      t3: "5",
      t4: "5",
      gastos_t_humanos: "4000",
      gasto_b_capital: "1000",
      total_actividad: "5000",
      responsables: ["Ing. Ramírez"],
    },
  ]);

  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`✅ Conectado al servidor con ID: ${socket.id}`);
      socket.emit("get_poa");
    });

    socket.on("poa_response", (response) => {
      console.log("📡 Respuesta del servidor:", response);
      if (response?.success && Array.isArray(response.data)) {
        setActividad(response.data);
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
  }, []);

  const goBack = () => {
    navigate("/GestorDocumento"); // Usamos navigate para redirigir
  };

  return (
    <div className="relative">
      {/* Botón "Atrás" en la esquina superior izquierda */}
      <button
        onClick={goBack}
        className="absolute top-4 left-4 bg-[#931D21] text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
      >
        Atrás
      </button>

      <div className="max-w-5xl mx-auto p-6 border shadow-lg">
        {/* Encabezado */}
        <div className="max-w-5xl mx-auto p-6 shadow-lg flex items-center justify-between">
          <img src={logoUTA} alt="Logo UTA" className="h-20 sm:h-40" />
          <div className="text-center flex-grow">
            <h1 className="text-xl sm:text-2xl font-bold">UNIVERSIDAD TÉCNICA DE AMBATO</h1>
            <h2 className="text-lg sm:text-xl font-semibold mt-2">DIRECCIÓN DE INNOVACIÓN Y EMPRENDIMIENTO</h2>
            <h3 className="text-md sm:text-lg font-medium mt-2">PLAN OPERATIVO ANUAL 2025</h3>
          </div>
          <img src={logoUTA} alt="Logo UTA" className="h-20 sm:h-40" />
        </div>

        {/* Contenedor con desplazamiento horizontal */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border min-w-[900px]">
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
                    <td className="border px-2 py-1">
                      {Array.isArray(act.responsables) ? act.responsables.join(", ") : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500">⌛ Cargando actividad...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Format;
