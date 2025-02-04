import { Card } from "../../UI/card";
import Button from "../../UI/button";
import { Send } from "lucide-react";
import { useState } from "react";

export function EmailInput() {
  const [email, setEmail] = useState<string>("");  // Almacena el correo electrónico actual
  const [emailList, setEmailList] = useState<string[]>([]);  // Almacena la lista de correos electrónicos
  const [error, setError] = useState<string>("");  // Para mostrar errores de validación

  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Maneja el cambio de valor en el campo de correo electrónico
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");  // Limpiar el mensaje de error al escribir
  };

  // Añade el correo a la lista de correos electrónicos si es válido
  const handleAddEmail = () => {
    if (emailRegex.test(email)) {
      if (!emailList.includes(email)) {
        setEmailList([...emailList, email]);
        setEmail("");  // Limpiar el campo de entrada después de agregar
      } else {
        setError("Este correo ya ha sido agregado.");
      }
    } else {
      setError("Por favor ingrese un correo válido.");
    }
  };

  // Elimina un correo de la lista
  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove));
  };

  // Lógica para enviar correos electrónicos
  const handleSubmit = () => {
    if (emailList.length > 0) {
      // Implementar la lógica para enviar los correos aquí
      alert(`Correo enviado a: ${emailList.join(", ")}`);
    } else {
      alert("Por favor ingrese al menos un correo válido.");
    }
  };

  return (
    <Card className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="font-bold text-lg text-gray-800 mb-4">Ingreso de Correo Electrónico</h2>

      <div className="mt-5">
        <label htmlFor="email" className="block font-semibold text-sm text-gray-700 mb-2">
          Dirección de Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={handleEmailChange}
          placeholder="Ingrese su correo electrónico"
        />
      </div>

      {/* Mostrar el mensaje de error si hay alguno */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Botón para agregar correo */}
      <Button
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#931D21] text-white rounded-lg p-2 hover:bg-[#7a1619] transition-colors duration-300"
        onClick={handleAddEmail}
        disabled={!email}
      >
        Agregar Correo
      </Button>

      {/* Lista de correos agregados */}
      {emailList.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-sm text-gray-700">Correos agregados:</h3>
          <ul className="list-disc pl-6 mt-2">
            {emailList.map((email, index) => (
              <li key={index} className="flex justify-between items-center text-gray-800 mb-2">
                <span>{email}</span>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón para enviar los correos */}
      <Button
        className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
        onClick={handleSubmit}
        disabled={emailList.length === 0}
      >
        <Send size={16} /> Enviar
      </Button>
    </Card>
  );
}
