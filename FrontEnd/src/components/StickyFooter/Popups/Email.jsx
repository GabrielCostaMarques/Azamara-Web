import { useState } from "react";
import emailjs from "@emailjs/browser"
import { FaTimes } from "react-icons/fa";



export const EmailPopup = ({closePopup}) => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                "service_nnmi3fn",
                "template_9b4sxwc",
                formData,
                "YHIeqCykoTz5ANg9R"
            )
            .then(() => {
                setSent(true);
            })
            .catch((err) => {
                console.error("Erro ao enviar email:", err);
                alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
            })
            .finally(() => setLoading(false));
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
                        <input
                            type="text"
                            name="from_name"
                            placeholder="Nome *"
                            required
                            className="popup-input"
                            value={formData.from_name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="reply_to"
                            placeholder="E-mail *"
                            required
                            className="popup-input"
                            value={formData.reply_to}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Sua mensagem *"
                            required
                            className="popup-textarea"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                        />

                        <button type="submit" className="popup-submit" disabled={loading}>
                            {loading ? "Enviando..." : "ENVIAR MENSAGEM"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
