import { useState } from "react";
import CardContainer from "./components/CardContainer";
import { BonitaUtilities } from "../bonita/bonita-utilities";
import Title from "./components/TitleProps";
export default function MemoCodeForm() {
  const [memoCode, setMemoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bonita: BonitaUtilities = new BonitaUtilities();

  // Valores que deberías obtener de tu aplicación (pueden venir por props o contexto)
  const id_registro = "3"; // Ejemplo, reemplazar con valor real
  const id_tipo_documento = 3; // Ejemplo, reemplazar con valor real

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://formulario.midominio.com:3001/api/save-memorando?key=${memoCode}&id_tipo_documento=${id_tipo_documento}&id_registro=${id_registro}`);
      
      if (!response.ok) {
        throw new Error('Error al guardar el memorando');
      }
      
      const data = await response.json();
      console.log("Memorando guardado:", data);
      
      handleNext();
    } catch (err) {
      setError("Error al guardar el memorando. Verifica el código e intenta nuevamente.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <CardContainer title="Contrato Cesión de Derechos Patrimoniales">
      <Title
        text="Solicitud para firma de Rector"
        className="text-center text-gray-800 mb-3 text-lg"
      />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="memoCode" className="block font-semibold">
            Ingrese el código del memorando generado para solicitud
          </label>
          <input
            id="memoCode"
            type="text"
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#931D21]"
            value={memoCode}
            onChange={(e) => setMemoCode(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full bg-[#931D21] hover:bg-[#7A171A] text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Siguiente"}
        </button>
      </form>
    </CardContainer>
  );
}