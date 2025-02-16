import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Conecta con el backend

interface TipoProducto {
  id: number;
  nombre: string;
}

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  modalData: any; // Ajusta según tu interfaz
  onSave: (editedData: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  modalData,
  onSave,
}) => {
  const [editedData, setEditedData] = useState(modalData.productos);
  const [tiposProductos, setTiposProductos] = useState<TipoProducto[]>([]); // Estado para los tipos de productos
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Cargar los tipos de productos al abrir el modal
  useEffect(() => {
    if (showModal) {
      setError(null); // Reiniciar el estado de error
      setLoading(true); // Activar el indicador de carga

      // Emitir el evento para obtener los tipos de productos
      socket.emit("obtener_tipos_productos", (response: any) => {
        if (response.success) {
          setTiposProductos(response.tiposProductos); // Guardar los tipos de productos en el estado
        } else {
          console.error(
            "Error al obtener los tipos de productos:",
            response.message
          );
          setError(
            "Error al obtener los tipos de productos. Inténtalo de nuevo."
          ); // Mostrar un mensaje de error
        }
        setLoading(false); // Desactivar el indicador de carga
      });
    }
  }, [showModal]);

  const handleChange = (path: string, value: string) => {
    const keys = path.split(".");
    const updatedData = { ...editedData };

    let current: any = updatedData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setEditedData(updatedData);
  };

  const handleSave = () => {
    onSave(editedData);
    closeModal();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-amber-50 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {modalData.success && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Registro de Propiedad Intelectual
              </h2>
              <p className="text-base text-center font-medium mb-10">
                Revise que los datos de registro sean correctos y edite en caso
                de incongruencias.
              </p>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                {/* Código de Memorando */}
                <label
                  htmlFor="codigoMemorando"
                  className="block text-xs font-medium text-gray-700"
                >
                  Código de Memorando:
                </label>
                <input
                  id="codigoMemorando"
                  type="text"
                  value={editedData.codigoMemorando}
                  onChange={(e) =>
                    handleChange("codigoMemorando", e.target.value)
                  }
                  className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                />
                <div>
                  <label
                    htmlFor="tipoMemorando"
                    className="block text-xs font-medium text-orange-700"
                  >
                    Tipo de Registro
                  </label>
                  <select
                    id="tipoMemorando"
                    value={editedData.tipoMemorando}
                    onChange={(e) =>
                      handleChange("tipoMemorando", e.target.value)
                    }
                    className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                    disabled={loading}
                  >
                    <option value="">Seleccione una opción</option>
                    {tiposProductos.map((tipo) => (
                      <option key={tipo.id} value={tipo.nombre}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Lugar:
                  </label>
                  <input
                    type="text"
                    value={editedData.lugar}
                    onChange={(e) => handleChange("lugar", e.target.value)}
                    className="mt-1 mb-5 block w-full text-xs p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                  />
                </div>

                {/* Destinatario */}
                <div className="bg-gray-50 rounded-lg">
                  <h4 className="text-xss font-semibold text-orange-700 mb-1">
                    Destinatario
                  </h4>
                  <div className="space-y-1">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Nombre:
                      </label>
                      <input
                        type="text"
                        value={editedData.destinatario.nombre}
                        onChange={(e) =>
                          handleChange("destinatario.nombre", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Título:
                      </label>
                      <input
                        type="text"
                        value={editedData.destinatario.titulo}
                        onChange={(e) =>
                          handleChange("destinatario.titulo", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="text-xs block font-medium text-gray-700">
                        Cargo:
                      </label>
                      <input
                        type="text"
                        value={editedData.destinatario.cargo}
                        onChange={(e) =>
                          handleChange("destinatario.cargo", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Institución:
                      </label>
                      <input
                        type="text"
                        value={editedData.destinatario.institucion}
                        onChange={(e) =>
                          handleChange(
                            "destinatario.institucion",
                            e.target.value
                          )
                        }
                        className="mt-1 mb-5 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                  </div>
                </div>

                {/* Solicitante */}
                <div className="bg-gray-50 rounded-lg">
                  <h4 className="text-xss font-semibold text-orange-700 ">
                    Solicitante:
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Nombre:
                      </label>
                      <input
                        type="text"
                        value={editedData.solicitante.nombre}
                        onChange={(e) =>
                          handleChange("solicitante.nombre", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Cargo:
                      </label>
                      <input
                        type="text"
                        value={editedData.solicitante.cargo}
                        onChange={(e) =>
                          handleChange("solicitante.cargo", e.target.value)
                        }
                        className="mt-1 mb-5 text-xs block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div className="bg-gray-50 rounded-lg">
                  <h4 className="text-xss font-semibold text-orange-700 ">
                    Productos:
                  </h4>
                  {editedData.productos.map((producto, index) => (
                    <div key={index} className="mb-4">
                      <label className="block text-xs font-medium text-gray-700">
                        Nombre del Producto:
                      </label>
                      <input
                        type="text"
                        value={producto.nombre}
                        onChange={(e) =>
                          handleChange(
                            `productos.${index}.nombre`,
                            e.target.value
                          )
                        }
                        className="mt-1 mb-5 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                  ))}
                </div>

                {/* Proyecto */}
                <div className="bg-gray-50 rounded-lg">
                  <h4 className="text-xss font-semibold text-orange-700 ">
                    Proyecto:
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs block  font-medium text-gray-700">
                        Tipo:
                      </label>
                      <input
                        type="text"
                        value={editedData.proyecto.tipo}
                        onChange={(e) =>
                          handleChange("proyecto.tipo", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Título:
                      </label>
                      <input
                        type="text"
                        value={editedData.proyecto.titulo}
                        onChange={(e) =>
                          handleChange("proyecto.titulo", e.target.value)
                        }
                        className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Resolución Número:
                      </label>
                      <input
                        type="text"
                        value={editedData.proyecto.resolucion.numero}
                        onChange={(e) =>
                          handleChange(
                            "proyecto.resolucion.numero",
                            e.target.value
                          )
                        }
                        className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">
                        Resolución Fecha:
                      </label>
                      <input
                        type="text"
                        value={editedData.proyecto.resolucion.fecha}
                        onChange={(e) =>
                          handleChange(
                            "proyecto.resolucion.fecha",
                            e.target.value
                          )
                        }
                        className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end p-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-[#931D21] text-white text-xs px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
