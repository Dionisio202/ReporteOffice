import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Modal.css";
// Conectar a WebSocket en el frontend
const socket = io("http://localhost:3001"); // Asegúrate de que esta URL coincida con la del servidor WebSocket

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  modalData: {
    fecha: string;
    lugar: string;
    destinatario: {
      nombre: string;
      titulo: string;
      cargo: string;
      institucion: string;
    };
    solicitante: {
      nombre: string;
      cargo: string;
    };
    productos: { id: string; nombre: string }[];
    proyecto: {
      tipo: string;
      titulo: string;
      resolucion: {
        numero: string;
        fecha: string;
      };
    };
  };
  onSave: (updatedData: any) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, modalData, onSave }) => {
  if (!showModal) return null;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editableData, setEditableData] = useState(modalData);

  const closeModalHandler = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    closeModal();
  };

  useEffect(() => {
    setEditableData(modalData);
  }, [modalData]);
// @ts-ignore
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    subfield?: string
  ) => {
    setEditableData((prevData) => {
      if (subfield) {
        const [parentField, childField] = field.split('.');
        return {
          ...prevData,
          [parentField]: {
            // @ts-ignore
            ...prevData[parentField],
            [childField]: event.target.value,
          },
        };
      }
      return { ...prevData, [field]: event.target.value };
    });
  };
// @ts-ignore
  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedProducts = [...editableData.productos];
    updatedProducts[index].nombre = event.target.value;
    setEditableData({ ...editableData, productos: updatedProducts });
  };

  const handleSave = () => {
    // Emitir los datos al servidor WebSocket
    socket.emit("saveData", editableData); // Enviamos el objeto editableData al servidor WebSocket

    // Llamamos a la función onSave para manejar la lógica después de enviar
    onSave(editableData);

    closeModalHandler();
  };

  return (
    <dialog ref={dialogRef} className="modal-overlay">
      <div className="modal">
        <button onClick={closeModalHandler} className="close-btn" aria-label="Cerrar modal">
          &times;
        </button>
        <h2 className="modal-title">Detalles del Proyecto</h2>
        <div className="modal-content">
          {/* Aquí iría todo el contenido del formulario */}
        </div>

        <div className="modal-actions">
          <button onClick={closeModalHandler} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSave} className="btn-save">
            Guardar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
