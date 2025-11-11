

import { useLocation } from 'react-router-dom';

import './search.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { useCruiseOffers } from './../../hooks/useCruiseOffers';
import ResultItems from '../../components/ResultPage/ResultItems/index';
import ResultFilter from '../../components/ResultPage/ResultFilter/index';
import { useCruiseFilters } from './../../hooks/useCruiseFilter';
import CruiseFormV2 from '../../components/Motorv2';

export default function CruiseBooking({ customClass = "" }) {

    const { allOffers, loading, error } = useCruiseOffers();
    const { state } = useLocation();
    const filter = state?.searchData;

    
  const {
    filters,
    setFilters,
    displayedOffers,
    seeMore,
    hasMore,
    sortedOffers,
  } = useCruiseFilters(allOffers, filter);

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
                        <CruiseFormV2 />
                    </div>

                    {/* Filtros */}
                    <div className="filter-container">
                        <ResultFilter filters={filters} setFilters={setFilters} />
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
                            <ResultItems index={index} key={offer.code} offer={offer}/>
                        ))
                    )}

                    {hasMore && (
                        <div className="see-more-container">
                            <button className="see-more-button" onClick={seeMore}>
                                Ver Mais Ofertas
                            </button>
                        </div>
                    )}
                </div>
                <Footer />
            </main>
        </>
    );
}