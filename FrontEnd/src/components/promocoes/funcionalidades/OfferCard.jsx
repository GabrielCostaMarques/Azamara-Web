import { Calendar, Ship } from "lucide-react";

export default function OfferCard({ offer, onDetails, onBudget }) {
  return (
    <div className="offer-card" role="article">
      <div className="card-image">
        <img src={offer.image} alt={offer.title} loading="lazy" />
        <span className="category-badge">{offer.category}</span>
        
      </div>

      <div className="card-content">
        <p className="title-duration">{offer.nights} NOITES</p>
        
        <h3>{offer.title}</h3>

        <div className="info-item">
          <Calendar size={18} />
          <div>
            <span className="info-label">Data de Embarque:</span>
            <span className="info-value">{offer.departure}</span>
          </div>
        </div>

        <div className="info-item">
          <Ship size={18} />
          <div>
            <span className="info-label">A bordo do:</span>
            <span className="info-value">Azamara {offer.ship}</span>
          </div>
        </div>

        <div className="pricing">
          <div className="price-info">
            <span className="installments">{offer.installments}</span>
            <div className="price-row">
              <span className="price">{offer.priceX}</span>
              <div className="discount-badge">
                <span className="discount-label">MELHOR PREÇO</span>
                {/* <span className="discount-value">{offer.discount}</span> */}
              </div>
            </div>
            <span className="per-person">
              A partir de {offer.price} por pessoa *
            </span>
          </div>
        </div>

        <div className="buttons-promo">
          <button className="itinerary-btn" onClick={() => onDetails(offer)}>
            MAIS DETALHES
          </button>
          <button className="orcamento-btn" onClick={() => onBudget(offer)}>
            RESERVE
          </button>
        </div>
      </div>
    </div>
  );
}