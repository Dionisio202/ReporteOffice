import { useState, useEffect, useCallback } from "react";
import { EmailInput } from "./components/EmailInput";
import DocumentViewer from "../files/DocumentViewer";
import Title from "./components/TitleProps";
import io from "socket.io-client";
import { BonitaUtilities} from "../bonita/bonita-utilities";

// Fuera del componente, crea una única instancia de socket
const socket = io("http://localhost:3001");

(async () => {
  const bonitaUtils = new BonitaUtilities(); // Crear una instancia de la clase
  const proceso = await bonitaUtils.obtenerIdProceso(); // Llamar a la función desde la instancia
  console.log(proceso);
})();
// Definimos un tipo para los documentos
type DocumentType = {
  key: string;
  title: string;
  nombre: string;
};

// Simulamos documentos precargados estáticamente (solo .docx)
const staticDocuments: Record<string, DocumentType> = {
  datos: {
    key: "jfda-001",
    title: "Formato_datos_informativos_autores",
    nombre: "jfda-001.docx",
  },
  otroDocumento: {
    key: "jfsr-001",
    title: "Formato_solicitud_registro",
    nombre: "jfsr-001.docx",
  },
};

export default function WebPage() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar conexión WebSocket
  useEffect(() => {
    const handleConnect = () => {
      if (process.env.NODE_ENV === "development") {
        console.log("Conectado al servidor WebSocket");
      }
    };

    const handleConnectError = (err: Error) => {
      console.error("Error de conexión WebSocket:", err);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
    };
  }, []);
  // Función para enviar los datos al backend a través de WebSockets
  const enviarDatosAlBackend = useCallback(
    async (
      idProceso: string,
      name: string,
      caseId: string,
      assigned_id: string
    ) => {
      return new Promise((resolve, reject) => {
        const id_proceso_bigint = BigInt(idProceso);
        const id_caso_num = Number(caseId);
        const id_funcionario_int = Number(assigned_id);

        if (isNaN(id_caso_num) || isNaN(id_funcionario_int)) {
          console.error("Error: Los datos no son números válidos");
          reject("Error: Los datos no son números válidos");
          return;
        }

        const datosParaEnviar = {
          id_funcionario: id_funcionario_int,
          id_proceso: id_proceso_bigint.toString(),
          id_caso: id_caso_num,
          nombre_proceso: name,
        };

        if (process.env.NODE_ENV === "development") {
          console.log("JSON que se enviará al backend:", JSON.stringify(datosParaEnviar, null, 2));
        }

        socket.emit(
          "iniciar_registro",
          datosParaEnviar,
          (response: { success: boolean; message: string }) => {
            if (response.success) {
              if (process.env.NODE_ENV === "development") {
                console.log("Respuesta del backend:", response.message);
              }
              resolve(response);
            } else {
              console.error("Error en el backend:", response.message);
              reject(response.message);
            }
          }
        );
      });
    },
    [socket]
  );

  // Llamar a la función al cargar el componente (solo una vez)
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setLoading(true);
        setError(null);

        try {
          const proceso = await obtenerIdProceso();
          if (proceso && isMounted) {
            const tareas = await obtenerTareas(proceso.id);
            if (tareas && tareas.length > 0 && isMounted) {
              const primeraTarea = tareas[0];
              if (process.env.NODE_ENV === "development") {
                console.log("Enviando datos de la primera tarea:", primeraTarea);
              }
              await enviarDatosAlBackend(
                proceso.id,
                proceso.name,
                primeraTarea.caseId,
                primeraTarea.assigned_id
              );
            }
          }
        } catch (error) {
          console.error("Error en la carga de datos:", error);
          setError(
            `Error en la carga de datos: ${
              error instanceof Error ? error.message : "Error desconocido"
            }`
          );
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [obtenerIdProceso, obtenerTareas, enviarDatosAlBackend]);

  // Seleccionar documento a visualizar
  const handleViewDocument = (documentType: keyof typeof staticDocuments) => {
    const document = staticDocuments[documentType];
    setSelectedDocument(document);
  };

  // Marcar o desmarcar documento
  const handleCheckboxChange = (documentType: keyof typeof staticDocuments) => {
    setSelectedDocs((prev) => {
      const newSelectedDocs = new Set(prev);
      if (newSelectedDocs.has(documentType)) {
        newSelectedDocs.delete(documentType);
      } else {
        newSelectedDocs.add(documentType);
      }
      return newSelectedDocs;
    });
  };

  const documentList = [
    { type: "datos", label: "Formato datos informativos de autores" },
    { type: "otroDocumento", label: "Formato Solicitud de registro" },
  ];

  return (
    <div className="flex w-full h-full p-2 bg-gray-200">
      <div className="flex w-full h-full flex-col md:flex-row gap-4 mt-4">
        {/* Panel Izquierdo - Tabla de documentos y correos */}
        <div className="w-full md:w-1/4 space-y-4">
          <Title
            text="Asesoramiento Registro Propiedad Intelectual"
            size="2xl"
            className="text-center text-gray-800 mb-4 text-xl"
          />
          {/* Tabla de documentos */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-1 text-left text-xs">Documento</th>
                  <th className="px-4 py-1 text-left text-xs">Acción</th>
                </tr>
              </thead>
              <tbody>
                {documentList.map((doc) => (
                  <tr key={doc.type} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-1 text-xs">{doc.label}</td>
                    <td className="px-4 py-1 text-xs flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedDocs.has(doc.type)}
                        onChange={() => handleCheckboxChange(doc.type as keyof typeof staticDocuments)}
                        className="h-4 w-4"
                      />
                      {/* Botón para visualizar */}
                      <button
                        onClick={() => handleViewDocument(doc.type as keyof typeof staticDocuments)}
                        className="bg-[#931D21] text-white py-1 px-4 rounded hover:bg-blue-500 transition duration-300"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Input de correos */}
          <div className="mt-3 md:w-8/4">
            <EmailInput />
          </div>
        </div>

        {/* Panel Derecho - Visor de documentos */}
        <div className="w-full h-full md:w-3/4 pl-6 mt-0.5">
          {selectedDocument ? (
            <DocumentViewer
              keyDocument={selectedDocument.key}
              title={selectedDocument.title}
              documentName={selectedDocument.nombre}
              mode="edit"
              callbackUrl="http://host.docker.internal:3001/api/save-document"
            />
          ) : (
            <p className="text-center text-gray-500">
              Selecciona un documento para visualizarlo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}