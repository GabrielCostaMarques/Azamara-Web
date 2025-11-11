import Navbar from "../../components/navbar";
import "./Home.css";
import CruiseOffersSection from "../../components/promocoes"
import EuropeOffers from "../../components/promocoes/EuropeOffer/EuropeOffers";
import AzamaraSection from "../../components/infos";
import RoyalCruiseSection from "../../components/CruiseCarousel"
import DestinyCruiseSection from "../../components/DestinyCarousel"
import Footer from "../../components/Footer"
import StickyFooter from "../../components/StickyFooter"

import bannerDesk from "../../assets/Banners/banner-Desktop-azamara.webp";
import bannerMobile from "../../assets/Banners/banner-Mobile-azamara.webp";
import CruiseFormV2 from "../../components/Motorv2";

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

      <div className="CruiserCarousel">
        <RoyalCruiseSection />
      </div>

      <section>
        <EuropeOffers />
      </section>

      <div className="DestintCarousel">
        <DestinyCruiseSection />
      </div>

      <div className="infos">
        <AzamaraSection />
      </div>

      <Footer />
      <StickyFooter />
    </>
  );
}
