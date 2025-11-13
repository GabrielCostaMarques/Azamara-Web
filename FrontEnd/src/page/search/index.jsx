

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import './search.css';

import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { useCruiseOffers } from './../../hooks/useCruiseOffers';
import ResultItems from '../../components/ResultPage/ResultItems/index';
import ResultFilter from '../../components/ResultPage/ResultFilter/index';
import { useCruiseFilters } from './../../hooks/useCruiseFilter';
import CruiseFormV2 from '../../components/Motorv2';
import PromoBanner from '../../components/ResultPage/PromoBanner';

export default function CruiseBooking({ customClass = "" }) {

    const { allOffers, loading, error } = useCruiseOffers();
    const location = useLocation();
    const filter = location.state?.searchData;

    useEffect(() => {
    if (loading==false) {

      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location,loading]);


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

                    <PromoBanner
                        title="Promoção Novo Horizonte"
                        subtitle1="+ Até R$ 500 de crédito a bordo*"
                        subtitle2=""
                        endDate="2025-12-08T23:59:59"
                    />

                    {/* Filtros */}

                    <div style={{ textAlign: 'center', marginTop: '1px', color: '#666' }}>
                        Mostrando {displayedOffers.length} de {sortedOffers.length} ofertas
                    </div>


                    <div className="filter-container">
                        <h3>Resultado de sua pesquisa</h3>
                        <div id="result"></div>
                        <ResultFilter filters={filters} setFilters={setFilters} />
                    </div>


                    {displayedOffers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h3>Nenhuma oferta encontrada com os filtros selecionados</h3>
                            <p>Tente ajustar os filtros para ver mais resultados</p>
                        </div>
                    ) : (
                        displayedOffers.map((offer, index) => (
                            <ResultItems index={index} key={offer.code} offer={offer} />
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