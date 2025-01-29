import React, { useState } from "react";
import Modal from "react-modal";
import { FaEye, FaEdit, FaDownload } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReportTable = () => {
  const reports = [
    { name: "Reporte_Trimestre1", period: "T1", file: "/sample.pdf" },
    { name: "Reporte_Trimestre2", period: "T2", file: "/sample.pdf" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handlePreview = (report) => {
    setSelectedReport(report);
    setIsPreviewOpen(true);
  };

  const handleEdit = (report) => {
    setSelectedReport(report);
    setIsEditOpen(true);
  };

  const handleDownload = (report) => {
    const link = document.createElement("a");
    link.href = report.file;
    link.download = report.name + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#931D21] text-white text-sm font-semibold">
            <th className="px-6 py-3 text-left text-sm font-medium">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Periodo</th>
            <th className="px-2 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.name} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">{report.name}</td>
              <td className="px-6 py-4 text-sm font-medium">{report.period}</td>
              <td className="px-2 py-4 flex space-x-2">
                <button
                  onClick={() => handlePreview(report)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEdit(report)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDownload(report)}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Previsualización */}
      <Modal isOpen={isPreviewOpen} onRequestClose={() => setIsPreviewOpen(false)}>
        <h2>Previsualización: {selectedReport?.name}</h2>
        <Document file={selectedReport?.file}>
          <Page pageNumber={1} />
        </Document>
        <button onClick={() => setIsPreviewOpen(false)}>Cerrar</button>
      </Modal>

      {/* Modal de Edición */}
      <Modal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
        <h2>Editar Reporte</h2>
        <input type="text" defaultValue={selectedReport?.name} className="border p-2" />
        <button onClick={() => setIsEditOpen(false)}>Guardar</button>
      </Modal>
    </div>
  );
};

export default ReportTable;
