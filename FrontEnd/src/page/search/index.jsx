import { useState, useEffect } from 'react';
import { Ship, Anchor, Calendar, Users, MapPin } from 'lucide-react';
import './search.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { getCruises } from '../../services/getCruises';

export default function CruiseBooking() {


    const [cruises, setCruises] = useState([]);
    const [filters, setFilters] = useState({
        destination: 'Todos os Destinos',
        port: 'Todos os Portos',
        dateRange: 'Jan 2026 - Jan 2026',
        ships: 'Todos os Navios',
        guests: '2',
        sortBy: 'Menor Preço'
    });


    useEffect(() => {
        getCruises().then(setCruises);
    }, []);


    console.log(cruises);



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
                                <Anchor className="filter-icon" />
                                <div className="filter-content">
                                    <div className="filter-label">Portos</div>
                                    <div className="filter-value">{filters.port}</div>
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
                                    <div className="filter-value">{filters.ships}</div>
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
                    </div>

                    {cruises.map((cruise, index) => (
                        <div className="cruise-card" key={index}>
                            <div className="cruise-grid">
                                <div className="cruise-image-container">
                                    <img
                                        src={cruise.ImageBackground}
                                        alt="Destino do Cruzeiro"
                                        className="cruise-image"
                                    />
                                </div>

                                <div className="cruise-info">
                                    <div className="cruise-content">
                                        <div className="cruise-details">
                                            <h2 className="cruise-title">{cruise.ProductName}</h2>

                                            <div className="cruise-metadata">
                                                <div className="metadata-item">
                                                    <span className="metadata-label">Partindo De:</span>
                                                    <span className="metadata-value">{cruise.EmbarkPortName}</span>
                                                </div>
                                                <div className="metadata-item">
                                                    <span className="metadata-label">A bordo do:</span>
                                                    <span className="metadata-value">Azamara {cruise.ShipName}</span>
                                                </div>
                                            </div>

                                            <div className="itinerary-box">
                                                <div className="itinerary-content">
                                                    <MapPin className="itinerary-icon" />
                                                    <div>
                                                        <div className="itinerary-title">Itinerário</div>
                                                        <div className="itinerary-text">
                                                            {cruise.ItineraryPortNames}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="explore-button">
                                                Explore este itinerário
                                            </button>
                                        </div>

                                        <div className="price-section">
                                            <div className="price-label">A partir de*</div>
                                            <div className="price-value">
                                                R$ {cruise.TotalCruiseFare.toLocaleString('pt-BR')}
                                            </div>
                                            <div className="price-description">Tarifa p/ Hóspede</div>
                                            <div className="price-installments">em até 10x s/ juros</div>

                                            <button className="booking-button">Solicitar Orçamento</button>

                                            <div className="booking-details">
                                                <div className="booking-date">
                                                    Data de Embarque{" "}
                                                    {new Date(cruise.EmbarkDate).toLocaleDateString("pt-BR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                                <div className="booking-duration">
                                                    Duração: {cruise.Duration} noites
                                                </div>
                                                <div className="booking-taxes">
                                                    *+ Impostos, taxas e despesas portuárias
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
                <Footer />
            </main>
        </>

    );
}