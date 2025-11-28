import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import './AzamaraCruiseSection.css';
import AzamaraLogo from "../../assets/Azamara-White.png";
import PursuitImg from "../../assets/Navios/Azamara-pursuit.webp"
import JourneyImg from "../../assets/Navios/Azamara-journey.webp"
import OnwardImg from "../../assets/Navios/Azamara-Onward.webp"
import QuestImg from "../../assets/Navios/Azamara-Quest.webp"

const AzamaraCruiseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cruiseShips = [
    {
      title: 'Azamara Pursuit®',
      port: '', image: PursuitImg,
      description: 'O lançamento do Azamara Pursuit em 2018 abriu os mares para novos itinerários e a oportunidade de proporcionar aos nossos hóspedes experiências mais exclusivas e imersivas do que nunca.'
    },
    {
      title: 'Azamara Journey®',
      port: '', image: JourneyImg,
      description: 'O Azamara Journey é um luxuoso hotel boutique no mar, um navio de porte médio com um layout de decks intimista, porém nunca lotado, que oferece tudo o que os cruzeiristas modernos procuram, além de alguns extras inesperados.',
    },
    {
      title: 'Azamara Onward℠',
      port: '', image: OnwardImg,
      description: 'Construído para cruzar oceanos, navegar por lugares panorâmicos e atracar em locais inacessíveis a navios maiores, esta experiência de cruzeiro em navio de pequeno porte é incomparável.',
    },
    {
      title: 'Azamara Quest®',
      port: '', image: QuestImg,
      description: 'O Azamara Quest é um navio de porte médio com um layout de convés que é intimista, mas nunca lotado, e oferece tudo o que os cruzeiristas modernos procuram, além de alguns extras inesperados.',
    },
  ];

  const openModal = (ship) => {
    setSelectedShip(ship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShip(null);
  };

  const totalCards = cruiseShips.length;

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
                {cruiseShips.map((ship, index) => (
                  <div
                    key={index}
                    className="rc-carousel-card"
                    onClick={() => openModal(ship)}
                    style={{ cursor: 'pointer' }}
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


      {isModalOpen && selectedShip && (
        <div className="rc-modal-overlay" onClick={closeModal}>
          <div className="rc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="rc-modal-close" onClick={closeModal}>×</button>

            <div className="rc-modal-body">
              <img
                src={selectedShip.image}
                alt={selectedShip.title}
                className="rc-modal-image"
              />
              <div className="rc-modal-text">
                <h2>{selectedShip.title}</h2>
                <p>{selectedShip.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AzamaraCruiseSection;