import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import './RoyalCruiseSection.css';
import AzamaraLogo from "../../assets/Azamara-White.png";
import PursuitImg from "../../assets/Navios/Azamara-pursuit.webp"
import JourneyImg from "../../assets/Navios/Azamara-journey.webp"
import OnwardImg from "../../assets/Navios/Azamara-Onward.webp"
import QuestImg from "../../assets/Navios/Azamara-Quest.webp"

const RoyalCruiseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const cruiseShips = [
    { id: 'Pursuit', title: 'Azamara Pursuit', port: '', image: PursuitImg, url: '' },
    { id: 'Journey', title: 'Azamara Journey', port: '', image: JourneyImg , url: '' },
    { id: 'Onward', title: 'Azamara Onward', port: '', image: OnwardImg, url: '' },
    { id: 'Quest', title: 'Azamara Quest', port: '', image: QuestImg, url: '' },
  ];

  const totalCards = cruiseShips.length;

  // Detecta quantos cards cabem
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

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

  // Atualiza o translateX com base no tamanho real do card
  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector('.rc-carousel-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const slideAmount = cardWidth + gap;

    trackRef.current.style.transform = `translateX(${-currentIndex * slideAmount}px)`;
  }, [currentIndex, visibleCount]);

  return (
    <section className="rc-section">
      <div className="rc-background" id='navios'></div>

      <div className="rc-container">
        <div className="rc-logo">
          <img src={AzamaraLogo} alt="Azamara" className="rc-logo-img" />
        </div>

        <div className="rc-full-content">
          <div className="rc-content">
            <h1 className="rc-title">Seu lar<br />no mar</h1>
            <p className="rc-description">
              Em toda a nossa frota, você descobrirá que superamos as expectativas até mesmo dos cruzeiristas mais experientes, com nossa tripulação de alto nível, serviço de primeira classe e comodidades de padrão internacional.
            </p>
          </div>

          <div className="rc-carousel-wrapper" ref={containerRef}>
            <button
              className="rc-carousel-btn rc-prev"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={28} />
            </button>

            <div className="rc-carousel-container">
              <div
                ref={trackRef}
                className="rc-carousel-track"
              >
                {cruiseShips.map((ship) => (
                  <div
                    key={ship.id}
                    className="rc-carousel-card"
                    // onClick={() => window.open(ship.url, '_blank')}
                  >
                    <img src={ship.image} alt={ship.title} className="rc-card-image" />
                    <div className="rc-card-overlay">
                      <h3 className="rc-card-title">{ship.title}</h3>
                      <p className="rc-card-port">{ship.port}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="rc-carousel-btn rc-next"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoyalCruiseSection;