import { X } from "lucide-react";
import "../promo.css";
import {SendMailBudget} from '../../../services/SendMail'

export default function SidebarForm({ sidebarOpen, setSidebarOpen, offer }) {

  if (!sidebarOpen) return null;

  const hasOffer = offer && offer.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const payload = {
      name: data.name,
      tipoCliente: data.tipoCliente,
      email: data.email,
      phone: data.phone,
      number: data.number,
      message: data.message || "Nenhuma mensagem informada",

      offer_title: hasOffer ? offer.title : "Nenhuma oferta selecionada",
      offer_ship: hasOffer ? `Azamara ${offer.ship}` : "",
      offer_departure: hasOffer ? offer.departure : "",
      offer_price: hasOffer ? offer.price : "",
      offer_ports: hasOffer ? offer.ports : "",
    };

      try{
        SendMailBudget(payload)
        alert("Orçamento solicitado com sucesso!");
        setSidebarOpen(false);
      }
      catch(error){
        console.error("Erro ao enviar email:", error);
        alert("Erro ao enviar seu orçamento. Tente novamente.");
      }
  };


  return (
    <>
      <div
        className="sidebar-backdrop"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="sidebar open">
        <div className="sidebar-header">
          <h3>Solicitar Orçamento</h3>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <form className="sidebar-form" onSubmit={handleSubmit}>
          {hasOffer && (
            <div className="offer-info">
              <h4>Oferta Selecionada</h4>

              <input
                type="text"
                value={offer.title}
                readOnly
                className="readonly"
              />

              <div className="offer-grid">
                <input
                  type="text"
                  value={`Azamara ${offer.ship}`}
                  readOnly
                  className="readonly"
                  placeholder="Navio"
                />
                <input
                  type="text"
                  value={offer.departure}
                  readOnly
                  className="readonly"
                  placeholder="Embarque"
                />
              </div>
              <input
                type="text"
                value={`A partir de ${offer.price}`}
                readOnly
                className="readonly"
                placeholder="Embarque"
              />
            </div>
          )}

          <div className="client-info">
            <h4>Seus Dados</h4>

            <input
              type="text"
              name="name"
              placeholder="Nome completo *"
              required
            />

            <select name="tipoCliente" required>
              <option value="" disabled selected>
                Tipo de Cliente*
              </option>
              <option value="Sou Hóspede">Sou Hóspede</option>
              <option value="Sou Agência de Viagens">Sou Agência de Viagens</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone com DDD *"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Número de hóspedes*"
              max={4}
              min={0}
              minLength={0}
              maxLength={4}
              required
            />
            <textarea
              name="message"
              placeholder="Informe os dados para reserva (opcional)"
              rows="3"
            />
          </div>

          <button type="submit" className="orcamento-btn full">
            SOLICITE SUA RESERVA
          </button>
        </form>
      </div>
    </>
  );
}
