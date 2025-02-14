import React from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';

interface DocumentViewerProps {
  keyDocument: string;
  title: string;
  documentName: string; // Nueva prop para el nombre del documento
  mode?: 'edit' | 'view'; // Modo de visualización del documento
  callbackUrl?: string; // Hacer que callbackUrl sea opcional
}

const onDocumentReady = (event: any) => {
  console.log('Documento cargado correctamente', event);
};

const onLoadComponentError = (errorCode: any, errorDescription: any) => {
  console.error('Error al cargar el componente:', errorDescription);
  switch (errorCode) {
    case -1:
      console.error('Error desconocido:', errorDescription);
      break;
    case -2:
      console.error('Error al cargar DocsAPI desde el servidor de documentos:', errorDescription);
      break;
    case -3:
      console.error('DocsAPI no está definido:', errorDescription);
      break;
    default:
      console.error(`Código de error no manejado (${errorCode}):`, errorDescription);
  }
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ keyDocument, title, documentName, mode, callbackUrl }) => {
  const documentUrl = `http://host.docker.internal:3001/api/document?nombre=${encodeURIComponent(documentName)}`;

  // Configuración de ONLYOFFICE con callbackUrl opcional
  const config: any = {
    document: {
      fileType: 'docx',
      key: keyDocument,
      title: title,
      url: documentUrl,
    },
    documentType: 'word',
    editorConfig: {
      mode: mode || 'view',
      ...(callbackUrl && { callbackUrl }) // Solo incluir si callbackUrl está definida
    },
  };

  return (
    <div className="flex flex-col h-300 bg-gray-100 items-center justify-center p-6">
      <div className="w-full max-w-6xl border border-gray-300 shadow-md bg-white p-4 flex flex-col h-full">
        {/* Contenedor del Editor asegurando altura completa */}
        <div className="flex-grow w-full min-h-[1000px]">
          <div className="w-full h-full">
            <DocumentEditor
              id="docxEditor"
              documentServerUrl="http://localhost:8081/welcome/"
              config={config} // Pasamos la configuración dinámica
              events_onDocumentReady={onDocumentReady}
              onLoadComponentError={onLoadComponentError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
