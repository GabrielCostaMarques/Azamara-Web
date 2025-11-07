import { X } from "lucide-react";
import "./promo.css";

export default function SidebarForm({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Solicitar Orçamento</h3>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <form className="sidebar-form">
          <input type="text" placeholder="Nome *" required />
          <input type="email" placeholder="E-mail *" required />
          <input type="tel" placeholder="Telefone *" required />
          <textarea placeholder="Mensagem (opcional)" rows="3" />
          <button type="submit" className="orcamento-btn">ENVIAR</button>
        </form>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
