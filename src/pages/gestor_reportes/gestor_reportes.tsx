import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "../gestor_reportes/gestor_reportes.css";

const GestorReportes: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  function createData(name: string, periodo: string) {
    return { name, periodo };
  }

  const rows = [
    createData("POA_2025_Reporte_T1", "T1"),
    createData("POA_2025_Reporte_T2", "T2"),
    createData("POA_2025_Reporte_T3", "T3"),
  ];

  return (
    <div>
      <Header />
      <h1>Reportes POA</h1>
      <div className="contenedorprincipal">
        {/* Contenedor del menú (Card) */}
        <div className="contenedormenu">
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Título del Card
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="Selecciona esta opción"
              />
            </CardContent>
          </Card>
        </div>

        <div className="contenedortabla">
          <TableContainer component={Paper}>
            <Table className="tabla" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Periodo</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.periodo}</TableCell>
                    <TableCell align="right">
                      <button>Acción</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GestorReportes;
