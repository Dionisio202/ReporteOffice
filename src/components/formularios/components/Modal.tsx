import React, { useEffect, useRef } from "react";
import "./Modal.css"
interface Persona {
  nombre: string;
  cargo: string;
}

interface Destinatario extends Persona {
  titulo: string;
  institucion: string;
}

interface Producto {
  id: string;
  nombre: string;
}

interface Resolucion {
  numero: string;
  fecha: string;
}

interface Proyecto {
  tipo: string;
  titulo: string;
  resolucion: Resolucion;
}

interface ModalProps {
  showModal: boolean; // Controla si el modal está abierto o cerrado
  closeModal: () => void; // Función para cerrar el modal
  modalData: {
    fecha: string;
    lugar: string;
    destinatario: Destinatario;
    solicitante: Persona;
    productos: Producto[];
    proyecto: Proyecto;
  };
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, modalData }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Abre o cierra el modal basado en `showModal`
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (showModal) {
      dialog.showModal(); // Abre el modal
    } else {
      dialog.close(); // Cierra el modal
    }
  }, [showModal]);

  // Maneja el evento `onClose` del elemento `<dialog>`
  const handleDialogClose = () => {
    closeModal(); // Llama a la función `closeModal`
  };

  // Función para manejar el botón "Aceptar"
  const handleAccept = () => {
    alert("Datos aceptados");
    closeModal(); // Cierra el modal después de aceptar
  };

  // Función para manejar el botón "Guardar"
  const handleSave = () => {
    alert("Datos guardados");
    closeModal(); // Cierra el modal después de guardar
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-overlay"
      onClose={handleDialogClose} // Maneja el evento `onClose`
    >
      <div className="modal">
        <button onClick={closeModal} className="close-btn" aria-label="Cerrar modal">
          &times;
        </button>
        <h2 className="modal-title">Detalles del Proyecto</h2>
        <div className="modal-content">
          <p><strong>Fecha:</strong> {modalData.fecha}</p>
          <p><strong>Lugar:</strong> {modalData.lugar}</p>

          <h3>Destinatario:</h3>
          <p><strong>Nombre:</strong> {modalData.destinatario.nombre}</p>
          <p><strong>Título:</strong> {modalData.destinatario.titulo}</p>
          <p><strong>Cargo:</strong> {modalData.destinatario.cargo}</p>
          <p><strong>Institución:</strong> {modalData.destinatario.institucion}</p>

          <h3>Solicitante:</h3>
          <p><strong>Nombre:</strong> {modalData.solicitante.nombre}</p>
          <p><strong>Cargo:</strong> {modalData.solicitante.cargo}</p>

          <h3>Productos:</h3>
          <ul>
            {modalData.productos.map((producto) => (
              <li key={producto.id}>{producto.nombre}</li>
            ))}
          </ul>

          <h3>Proyecto:</h3>
          <p><strong>Tipo:</strong> {modalData.proyecto.tipo}</p>
          <p><strong>Título:</strong> {modalData.proyecto.titulo}</p>
          <p><strong>Resolución:</strong> {modalData.proyecto.resolucion.numero}</p>
          <p><strong>Fecha de Resolución:</strong> {modalData.proyecto.resolucion.fecha}</p>
        </div>

        {/* Botones dentro del modal */}
        <div className="modal-actions">
          <button onClick={handleAccept} className="btn-accept">
            Aceptar
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