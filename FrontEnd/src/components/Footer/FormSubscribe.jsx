import MailchimpSubscribe from "react-mailchimp-subscribe"
import { useState, useEffect } from 'react';
import { useToast } from '../../utils/Toast/ToastContext';
import "./FormSubscribe.css"

export const NewsletterForm = () => {
  const url = import.meta.env.VITE_MAILCHIMP_URL;

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
        />
      )}
    />
  );
}

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && email.indexOf("@") > -1) {
      onValidated({
        EMAIL: email,
      });
    }
  };

  useEffect(() => {
    if (status === "success") {
      showToast('Inscrito com sucesso!', 'success');
      setEmail('');
    } else if (status === "error") {
      const cleanMessage = message.replace(/<[^>]*>/g, '');
      showToast(cleanMessage, 'error');
    }
  }, [status, message, showToast]);

  return (
    <form onSubmit={handleSubmit} className="form-submit">
      <input
        type="email"
        className="input-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu email"
        required
        disabled={status === "sending"}
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Carregando..." : "Inscreva-se"}
      </button>
    </form>
  );
}