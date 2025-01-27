import React, { useState, FormEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!correo || !contrasenia) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    console.log("Correo:", correo);
    console.log("Contraseña:", contrasenia);

    toast.success("Inicio de sesión exitoso!");
  };

  return (
    <div>
      <Header />
      <div className="contenedorPrincipal">
        <div className="contenedorLoguin">
          <div className="portadasLoguin">
            <div className="porta"></div>
          </div>
          <div className="contenedorFormularioLoguin">
            <div className="encabezadoLoguin">
              <img src="../../assets/img/logoUTA.png" alt="Logo DINNOVA" />
              <h1>Bienvenido a DINNOVA</h1>
            </div>
            <div className="formularioLoguin">
              <form onSubmit={handleSubmit}>
                <div className="contenedorIngreso">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="ingreso"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    maxLength={50}
                    minLength={4}
                    required
                  />
                </div>
                <div className="contenedorIngreso">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contrasenia"
                    name="contrasenia"
                    className="ingreso"
                    placeholder="Contraseña"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    maxLength={25}
                    minLength={4}
                    required
                  />
                  {showPassword ? (
                    <BsEyeSlash
                      className="iconoIngreso"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <BsEye
                      className="iconoIngreso"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <p className="linkRecuperar">¿Olvidaste tu contraseña?</p>
                <button type="submit" className="botonVerde">
                  Iniciar sesión
                </button>
              </form>
              <div className="registrate">
                <p>No tienes cuenta?</p>
                Regístrate!!
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
