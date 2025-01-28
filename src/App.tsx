import React from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';
import './index.css';

function onDocumentReady(event: any) {
  console.log('Documento cargado correctamente', event);
}

function onLoadComponentError(errorCode: any, errorDescription: any) {
  console.error('Error al cargar el componente');
  switch (errorCode) {
    case -1: // Unknown error loading component
      console.error('Error desconocido:', errorDescription);
      break;

    case -2: // Error loading DocsAPI from the document server
      console.error('Error al cargar DocsAPI desde el servidor de documentos:', errorDescription);
      break;

    case -3: // DocsAPI is not defined
      console.error('DocsAPI no está definido:', errorDescription);
      break;

    default:
      console.error(`Código de error no manejado (${errorCode}):`, errorDescription);
  }
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sección del Formulario */}
      <div className="w-1/3 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Formulario</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Escribe tu nombre"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              id="edad"
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingresa tu edad"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <input
              id="ciudad"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingresa tu ciudad"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Sección del Documento */}
      <div className="w-2/3 p-6 bg-gray-50 flex items-center justify-center">
        <div className="w-full h-full border border-gray-300 shadow-md bg-white p-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Vista Previa del Documento</h2>
          <DocumentEditor
            id="docxEditor"
            documentServerUrl="http://localhost"
            config={{
              document: {
                fileType: 'docx',
                key: 'unique-document-key',
                title: 'Documento de Prueba.docx',
                url: 'http://host.docker.internal:3000/api/document',
              },
              documentType: 'word',
              editorConfig: {
                mode: 'edit',
                callbackUrl: 'http://host.docker.internal:3000/api/save-document',
              },
            }}
            events_onDocumentReady={onDocumentReady}
            onLoadComponentError={onLoadComponentError}
          />
        </div>
      </div>
    </div>
  );
}
