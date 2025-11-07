import { Calendar, Ship, ChevronLeft, ChevronRight, X, MapPin, Anchor } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import SidebarForm from "./Sidebarform";
import "./promo.css";

const cruiseOffers = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
  category: "CARIBE",
  title: "7 NIGHT EASTERN CARIBBEAN & PERFECT DAY",
  departure: "Sáb., 10 Outubro 2026",
  ship: "Icon of the Seas",
  installments: "Em 10x de",
  priceX: "R$ 914,12",
  price: "R$ 9.141",
  discount: "SEM ENTRADA",
  taxes: "Sem entrada e em até 10x sem juros"
},
{
  id: 2,
  image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
  category: "CARIBE",
  title: "4 NIGHT EASTERN CARIBBEAN CRUISE",
  departure: "Qui., 28 Janeiro 2027",
  ship: "Freedom of the Seas",
  installments: "Em 10x de",
  priceX: "R$ 234,84",
  price: "R$ 2.348",
  discount: "SEM ENTRADA",
  taxes: "Sem entrada e em até 10x sem juros"
},
{
  id: 3,
  image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
  category: "CARIBE",
  title: "3 NIGHT PERFECT DAY GETAWAY CRUISE",
  departure: "Sex., 20 Novembro 2026",
  ship: "Wonder of the Seas",
  installments: "Em 10x de",
  priceX: "R$ 301,45",
  price: "R$ 3.014",
  discount: "SEM ENTRADA",
  taxes: "Sem entrada e em até 10x sem juros"
},
{
  id: 3,
  image: "https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?w=600&h=400&fit=crop",
  category: "CARIBE",
  title: "3 NIGHT PERFECT DAY GETAWAY CRUISE",
  departure: "Sex., 20 Novembro 2026",
  ship: "Wonder of the Seas",
  installments: "Em 10x de",
  priceX: "R$ 301,45",
  price: "R$ 3.014",
  discount: "SEM ENTRADA",
  taxes: "Sem entrada e em até 10x sem juros"
},];

export default function CruiseOffersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const totalCards = cruiseOffers.length;

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    if (sidebarOpen) {
      setSelectedOffer(null);
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const update = () => {
      const newVisible = getVisibleCount();
      setVisibleCount(newVisible);
      setCurrentIndex(prev => Math.min(prev, Math.max(0, totalCards - newVisible)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [totalCards]);

  const maxIndex = Math.max(0, totalCards - visibleCount);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector('.offer-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 15;
    const slideAmount = cardWidth + gap;
    trackRef.current.style.transform = `translateX(${-currentIndex * slideAmount}px)`;
  }, [currentIndex, visibleCount]);

  return (
    <section className="offers-section" id="ofertas">
      <div className="promo-banner">
        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176376.png" alt="Sem juros" className="promo-icon" />
        <span>Sem entrada e em 10x sem juros</span>
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

          <div className="carousel-container" ref={containerRef}>
            <div ref={trackRef} className="carousel-track">
              {cruiseOffers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="card-image">
                    <img src={offer.image} alt={offer.title} />
                    <span className="category-badge">{offer.category}</span>
                  </div>

                  <div className="card-content">
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
                        <span className="info-value">{offer.ship}</span>
                      </div>
                    </div>

                    <div className="pricing">
                      <div className="price-info">
                        <span className="installments">{offer.installments}</span>
                        <div className="price-row">
                          <span className="price">{offer.priceX}</span>
                          <div className="discount-badge">
                            <span className="discount-label">MELHOR PREÇO</span>
                            <span className="discount-value">{offer.discount}</span>
                          </div>
                        </div>
                        <span className="per-person">A partir de {offer.price} por pessoa *</span>
                      </div>
                    </div>

                    <div className="buttons-promo">
                      <button
                        className="itinerary-btn"
                        onClick={() => setSelectedOffer(offer)}
                      >
                        MAIS DETALHES
                      </button>
                      <button
                        className="orcamento-btn"
                        onClick={() => {
                          setSidebarOpen(true);
                        }}
                      >
                        ORÇAMENTO
                      </button>
                    </div>
                  </div>
                </div>
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

        {/* Dots sempre visíveis */}
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

      {/* === POPUP ITINERÁRIO === */}
      {selectedOffer && !sidebarOpen && (
        <div className="popup-overlay" onClick={() => setSelectedOffer(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedOffer(null)}>
              <X />
            </button>
            <h3>Itinerário</h3>
            <div className="itinerary-item">
              <Calendar size={18} /> <span>{selectedOffer.departure}</span>
            </div>
            <div className="itinerary-item">
              <Ship size={18} /> <span>{selectedOffer.ship}</span>
            </div>
            <div className="itinerary-item">
              <MapPin size={18} /> <span>Caribe → Bahamas → Cozumel</span>
            </div>
            <button className="orcamento-btn full" onClick={() => setSidebarOpen(true)}>
              SOLICITAR ORÇAMENTO
            </button>
          </div>
        </div>
      )}

      <SidebarForm
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    </section>
  );
}