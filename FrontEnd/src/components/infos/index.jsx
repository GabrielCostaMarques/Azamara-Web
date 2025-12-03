import "./infos.css";
import { CreditCard, Wallet, Percent, ShieldCheck } from "lucide-react";
import AzamaraFoto from "../../assets/Azamara-info.jpg"

export default function AzamaraSection() {
  return (
    <section className="Azamara-section">
      <div className="Azamara-wrapper">

        {/* Lado da imagem */}
        <div className="Azamara-image-box">
          <img
            src={AzamaraFoto}
            alt="Azamara "
            className="Azamara-image"
          />
        </div>

        {/* Lado do texto */}
        <div className="Azamara-content" id="quem-somos">
          <span className="Azamara-subtitle">A MELHOR EXPERIÊNCIA</span>
          <h2 className="Azamara-title">Azamara Cruises</h2>

          <p>
            A Azamara Cruises é reconhecida mundialmente por oferecer uma experiência íntima, autêntica e voltada para quem deseja viver cada destino, e não apenas visitá-lo. Seus navios menores permitem atracar em portos exclusivos, chegar mais perto das cidades e permanecer mais tempo em cada escala, garantindo imersão cultural, gastronômica e histórica em cada viagem.
          </p>

          <p>
            No Brasil, a R11 Travel é o parceiro oficial da Azamara cruises, a sua porta de entrada para navegar com uma das companhias mais premiadas do mundo quando o assunto é hospitalidade e excelência no serviço.
          </p>

          <div className="Azamara-features">
            <div className="feature">
              <CreditCard size={28} />
              <h4>FORMAS DE PAGAMENTO</h4>
              <p>Em até 10x sem juros na Azamara </p>
            </div>

            <div className="feature">
              <Wallet size={28} />
              <h4>SEM ENTRADA</h4>
              <p>Não cobramos entrada em nossos orçamentos</p>
            </div>

            <div className="feature">
              <Percent size={28} />
              <h4>OFERTAS EXCLUSIVAS</h4>
              <p>Tarifas especiais Azamara  com vantagens únicas</p>
            </div>

            <div className="feature">
              <ShieldCheck size={28} />
              <h4>CONFIABILIDADE</h4>
              <p>Atendimento especializado e suporte de seg. a sábado</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
