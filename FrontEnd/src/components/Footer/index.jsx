import './Footer.css';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import Logo from "../../assets/Azamara-color.png"
import R11 from "../../assets/R11.png"
import { PoliticaPrivacidadePopup } from './Popup/PoliticaPrivacidadePopup';
import { useState } from 'react';

const Footer = () => {

      const [popup, setPopup] = useState(null);

      const openPopup = (type) => setPopup(type);
      const closePopup = () => setPopup(null);


  return (
    <>
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logos">
          <img
            src={R11}
            alt="R11 Travel"
            className="footer-logo"
          />
          <div className="divider"></div>
          <div className="footer-partner">
            <img
              src={Logo}
              alt="Royal Caribbean"
              className="partner-logo"
            />
          </div>
        </div>
        <div className="footer-contact">
          <h5>Receba as Melhores Ofertas</h5>
          <input type="text" className="input-email" placeholder='Seu Email'/>
          </div>

      </div>
      <div className="footer-section">

        <div className="footer-links">
          <h3>Documentos</h3>
          <a href="public/data/Condicoes-GeraisAzamara-Cruises.pdf" target='_blank'>Condições Gerais</a>
          <button className="link-politica-privacidade" onClick={()=>openPopup('politica')}>Política de Privacidade</button>
        </div>
        <div className="footer-links">
          <h3>Agentes de Viagem </h3>
          <a href="https://manualdoagente.com.br/">Manual do Agente</a>
          <a href="https://manualdoagente.com.br/seja-parceiro/">Seja Parceiro</a>
          <a href="tel:+551130907200">Contato Agente de Viagem</a>
        </div>
      </div>


      <div className="footer-bottom">
        <p>© 2025 R11 Travel. Todos os Direitos Reservados.</p>
        <div className="footer-social">
          <a href="https://www.instagram.com/azamaracruisesbrasil/" aria-label="Instagram"><FaInstagram /></a>
          <a href="mailto:contato@shoppingdecruzeiros.com.br" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
      {popup == 'politica' && <PoliticaPrivacidadePopup closePopup={closePopup}/>}
      </>
  );

};

export default Footer;
