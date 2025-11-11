import React, { useState } from "react";
import { MapPin } from 'lucide-react';
import ItineraryPopup from '../../Promocoes/funcionalidades/ItineraryPopup';
import SidebarForm from '../../Promocoes/funcionalidades/Sidebarform';

export default function ResultItems({offer, index}) {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

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
    return (
        <div className="cruise-card" key={`${offer.code}-${index}`}>
            <div className="cruise-grid">
                <div className="cruise-image-container">
                    <img
                        src={offer.image}
                        alt="Destino do Cruzeiro"
                        className="cruise-image"
                    />
                </div>

                <div className="cruise-info">
                    <div className="cruise-content">
                        <div className="cruise-details">
                            <h2 className="cruise-title">{offer.title}</h2>

                            <div className="cruise-metadata">
                                <div className="metadata-item">
                                    <span className="metadata-label">Partindo De:</span>
                                    <span className="metadata-value">{offer.EmbarkPortName}</span>
                                </div>
                                <div className="metadata-item">
                                    <span className="metadata-label">A bordo do:</span>
                                    <span className="metadata-value">
                                        {offer.ship.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </span>
                                </div>
                            </div>

                            <div className="itinerary-box">
                                <div className="itinerary-content">
                                    <MapPin className="itinerary-icon" />
                                    <div>
                                        <div className="itinerary-title">Itinerário</div>
                                        <div className="itinerary-text">
                                            {offer.ports}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="explore-button" onClick={() => openDetails(offer)}>
                                Explore este itinerário
                            </button>
                        </div>

                        <div className="price-section">
                            <div className="price-label">A partir de*</div>
                            <div className="price-value">
                                {offer.price}
                            </div>
                            <div className="price-description">Tarifa p/ Hóspede</div>
                            <div className="price-installments">{offer.installments}</div>

                            <button className="booking-button" onClick={() => openBudget(offer)}>
                                Solicitar Orçamento
                            </button>

                            <div className="booking-details">
                                <div className="booking-date">
                                    {offer.departure}
                                </div>
                                <div className="booking-duration">
                                    Duração: {offer.nights} noites
                                </div>
                                <div className="booking-taxes">
                                    *Impostos, taxas e despesas portuárias não inclusas
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>

    )


}