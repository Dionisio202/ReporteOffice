import { useState } from "react";
import UploadFile from "./components/UploadFile";
import BonitaUtilities from "../bonita/bonita-utilities.js";
import Button from "../UI/button.js";
export default function UploadForm() {
  const [memoCode, setMemoCode] = useState("");
  const [productos, setProductos] = useState<
    { nombre: string; tipo: string }[]
  >([{ nombre: "", tipo: "" }]);
  const [facultad, setFacultad] = useState("");
  const [comment, setComment] = useState("");
  const [proyectoNombre, setProyectoNombre] = useState("");
  const [proyectoCodigo, setProyectoCodigo] = useState("");
  const [autoridadNombre, setAutoridadNombre] = useState(""); // Estado para el nombre de la autoridad
  const bonita = new BonitaUtilities();

  const handleProductoChange = (
    index: number,
    field: "nombre" | "tipo",
    value: string
  ) => {
    const updatedProductos = [...productos];
    updatedProductos[index][field] = value;
    setProductos(updatedProductos);
  };

  const addProducto = () => {
    setProductos([...productos, { nombre: "", tipo: "" }]);
  };

  const removeProducto = (index: number) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
  };

  const handleFileChange = (file: File) => {
    console.log(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const jsonData = {
      id_registro: memoCode,
      productos: productos,
      autoridad: { nombre: autoridadNombre, facultad: facultad }, // Agregar autoridad
      proyecto: { nombre: proyectoNombre, codigo: proyectoCodigo },
      memorando: comment,
    };

    console.log("Datos enviados:", jsonData);
  };
  const handleNext = () => {
    alert("Avanzando a la siguiente página...");
    bonita.changeTask();
    // Aquí puedes agregar la lógica para navegar a otra página
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

        <UploadFile onFileChange={handleFileChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="memoCode"
              className="block font-semibold text-gray-900"
            >
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
            <label
              htmlFor="facultad"
              className="block font-semibold text-gray-900"
            >
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
            <label
              htmlFor="proyectoNombre"
              className="block font-semibold text-gray-900"
            >
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
            <label
              htmlFor="proyectoCodigo"
              className="block font-semibold text-gray-900"
            >
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
            <label
              htmlFor="autoridadNombre"
              className="block font-semibold text-gray-900"
            >
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

        {/* Parte de productos */}
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
          <button
            type="button"
            className="mt-4 bg-[#931D21] text-white p-2 rounded"
            onClick={addProducto}
          >
            Agregar Producto
          </button>
        </div>

        {/* Comentario */}
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block font-semibold text-gray-900"
          >
            Comentario
          </label>
          <textarea
            id="comment"
            className="w-full border-2 border-gray-500 p-3 rounded-lg mt-2"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-[#931D21] text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  );
}
