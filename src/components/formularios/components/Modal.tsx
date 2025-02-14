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
  onSave: (editedData: any) => void; // Función para enviar los datos editados
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, modalData, onSave }) => {
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
    onSave(editedData); // Enviar los datos editados al componente padre
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">
          {modalData.success ? "Éxito" : "Error"}
        </h2>
        <p className="mb-4">{modalData.message}</p>

        {modalData.success && (
          <>
            <h3 className="font-bold text-lg mb-2">Editar Productos:</h3>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <label className="block font-semibold">Fecha:</label>
                <input
                  type="text"
                  value={editedData.fecha}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="border p-4 rounded-lg">
                <label className="block font-semibold">Lugar:</label>
                <input
                  type="text"
                  value={editedData.lugar}
                  onChange={(e) => handleChange("lugar", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold">Destinatario:</h4>
                <label className="block">Nombre:</label>
                <input
                  type="text"
                  value={editedData.destinatario.nombre}
                  onChange={(e) => handleChange("destinatario.nombre", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Título:</label>
                <input
                  type="text"
                  value={editedData.destinatario.titulo}
                  onChange={(e) => handleChange("destinatario.titulo", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Cargo:</label>
                <input
                  type="text"
                  value={editedData.destinatario.cargo}
                  onChange={(e) => handleChange("destinatario.cargo", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Institución:</label>
                <input
                  type="text"
                  value={editedData.destinatario.institucion}
                  onChange={(e) => handleChange("destinatario.institucion", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold">Solicitante:</h4>
                <label className="block">Nombre:</label>
                <input
                  type="text"
                  value={editedData.solicitante.nombre}
                  onChange={(e) => handleChange("solicitante.nombre", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Cargo:</label>
                <input
                  type="text"
                  value={editedData.solicitante.cargo}
                  onChange={(e) => handleChange("solicitante.cargo", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold">Productos:</h4>
                {editedData.productos.map((producto, index) => (
                  <div key={index} className="mb-4">
                    <label className="block">Nombre del Producto:</label>
                    <input
                      type="text"
                      value={producto.nombre}
                      onChange={(e) =>
                        handleChange(`productos.${index}.nombre`, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold">Proyecto:</h4>
                <label className="block">Tipo:</label>
                <input
                  type="text"
                  value={editedData.proyecto.tipo}
                  onChange={(e) => handleChange("proyecto.tipo", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Título:</label>
                <input
                  type="text"
                  value={editedData.proyecto.titulo}
                  onChange={(e) => handleChange("proyecto.titulo", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Resolución Número:</label>
                <input
                  type="text"
                  value={editedData.proyecto.resolucion.numero}
                  onChange={(e) => handleChange("proyecto.resolucion.numero", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block">Resolución Fecha:</label>
                <input
                  type="text"
                  value={editedData.proyecto.resolucion.fecha}
                  onChange={(e) => handleChange("proyecto.resolucion.fecha", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-[#931D21] text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;