import { useState,useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCarousel } from "./funcionalidades/useCarousel";
import OfferCard from "./funcionalidades/OfferCard";
import ItineraryPopup from "./funcionalidades/ItineraryPopup";
import SidebarForm from "./funcionalidades/Sidebarform";
import { useCruiseOffers } from "../../hooks/useCruiseOffers";
import "./promo.css";

export default function CruiseOffersSection() {
const { allOffers = [], loading, error } = useCruiseOffers();
const [selectedOffer, setSelectedOffer] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [popupOpen, setPopupOpen] = useState(false);

const [limitedOffers, setLimitedOffers] = useState([]);

useEffect(() => {
  if (allOffers.length > 0) {
    setLimitedOffers(allOffers.slice(0, 6));
  }
}, [allOffers]);

const {
  currentIndex,
  maxIndex,
  nextSlide,
  prevSlide,
  trackRef,
  setCurrentIndex,
} = useCarousel(limitedOffers);
  const openBudget = (offer) => {
    setSelectedOffer(offer);
    setSidebarOpen(true);
    setPopupOpen(false);
  };

  const openDetails = (offer) => {
    setSelectedOffer(offer);
    setPopupOpen(true);
    setSidebarOpen(false);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedOffer(null);
  };

  if (loading) {
    return (
      <section className="offers-section" id="ofertas">
        <div className="offers-container">
          <div className="section-header">
            <span className="section-label">MELHOR PREÇO GARANTIDO</span>
            <h2>NOSSAS MELHORES OFERTAS</h2>
          </div>
          <div className="loading-state">
            <Loader2 className="animate-spin" size={40} />
            <p>Carregando as melhores ofertas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || limitedOffers.length === 0) {
    return (
      <section className="offers-section" id="ofertas">
        <div className="offers-container">
          <div className="section-header">
            <span className="section-label">MELHOR PREÇO GARANTIDO</span>
            <h2>NOSSAS MELHORES OFERTAS</h2>
          </div>
          <div className="error-state">
            <p>Não foi possível carregar as ofertas.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="offers-section" id="ofertas">
      <div className="promo-banner">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176376.png"
          alt="Sem juros"
          className="promo-icon"
        />
        <span>Em 10x sem juros</span>
      </div>

      <div className="offers-container">
        <div className="section-header">
          <span className="section-label">MELHOR PREÇO GARANTIDO</span>
          <h2>NOSSAS MELHORES OFERTAS</h2>
        </div>

        <div className="carousel-wrapper">
          <button
            className={`carousel-btn prev ${currentIndex === 0 ? "disabled" : ""}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="carousel-container">
            <div ref={trackRef} className="carousel-track">
              {limitedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onDetails={() => openDetails(offer)}
                  onBudget={() => openBudget(offer)}
                />
              ))}
            </div>
          </div>

          <button
            className={`carousel-btn next ${currentIndex >= maxIndex ? "disabled" : ""}`}
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      {selectedOffer && popupOpen && (
        <ItineraryPopup
          offer={selectedOffer}
          onClose={closePopup}
          onBudget={openBudget}
        />
      )}

      <SidebarForm
        sidebarOpen={sidebarOpen}
        setSidebarOpen={(v) => {
          setSidebarOpen(v);
          if (!v) setPopupOpen(false);
        }}
        offer={selectedOffer}
      />
    </section>
  );
}