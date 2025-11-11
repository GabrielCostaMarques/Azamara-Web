import { useState, useMemo } from 'react';
import { Ship, Calendar, Users, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CruiseForm from '../../components/Motor/index'

import './search.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { useCruiseOffers } from './../../hooks/useCruiseOffers';
import ResultItems from '../../components/ResultPage/ResultItems/index';

export default function CruiseBooking({ customClass = "" }) {

    const { allOffers, loading, error } = useCruiseOffers();
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
                    <div className={`motor-result ${customClass}`}>
                        <CruiseForm />

                    </div>
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
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1px', color: '#666' }}>
                        Mostrando {displayedOffers.length} de {sortedOffers.length} ofertas
                    </div>

                    {displayedOffers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h3>Nenhuma oferta encontrada com os filtros selecionados</h3>
                            <p>Tente ajustar os filtros para ver mais resultados</p>
                        </div>
                    ) : (
                        displayedOffers.map((offer, index) => (
                            <ResultItems index={index} key={offer} offer={offer}/>
                        ))
                    )}

                    {hasMore && (
                        <div className="see-more-container">
                            <button className="see-more-button" onClick={seeMore}>
                                Ver Mais Ofertas ({sortedOffers.length - displayCount} restantes)
                            </button>
                        </div>
                    )}
                </div>
                <Footer />
            </main>
        </>
    );
}