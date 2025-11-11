import { Ship, Calendar, Users, MapPin } from 'lucide-react';
import './resultFilter.css';
export default function ResultFilter({ filters, setFilters }) {
    return (
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
    )
}