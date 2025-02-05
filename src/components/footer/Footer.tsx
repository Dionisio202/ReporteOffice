import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2f2f2f] p-4 text-center text-white md:flex md:items-center md:justify-between md:p-6">
      <p className="text-sm sm:text-base">
        © 2025 <span className="font-semibold">DINNOVA</span>. Todos los derechos reservados.
      </p>
      <nav className="mt-4 md:mt-0">
        <ul className="flex flex-wrap justify-center space-x-4">
          <li>
            <a href="#privacy" className="hover:underline">
              Privacidad
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:underline">
              Términos
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
