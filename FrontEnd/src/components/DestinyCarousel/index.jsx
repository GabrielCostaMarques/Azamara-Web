import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import "./destiny.css";

const DestinyCruiseSection = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const ships = [
        { Destination: "CARIBBEAN", title: "Caribe", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Caribe.webp" },
        { Destination: "EASTERN CARIBBEAN", title: "Caribe Oriental", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/EASTERN-CARIBBEAN.webp" },
        { Destination: "ASIA", title: "Ásia", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Asia.webp" },
        { Destination: "ATLANTIC", title: "Atlântico", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Atlantic.webp" },
        { Destination: "SOUTH AMERICA", title: "América do Sul", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/south-america.webp" },
        { Destination: "MEDITERRANEAN", title: "Mediterrâneo", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/mediterran-Azamara.webp" },
        { Destination: "ALASKA", title: "Alasca", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Alaska.webp" },
        { Destination: "BERMUDA", title: "Bermudas", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/US-SE-COAST.webp" },
        { Destination: "TRANSATLANTIC", title: "Transatlântico", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Grand-voyage-combo.webp" },
        { Destination: "WESTERN EUROPE", title: "Europa Ocidental", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/WESTERN-EUROPE.webp" },
        { Destination: "SOUTH PACIFIC", title: "Pacífico Sul", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/South-Pacific.webp" },
        { Destination: "US GULF", title: "Golfo dos EUA", image: "https://manualdoagente.com.br/wp-content/uploads/QS_QS280322_011.jpg" },
        { Destination: "SOUTHERN CARIBBEAN", title: "Caribe do Sul", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/SOUTHERN-CARIBBEAN.webp" },
        { Destination: "INDONESIA", title: "Indonésia", image: "https://manualdoagente.com.br/wp-content/uploads/Indonesia_Bali_002.jpg" },
        { Destination: "AFRICA", title: "África", image: "https://manualdoagente.com.br/wp-content/uploads/2025/07/Africa.webp" },
    ];


    const totalCards = ships.length;

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
            setSlideIndex(prev => Math.min(prev, Math.max(0, totalCards - newVisible)));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [totalCards]);

    const maxIndex = Math.max(0, totalCards - visibleCount);

    const handlePrev = () => setSlideIndex(prev => Math.max(0, prev - 1));
    const handleNext = () => setSlideIndex(prev => Math.min(prev + 1, maxIndex));

    // Atualiza o translateX com base no card real
    useEffect(() => {
        if (!trackRef.current) return;
        const firstCard = trackRef.current.querySelector('.rc-carousel-card');
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = 20;
        const slideAmount = cardWidth + gap;
        trackRef.current.style.transform = `translateX(${-slideIndex * slideAmount}px)`;
    }, [slideIndex, visibleCount]);

    return (
        <section className="destiny-section">
            <div className="rc-background" id="destinos"></div>

            <div className="destiny-container">
                <div className="destiny-full-content">
                    {/* CARROSSEL */}
                    <div className="rc-carousel-wrapper" ref={containerRef}>
                        <button
                            className="rc-carousel-btn rc-prev"
                            onClick={handlePrev}
                            disabled={slideIndex === 0}
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <div className="rc-carousel-container">
                            <div className="rc-carousel-track" ref={trackRef}>
                                {ships.map((ship, index) => (
                                    <div
                                        key={index}
                                        className="rc-carousel-card"
                                    // onClick={() => window.open(ship.url, '_blank')}
                                    >
                                        <img src={ship.image} alt={ship.title} className="rc-card-image" />
                                        <div className="rc-card-overlay">
                                            <h3 className="rc-card-title">{ship.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="rc-carousel-btn rc-next"
                            onClick={handleNext}
                            disabled={slideIndex >= maxIndex}
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>

                    {/* TEXTO */}
                    <div className="rc-content">
                        <h1 className="rc-title">EXPLORE NOSSOS DESTINOS</h1>
                        <p className="rc-description">
                            Desfrute de cruzeiros para 2027–2028, em itinerários ao redor do globo. Aproveite as praias do Caribe, a história da Europa ou as belas paisagens do Alasca. Pensamos em tudo para proporcionar viagens mais profundas e uma imersão no destino. Com estadias prolongadas e itinerários personalizados, descubra o mundo além do convencional.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinyCruiseSection;