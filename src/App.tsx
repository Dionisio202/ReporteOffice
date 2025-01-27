import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GestorReportes from './pages/gestor_reportes/gestor_reportes';
import ReporteEditor from './pages/reporte_editor/reporte_editor';
import GestorDocumentos from './pages/gestor_documentos/gestor_documentos';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GestorReportes />} />
        <Route path="/GestorDocumentos" element={<GestorDocumentos />} />
        <Route path="/ReporteEditor" element={<ReporteEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
