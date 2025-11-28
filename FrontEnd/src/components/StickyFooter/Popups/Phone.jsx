
import { FaPhone, FaTimes } from 'react-icons/fa';


export const PhonePopup = ({ closePopup }) => (
    <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
                <FaTimes />
            </button>
            <h3>Ligue agora</h3>
            <p>Nosso time está pronto para te atender!</p>
            <a href="tel:+551147609317" className="popup-phone">
                <FaPhone /> Hóspedes Diretos
            </a>
            <a href="tel:+551130907200" className="popup-phone">
                <FaPhone /> Agências de Viagem
            </a>
            <p className="popup-note">Segunda a sexta das 9h as 18h<br />Sábado das 9h as 15h</p>

        </div>
    </div>
);