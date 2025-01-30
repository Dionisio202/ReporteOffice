import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoUTA from "../../assets/img/logoUTA.png";
import DataFetcher from "./DataFetcher";

// Definir el tipo de los datos
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

const Format: React.FC = () => {
  const [actividad, setActividad] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/GestorDocumento");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Agregar encabezado con la información de la universidad
    doc.setFontSize(14);
doc.text("UNIVERSIDAD TÉCNICA DE AMBATO", 105, 20, { align: "center" });
doc.setFontSize(12);
doc.text("DIRECCIÓN DE INNOVACIÓN Y EMPRENDIMIENTO", 105, 25, { align: "center" });
doc.text("PLAN OPERATIVO ANUAL 2025", 105, 30, { align: "center" });

    // Agregar el logo de la universidad en la parte superior izquierda y derecha
    doc.addImage(logoUTA, "PNG", 10, 5, 40, 40); // Logo izquierdo
    doc.addImage(logoUTA, "PNG", 160, 5, 40, 40); // Logo derecho
  
    
    // Títulos de la tabla
    const tableColumn = [
      "Actividad",
      "Indicador",
      "Línea Base",
      "Proyección",
      "T1",
      "T2",
      "T3",
      "T4",
      "Gasto T. Humanos",
      "Gasto B. Capital",
      "Total",
      "Responsable"
    ];
  
    // Filas de la tabla
    const tableRows = actividad.map((act) => [
      act.nombre_actividad,
      act.indicador_actividad,
      "0.00",
      act.proyeccion_actividad,
      act.t1,
      act.t2,
      act.t3,
      act.t4,
      `$${act.gastos_t_humanos}`,
      `$${act.gasto_b_capital}`,
      `$${act.total_actividad}`,
      act.responsables.join(", ")
    ]);
  
    // Agregar la tabla al PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40, // Ajusta la posición de inicio de la tabla
      headStyles: {
        fillColor: [147, 29, 33], // Color de fondo con el valor RGB del rojo #931D21
        textColor: [255, 255, 255], // Texto en blanco para los encabezados
        
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      }
    });
  
    // Descargar el PDF
    doc.save("plan_operativo_anual.pdf");
  };
  
  return (
    <div className="relative">
      <button
        onClick={goBack}
        className="absolute top-4 left-4 bg-[#931D21] text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
      >
        Atrás
      </button>
      
      
      
      <div className="max-w-5xl mx-auto p-6 border shadow-lg">
        <div className="max-w-5xl mx-auto p-6 shadow-lg flex items-center justify-between">
          <img src={logoUTA} alt="Logo UTA" className="h-20 sm:h-40" />
          <div className="text-center flex-grow">
            <h1 className="text-xl sm:text-2xl font-bold">UNIVERSIDAD TÉCNICA DE AMBATO</h1>
            <h2 className="text-lg sm:text-xl font-semibold mt-2">DIRECCIÓN DE INNOVACIÓN Y EMPRENDIMIENTO</h2>
            <h3 className="text-md sm:text-lg font-medium mt-2">PLAN OPERATIVO ANUAL 2025</h3>
          </div>
          <img src={logoUTA} alt="Logo UTA" className="h-20 sm:h-40" />
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full border min-w-[1200px]">
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
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-4 text-gray-500">⌛ Cargando actividad...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={12} className="text-center py-4 text-red-500">{error}</td>
                </tr>
              ) : actividad.length > 0 ? (
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
                <tr>
                  <td colSpan={12} className="text-center py-4 text-gray-500">No hay actividades disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DataFetcher setActividad={setActividad} setLoading={setLoading} setError={setError} />
      <button
        onClick={downloadPDF}
        className="absolute  h-10 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-800"
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default Format;