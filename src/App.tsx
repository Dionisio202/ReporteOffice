import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import GestorReportes from './pages/gestor_reportes/gestor_reportes';
import ReporteEditor from './pages/reporte_editor/reporte_editor';
import GestorDocumentos from './pages/gestor_documentos/gestor_documentos';
import Login from './pages/Login/login';
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow p-6 space-y-4">
    <Router>
      <Routes>
        <Route path="/" element={<GestorReportes />} />
        <Route path="/GestorDocumentos" element={<GestorDocumentos />} />
        <Route path="/ReporteEditor" element={<ReporteEditor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </main>
      <Footer />
      </div>
  );
};

export default App;
