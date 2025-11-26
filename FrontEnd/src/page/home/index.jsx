import Navbar from "../../components/navbar";
import CruiseOffersSection from "../../components/promocoes"
import EuropeOffers from "../../components/promocoes/EuropeOffer/EuropeOffers";
import AzamaraSection from "../../components/infos";
import AzamaraCruiseSection from "../../components/CruiseCarousel"
import DestinyCruiseSection from "../../components/DestinyCarousel"
import Footer from "../../components/Footer"
import StickyFooter from "../../components/StickyFooter"
import AlwaysInclude from "../../components/AlwaysInclude";
import bannerDesk from "../../assets/Banners/banner-Desktop-azamara.webp";
import bannerMobile from "../../assets/Banners/banner-Mobile-azamara.webp";
import CruiseFormV2 from "../../components/Motorv2";
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
          <h1>Cruzeiros Azamara Cruises</h1>
          <p>Viaje além do itinerário. Viva o destino.</p>
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
