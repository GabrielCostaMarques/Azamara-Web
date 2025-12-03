import { useState } from "react";
import { FaTimes } from 'react-icons/fa';

export const WhatsAppPopup = ({ closePopup }) => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
            window.open(`https://wa.me/5511975608520?text=Olá! Quero falar sobre cruzeiros. Meu e-mail: ${encodeURIComponent(email)}`, '_blank');
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