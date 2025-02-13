import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client"; // Importa Socket
import UploadFile from "./components/UploadFile";
import { BonitaUtilities } from '../bonita/bonita-utilities';
import Button from "../UI/button.js";

// Definir la interfaz para el objeto Producto
interface Producto {
  nombre: string;
  tipo: string;
}

export default function UploadForm() {
  const [socket, setSocket] = useState<Socket | null>(null); // Estado para la conexión WebSocket
  const [memoCode, setMemoCode] = useState(""); // Estado para el código del memorando
  const [productos, setProductos] = useState<Producto[]>([{ nombre: "", tipo: "" }]); // Estado para los productos
  const [facultad, setFacultad] = useState(""); // Estado para la facultad
  const [proyectoNombre, setProyectoNombre] = useState(""); // Estado para el nombre del proyecto
  const [proyectoCodigo, setProyectoCodigo] = useState(""); // Estado para el código del proyecto
  const [autoridadNombre, setAutoridadNombre] = useState(""); // Estado para el nombre de la autoridad
  const bonita = new BonitaUtilities(); // Instancia de BonitaUtilities

  // Conectar al servidor WebSocket cuando el componente se monta
  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Cambia la URL si es necesario
    setSocket(newSocket);

    // Manejar la desconexión al desmontar el componente
    return () => {
      if (newSocket) {
        newSocket.disconnect(); // Llama a disconnect sin retornar nada
      }
    };
  }, []);

  // Función para manejar cambios en los productos
  const handleProductoChange = (
    index: number,
    field: keyof Producto, // Solo permite "nombre" o "tipo"
    value: string
  ) => {
    const updatedProductos = [...productos];
    updatedProductos[index][field] = value;
    setProductos(updatedProductos);
  };

  // Función para agregar un nuevo producto
  const addProducto = () => {
    setProductos([...productos, { nombre: "", tipo: "" }]);
  };

  // Función para eliminar un producto
  const removeProducto = (index: number) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
  };

  // Función para manejar cambios en el archivo subido
  const handleFileChange = (file: File | null) => {
    console.log("Archivo subido:", file);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Asegúrate de que el ID de la autoridad sea un número
    const idAutoridad = 3; // Cambia esto al ID correcto (puedes obtenerlo dinámicamente)

    // Crear el objeto JSON con los datos del formulario
    const jsonData = {
      id_registro: 3, // Cambia esto a un valor dinámico si es necesario
      productos: productos,
      autoridad: idAutoridad, // Envía el ID de la autoridad en lugar del objeto
      proyecto: { nombre: proyectoNombre, codigo: proyectoCodigo },
      memorando: memoCode,
    };

    // Enviar los datos al backend a través de WebSocket
    if (socket) {
      socket.emit("agregar_producto_datos", jsonData, (response: { success: boolean; message: string }) => {
        if (response.success) {
          console.log("Datos enviados correctamente:", response.message);
          alert("Datos enviados correctamente");
        } else {
          console.error("Error al enviar datos:", response.message);
          alert("Error al enviar datos");
        }
      });
    } else {
      console.error("WebSocket no está conectado");
      alert("Error: WebSocket no está conectado");
    }
  };

  // Función para manejar el botón "Siguiente"
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r to-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl border border-gray-700"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Formulario 3
        </h1>

        {/* Componente para subir archivos */}
        <UploadFile onFileChange={handleFileChange} />

        {/* Campos del formulario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="memoCode" className="block font-semibold text-gray-900">
              Ingrese el código del memorando generado
            </label>
            <input
              id="memoCode"
              type="text"
              className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
              value={memoCode}
              onChange={(e) => setMemoCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="facultad" className="block font-semibold text-gray-900">
              Ingrese la Facultad que emite
            </label>
            <input
              id="facultad"
              type="text"
              className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
              value={facultad}
              onChange={(e) => setFacultad(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Campos del Proyecto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="proyectoNombre" className="block font-semibold text-gray-900">
              Nombre del Proyecto
            </label>
            <input
              id="proyectoNombre"
              type="text"
              className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
              value={proyectoNombre}
              onChange={(e) => setProyectoNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="proyectoCodigo" className="block font-semibold text-gray-900">
              Código del Proyecto
            </label>
            <input
              id="proyectoCodigo"
              type="text"
              className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
              value={proyectoCodigo}
              onChange={(e) => setProyectoCodigo(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Campos de Autoridad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="autoridadNombre" className="block font-semibold text-gray-900">
              Nombre de la Autoridad
            </label>
            <input
              id="autoridadNombre"
              type="text"
              className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
              value={autoridadNombre}
              onChange={(e) => setAutoridadNombre(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-900">Productos</label>
          {productos.map((producto, index) => (
            <div key={index} className="space-y-4 mb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-semibold text-gray-900">
                    Producto {index + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
                    value={producto.nombre}
                    onChange={(e) =>
                      handleProductoChange(index, "nombre", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900">
                    Tipo de Producto
                  </label>
                  <select
                    className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
                    value={producto.tipo}
                    onChange={(e) =>
                      handleProductoChange(index, "tipo", e.target.value)
                    }
                    required
                  >
                    <option value="">Seleccione un tipo de producto</option>
                    <option value="1">Registro de Obras Literarias</option>
                    <option value="2">Registro de Obras Audiovisuales</option>
                    <option value="3">Registro de Fonogramas</option>
                    <option value="4">
                      Registro de Obras Artísticas y Musicales
                    </option>
                    <option value="5">Registro de Software</option>
                    <option value="6">
                      Registro de Publicaciones Periódicas y Programas de Radio
                    </option>
                  </select>
                </div>
              </div>
              {/* Botón para eliminar el producto */}
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => removeProducto(index)}
                >
                  Eliminar Producto
                </button>
              </div>
            </div>
          ))}
          {/* Botón para agregar un nuevo producto */}
          <button
            type="button"
            className="mt-4 bg-[#931D21] text-white p-2 rounded"
            onClick={addProducto}
          >
            Agregar Producto
          </button>
        </div>

        {/* Botón para enviar el formulario */}
        <div className="flex justify-center mt-6">
          <Button
            className="bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNext}
          >
            Siguiente
          </Button>
          <Button
            className="bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNext}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}