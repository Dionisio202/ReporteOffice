import { Card } from "../../UI/card";
import Button from "../../UI/button";
import { Send } from "lucide-react";
import { useState } from "react";

export function EmailInput() {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email) {
      // Implementar la lógica para enviar el correo aquí
      alert(`Correo enviado a: ${email}`);
    } else {
      alert("Por favor ingrese un correo válido.");
    }
  };

  return (
    <Card className="w-full md:w-1/2 p-4 bg-white shadow-md">
      <h2 className="font-bold text-lg">Ingreso de Correo Electrónico</h2>

      <div className="mt-4">
        <label htmlFor="email" className="block font-semibold text-sm">
          Dirección de Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          value={email}
          onChange={handleEmailChange}
          placeholder="Ingrese su correo electrónico"
        />
      </div>

      <Button
        className="mt-4 w-full flex items-center gap-2"
        onClick={handleSubmit}
        disabled={!email}
      >
        <Send size={16} /> Enviar
      </Button>
    </Card>
  );
}
