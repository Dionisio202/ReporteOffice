import './reporte_editor.css';

function ReporteEditor() {
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
          {/* Mostrar el documento usando Microsoft Office Viewer */}
          <iframe
            src="https://view.officeapps.live.com/op/view.aspx?src=https://ruta-completa-a-tu-documento.docx"
            className="w-full h-full border rounded-md"
            title="Vista del Documento Word"
            onError={(e) => {
              const target = e.target as HTMLIFrameElement; // Cast explícito al tipo correcto
              target.style.display = 'none';
              alert('No se pudo cargar el documento. Intenta con un archivo PDF o un enlace válido.');
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ReporteEditor;
