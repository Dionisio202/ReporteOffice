import { useState } from "react";

interface Destinatario {
  nombre: string;
  titulo: string;
  cargo: string;
  institucion: string;
}

interface Solicitante {
  nombre: string;
  cargo: string;
}

interface Producto {
  nombre: string;
}

interface Proyecto {
  tipo: string;
  titulo: string;
  resolucion: {
    numero: string;
    fecha: string;
  };
}

interface ModalData {
  success: boolean;
  message: string;
  productos: {
    fecha: string;
    lugar: string;
    codigoMemorando: string;
    tipoMemorando: string; // Nuevo campo para el combobox
    destinatario: Destinatario;
    solicitante: Solicitante;
    productos: Producto[];
    proyecto: Proyecto;
  };
}

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  modalData: ModalData;
  onSave: (editedData: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  modalData,
  onSave,
}) => {
  const [editedData, setEditedData] = useState(modalData.productos);

  if (!showModal) return null;

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
              <div className="space-y-1">
                {/* Código de Memorando */}
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Código de Memorando:
                  </label>
                  <input
                    type="text"
                    value={editedData.codigoMemorando}
                    onChange={(e) =>
                      handleChange("codigoMemorando", e.target.value)
                    }
                    className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                  />
                </div>

                {/* Tipo de Memorando (Combobox) */}
                <div>
                  <label className="block text-xs font-medium text-orange-700">
                    Tipo de Registro
                  </label>
                  <select
                    value={editedData.tipoMemorando}
                    onChange={(e) =>
                      handleChange("tipoMemorando", e.target.value)
                    }
                    className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Tipo 1">Registro de Obras Literarias</option>
                    <option value="Tipo 2">
                      Registro de Obras Artisticas y Musicales
                    </option>
                    <option value="Tipo 3">
                      Registro de Obras Audiovisuales
                    </option>
                    <option value="Tipo 4">
                      Registro de Programas de Ordenador
                    </option>
                    <option value="Tipo 5">
                      Registro de Publicaciones Periódicas y Programas de Audio
                    </option>
                    <option value="Tipo 6">Registro de Fonogramas</option>
                  </select>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Fecha:
                  </label>
                  <input
                    type="text"
                    value={editedData.fecha}
                    onChange={(e) => handleChange("fecha", e.target.value)}
                    className="mt-1 text-xs block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#931D21] focus:border-[#931D21]"
                  />
                </div>

                {/* Lugar */}
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
