import React from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';

interface DocumentViewerProps {
  keyDocument: string;
  title: string;
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

const DocumentViewer: React.FC<DocumentViewerProps> = ({ keyDocument, title }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center justify-center p-6">
      <div className="w-full max-w-6xl border border-gray-300 shadow-md bg-white p-4 flex flex-col h-full">

        {/* Contenedor del Editor asegurando altura completa */}
        <div className="flex-grow w-full h-full">
          <div className="w-full h-full">
            <DocumentEditor
              id="docxEditor"
              documentServerUrl="http://localhost"
              config={{
                document: {
                  fileType: 'docx',
                  key: keyDocument,
                  title: title,
                  url: 'http://host.docker.internal:3001/api/document',
                },
                documentType: 'word',
                editorConfig: {
                  mode: 'edit',
                  callbackUrl: 'http://host.docker.internal:3001/api/save-document',
                },
              }}
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
