import Navbar from "../../components/navbar";
import CruiseOffersSection from "../../components/promocoes"
import EuropeOffers from "../../components/promocoes/EuropeOffer/EuropeOffers";
import AzamaraSection from "../../components/infos";
import AzamaraCruiseSection from "../../components/CruiseCarousel"
import DestinyCruiseSection from "../../components/DestinyCarousel"
import Footer from "../../components/Footer"
import StickyFooter from "../../components/StickyFooter"
import AlwaysInclude from "../../components/AlwaysInclude";
import bannerDesk from "../../assets/Banners/Banner Azamara Desktop_1600x850.jpg";
import bannerMobile from "../../assets/Banners/banner-mobile-azamara-promo.webp";
import CruiseFormV2 from "../../components/Motorv2";
import PromoBanner from "../../components/ResultPage/PromoBanner";
import "./home.css";


export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <picture className="banners">
          <source media="(max-width: 768px)" srcSet={bannerMobile} />
          <img src={bannerDesk} alt="Banner principal" />
        </picture>

        <div className="hero-content">
          {/* <h1>Cruzeiros Azamara Cruises</h1>
          <p>Viaje além do itinerário. Viva o destino.</p> */}
          <PromoBanner
            title={
              <>
                ATÉ U$1000<br />DE CRÉDITO A BORDO*
              </>
            }
            subtitle1="Aproveite a oferta de crédito a bordo em saídas selecionadas"
            subtitle2=""
            endDate="2025-03-31T01:59:59"
            customClass="home"
          />
        </div>
        <CruiseFormV2 />
      </section>

      <section>
        <CruiseOffersSection />
      </section>

      <section className="CruiserCarousel">
        <AzamaraCruiseSection />
      </section>

      <section>
        <EuropeOffers />
      </section>

      <section className="DestintCarousel">
        <DestinyCruiseSection />
      </section>

      <section className="infos">
        <AzamaraSection />
      </section>

      <section>
        <AlwaysInclude />
      </section>

      <Footer />
      <StickyFooter />
    </>
  );
}
