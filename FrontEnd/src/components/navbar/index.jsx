import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import logoWhite from "../../assets/Azamara-White.png"

export default function Navbar({ customClass = "" }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className={`navbar-container-main ${customClass}`}> 
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoWhite} alt="Logo Azamara" />
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menu">
          {open ? "✕" : "☰"}
        </button>

        <div className={`menu-wrapper ${open ? "active" : ""}`}>
          <ul className="navbar-links">
            <li><a href="#ofertas" onClick={() => setOpen(false)}>Ofertas</a></li>
            <li><a href="#navios" onClick={() => setOpen(false)}>Navios</a></li>
            <li><a href="#destinos" onClick={() => setOpen(false)}>Destinos</a></li>
            <li><a href="#quem-somos" onClick={() => setOpen(false)}>Quem Somos</a></li>
          </ul>

          <button className="fale-conosco" onClick={() => setOpen(false)}>
            Fale com um agente (11) 9999-9999
          </button>
        </div>
      </div>
    </nav>
  )
}