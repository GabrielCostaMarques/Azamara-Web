import { useState, useMemo } from 'react';
import { Ship, Calendar, Users, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ItineraryPopup from '../../components/Promocoes/funcionalidades/ItineraryPopup';
import SidebarForm from '../../components/Promocoes/funcionalidades/Sidebarform';
import './search.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { useCruiseOffers } from './../../hooks/useCruiseOffers';

export default function CruiseBooking() {

    const { allOffers, loading, error } = useCruiseOffers();
    
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [displayCount, setDisplayCount] = useState(6);

    const { state } = useLocation();
    const filter = state?.searchData;

    const [filters, setFilters] = useState({
        destination: filter?.destino || 'Todos os Destinos',
        dateRange: filter?.dataInicio && filter?.dataFim 
            ? `${new Date(filter.dataInicio).toLocaleDateString('pt-BR')} - ${new Date(filter.dataFim).toLocaleDateString('pt-BR')}` 
            : 'Qualquer Data',
        ships: filter?.navio || 'Todos os Navios',
        guests: '2',
        sortBy: 'Menor Preço'
    });

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

    const filteredOffers = useMemo(() => {
        return allOffers.filter((offer) => {
            const offerDestination = offer.category?.toUpperCase();
            const offerShip = offer.ship?.toUpperCase();
            const filterDestination = filters.destination?.toUpperCase();
            const filterShip = filters.ships?.toUpperCase();

            // DESTINO
            const matchesDestination =
                filters.destination === 'Todos os Destinos' ||
                offerDestination?.includes(filterDestination);

            // NAVIO
            const matchesShip =
                filters.ships === 'Todos os Navios' ||
                offerShip?.includes(filterShip);

            // DATAS
            let matchesDate = true;
            if (filters.dateRange && filters.dateRange !== 'Qualquer Data' && filters.dateRange.includes('-')) {
                const [startStr, endStr] = filters.dateRange.split('-').map((d) => d.trim());
                const [startDay, startMonth, startYear] = startStr.split('/');
                const [endDay, endMonth, endYear] = endStr.split('/');
                const start = new Date(`${startYear}-${startMonth}-${startDay}`);
                const end = new Date(`${endYear}-${endMonth}-${endDay}`);
                const embark = new Date(offer.departureRaw || offer.EmbarkDate);
                matchesDate = embark >= start && embark <= end;
            }

            return matchesDestination && matchesShip && matchesDate;
        });
    }, [allOffers, filters]);

    const sortedOffers = useMemo(() => {
        const sorted = [...filteredOffers];

        switch (filters.sortBy) {
            case 'Menor Preço':
                return sorted.sort((a, b) => a.priceValue - b.priceValue);
            case 'Maior Preço':
                return sorted.sort((a, b) => b.priceValue - a.priceValue);
            case 'Duração':
                return sorted.sort((a, b) => b.nights - a.nights);
            case 'Data de Partida':
                return sorted.sort((a, b) => new Date(a.departureRaw) - new Date(b.departureRaw));
            default:
                return sorted;
        }
    }, [filteredOffers, filters.sortBy]);


    const displayedOffers = useMemo(() => {
        return sortedOffers.slice(0, displayCount);
    }, [sortedOffers, displayCount]);

    const hasMore = displayCount < sortedOffers.length;

    const seeMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    if (loading) {
        return (
            <>
                <main className='search-main'>
                    <Navbar customClass="navbar-cruise" />
                    <div className="cruise-container">
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            Carregando ofertas...
                        </div>
                    </div>
                    <Footer />
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <main className='search-main'>
                    <Navbar customClass="navbar-cruise" />
                    <div className="cruise-container">
                        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                            {error}
                        </div>
                    </div>
                    <Footer />
                </main>
            </>
        );
    }

    return (
        <>
            <main className='search-main'>
                <Navbar customClass="navbar-cruise" />
                <div className="cruise-container">
                    {/* Filtros */}
                    <div className="filters-card">
                        <div className="filters-grid">
                            <div className="filter-item">
                                <MapPin className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Destinos</div>
                                    <div className="filter-value">{filters.destination}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Calendar className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Data</div>
                                    <div className="filter-value">{filters.dateRange}</div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Ship className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Navios</div>
                                    <div className="filter-value">
                                        {filters.ships === 'Todos os Navios' ? 'Todos os Navios' : `Azamara ${filters.ships}`}
                                    </div>
                                </div>
                            </div>

                            <div className="filter-item">
                                <Users className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Hóspedes</div>
                                    <div className="filter-value">{filters.guests}</div>
                                </div>
                            </div>
                        </div>

                        <div className="sort-section">
                            <label className="sort-label">ORDENAR POR:</label>
                            <select
                                className="sort-select"
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            >
                                <option>Menor Preço</option>
                                <option>Maior Preço</option>
                                <option>Duração</option>
                                <option>Data de Partida</option>
                            </select>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
                            Mostrando {displayedOffers.length} de {sortedOffers.length} ofertas
                        </div>
                    </div>

                    {displayedOffers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h3>Nenhuma oferta encontrada com os filtros selecionados</h3>
                            <p>Tente ajustar os filtros para ver mais resultados</p>
                        </div>
                    ) : (
                        displayedOffers.map((offer, index) => (
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
                            </div>
                        ))
                    )}

                    {hasMore && (
                        <div className="see-more-container">
                            <button className="see-more-button" onClick={seeMore}>
                                Ver Mais Ofertas ({sortedOffers.length - displayCount} restantes)
                            </button>
                        </div>
                    )}

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
                <Footer />
            </main>
        </>
    );
}