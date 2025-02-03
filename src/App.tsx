import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Formulario3 from "./components/formularios/formulario3";
import Formulario4 from "./components/formularios/formulario4";
import GestorReportes from './pages/gestor_reportes/gestor_reportes';
import ReporteEditor from './pages/reporte_editor/reporte_editor';
import GestorDocumentos from './pages/gestor_documentos/gestor_documentos';
import Login from './pages/Login/login';
import Principal from './pages/principal/principal';
import Format from "./components/reports/Format";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow p-6 space-y-4">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/GestorDocumento" element={<GestorDocumentos />} />
        <Route path="/ReporteEditor" element={<ReporteEditor />} />
        <Route path="/GestorReporte" element={<GestorReportes />} />
        <Route path="/Principal" element={<Principal />} />
        <Route path="/Formato" element={<Format />} />
        <Route path="/Formulario3" element={<Formulario3 />} />
        <Route path="/Formulario4" element={<Formulario4 />} />
        </Routes>
    </Router>
    </main>
      <Footer />
      </div>
  );
};

export default App;
