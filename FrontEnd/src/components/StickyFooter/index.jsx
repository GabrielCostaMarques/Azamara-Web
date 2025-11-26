// components/StickyFooter.jsx
import React, { useState } from 'react';
import './StickyFooter.css';
import { FaPhone, FaWhatsapp, FaEnvelope, FaTimes } from 'react-icons/fa';
import Logo from "../../assets/Azamara-color.png";

const StickyFooter = () => {
  const [popup, setPopup] = useState(null); // 'phone', 'whatsapp', 'email', ou null

  const openPopup = (type) => setPopup(type);
  const closePopup = () => setPopup(null);

  // === POPUP: TELEFONE ===
  const PhonePopup = () => (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={closePopup}>
          <FaTimes />
        </button>
        <h3>Ligue agora</h3>
        <p>Nosso time está pronto para te atender!</p>
        <a href="tel:+551147609317" className="popup-phone">
          <FaPhone/> Hóspedes Diretos
        </a>
        <a href="tel:+551147609317" className="popup-phone">
          <FaPhone /> Agências de Viagem
        </a>
        <p className="popup-note">Segunda a sexta: 9h às 18h</p>
      </div>
    </div>
  );

  // === POPUP: WHATSAPP ===
  const WhatsAppPopup = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSent(true);
      setTimeout(() => {
        window.open(`https://wa.me/5511999999999?text=Olá! Quero falar sobre cruzeiros. Meu e-mail: ${encodeURIComponent(email)}`, '_blank');
      }, 800);
    };

    return (
      <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={closePopup}>
            <FaTimes />
          </button>
          <h3>Tire suas dúvidas por WhatsApp</h3>
          <p>Informe seu email abaixo para iniciar a conversa no WhatsApp</p>

          {sent ? (
            <div className="popup-success">
              Enviado com sucesso!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="popup-input"
              />
              <p className="popup-required">*Preenchimento obrigatório</p>

              <div className="popup-checkbox">
                <input type="checkbox" id="lgpd-wpp" required />
                <label htmlFor="lgpd-wpp">
                  Eu autorizo e concordo que utilize meus dados pessoais para a finalidade específica de prestação de serviços, em conformidade com a LGPD. Nossa <a href="#" className="popup-link">Política de Privacidade</a>.
                </label>
              </div>

              <button type="submit" className="popup-submit">
                INICIAR CONVERSA
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  // === POPUP: E-MAIL ===
  const EmailPopup = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSent(true);
    };

    return (
      <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={closePopup}>
            <FaTimes />
          </button>
          <h3>Envie sua dúvida por e-mail</h3>
          <p>Preencha os campos abaixo e responderemos em até 24h.</p>

          {sent ? (
            <div className="popup-success">
              Mensagem enviada com sucesso!<br />
              Entraremos em contato em breve.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nome *" required className="popup-input" />
              <input type="email" placeholder="E-mail *" required className="popup-input" />
              <textarea placeholder="Sua mensagem *" required className="popup-textarea" rows="4" />
              <button type="submit" className="popup-submit">
                ENVIAR MENSAGEM
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* STICKY FOOTER */}
      <div className="sticky-footer">
        <div className="sticky-container">
          <div className="sticky-brand">
            <img src={Logo} alt="Azamara Cruise" className="sticky-logo" />
          </div>

          <div className="sticky-channels">
            <button onClick={() => openPopup('phone')} className="channel-item">
              <FaPhone style={{ transform: "scaleX(-1)" }} />
              <div>
                <strong>Atendimento<br />por Telefone</strong>
              </div>
            </button>

            <button onClick={() => openPopup('whatsapp')} className="channel-item">
              <FaWhatsapp />
              <div>
                <strong>Atendimento<br />por WhatsApp</strong>
              </div>
            </button>

            <button onClick={() => openPopup('email')} className="channel-item">
              <FaEnvelope />
              <div>
                <strong>Atendimento <br />por Email</strong>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* RENDERIZAÇÃO DOS POPUPS */}
      {popup === 'phone' && <PhonePopup />}
      {popup === 'whatsapp' && <WhatsAppPopup />}
      {popup === 'email' && <EmailPopup />}
    </>
  );
};

export default StickyFooter;