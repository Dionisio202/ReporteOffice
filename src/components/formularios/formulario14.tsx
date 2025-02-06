import { useState } from "react";

export default function WebPage() {
  const [step, setStep] = useState(1);

  const handleSiguiente = () => {
    setStep(2); // Cambia a la siguiente pantalla
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {step === 1 ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">CUR de Pago</h1>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="curRecibido" className="h-4 w-4 mr-2" />
            <label htmlFor="curRecibido" className="text-gray-700">
              CUR de Pago Recibido
            </label>
          </div>
          <button
            onClick={handleSiguiente}
            className="w-full bg-[#931D21]  text-white py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Siguiente
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">Pantalla siguiente aquí...</p>
        </div>
      )}
    </div>
  );
}
