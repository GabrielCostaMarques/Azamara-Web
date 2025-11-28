import React, { useState } from 'react';

import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

import { PhonePopup } from './Popups/Phone';
import { WhatsAppPopup } from './Popups/WhatsApp';
import { EmailPopup } from './Popups/Email';

import './StickyFooter.css';
import Logo from "../../assets/Azamara-color.png";


const StickyFooter = () => {
  const [popup, setPopup] = useState(null);

  const openPopup = (type) => setPopup(type);
  const closePopup = () => setPopup(null);


  return (
    <>
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

      {popup === 'phone' && <PhonePopup closePopup={closePopup} />}
      {popup === 'whatsapp' && <WhatsAppPopup closePopup={closePopup} />}
      {popup === 'email' && <EmailPopup closePopup={closePopup}/>}
    </>
  );
};

export default StickyFooter;