import { useState, useEffect } from "react";
import { MapPin, Anchor, Calendar, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./motor.css";
import { useCruiseOffers } from './../../hooks/useCruiseOffers';

export default function CruiseFormV2() {
  const [formData, setFormData] = useState({
    destino: "",
    navio: "",
    dataFim: null,
    dataInicio: null,
  });

  const [destinos, setDestinos] = useState([]);
  const [navios, setNavios] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [selectedNavio, setSelectedNavio] = useState(null);
  const [isOpenDestino, setIsOpenDestino] = useState(false);
  const [isOpenNavio, setIsOpenNavio] = useState(false);

  const { allOffers, loading } = useCruiseOffers();

  useEffect(() => {
    if (allOffers && allOffers.length > 0) {
      const uniqueDestinos = [...new Set(allOffers.map(offer => offer.category))];
      const uniqueNavios = [...new Set(allOffers.map(offer => offer.ship))];

      setDestinos(uniqueDestinos);
      setNavios(uniqueNavios);
    }
  }, [allOffers]);

  const handleSelectDestino = (destino) => {
    setSelectedDestino(destino);
    handleChange("destino", destino);
    setIsOpenDestino(false);
  }
  const handleSelectNavio = (navio) => {
    setSelectedNavio(navio);
    handleChange("navio", navio);
    setIsOpenNavio(false);
  }


  const navigate = useNavigate();
  const location = useLocation();

  const minDate = new Date();
  const maxDate = new Date("2028-12-31");

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const obj = {
      ...formData,
      dataInicio: formData.dataInicio ? formData.dataInicio.toISOString() : null,
      dataFim: formData.dataFim ? formData.dataFim.toISOString() : null,
      navio: formData.navio || "",
      destino: formData.destino || "",
    };


    if (location.pathname === "/resultSearch") {
      navigate(0);
    }

    navigate("/resultSearch", { state: { searchData: obj } });
  };

  return (
    <div className="motor-wrapper">
      <div className="motor">
        {/* DESTINO */}
        <div className="motor-item">
          <MapPin className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">VIAJANDO PARA</label>

            <div className={`custom-select ${isOpenDestino ? "open" : ""}`}>
              <button
                type="button"
                className="select-trigger"
                onClick={() => { setIsOpenDestino(!isOpenDestino), setIsOpenNavio(false) }}
              >
                <span>{selectedDestino || "Qualquer Destino"}</span>
                <ChevronDown className="select-arrow" />
              </button>

              {isOpenDestino && (
                <ul className="select-options">
                  {loading ? (
                    <li>Carregando...</li>
                  ) : (

                    <>
                      <li onClick={() => handleSelectDestino("")}>Todos os Destinos</li>
                      {destinos.map((dest) => (
                        <li key={dest.id} onClick={() => handleSelectDestino(dest)}>
                          {dest.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        </li>
                      ))}
                    </>

                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* NAVIO */}
        <div className="motor-item">
          <Anchor className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">VIAJANDO PARA</label>

            <div className={`custom-select ${isOpenNavio ? "open" : ""}`}>
              <button
                type="button"
                className="select-trigger"
                onClick={() => { setIsOpenNavio(!isOpenNavio), setIsOpenDestino(false) }}
              >
                <span>{selectedNavio || "Qualquer Navio"}</span>
                <ChevronDown className="select-arrow" />
              </button>

              {isOpenNavio && (
                <ul className="select-options">
                  {loading ? (
                    <li>Carregando...</li>
                  ) : (
                    <>
                      <li onClick={() => handleSelectNavio("")}>Todos os Navios</li>
                      {navios.map((navio) => (
                        <li key={navio.id} onClick={() => handleSelectNavio(navio)}>
                          Azamara {navio.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        </li>
                      ))}
                    </>

                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* DATA */}
        <div className="motor-item">
          <Calendar className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">SAÍDA EM</label>
            <div className="datepicker-wrapper">
              <DatePicker
                selectsRange
                startDate={formData.dataInicio}
                endDate={formData.dataFim}
                onChange={([start, end]) => {
                  setFormData(prev => ({
                    ...prev,
                    dataInicio: start,
                    dataFim: end
                  }));
                }}
                onInputClick={() => { setIsOpenDestino(false); setIsOpenNavio(false) }}
                dateFormat="MM/yyyy"
                placeholderText="mm/aaaa - mm/aaaa"
                className="motor-datepicker"
                calendarClassName="custom-calendar"
                popperClassName="custom-datepicker-popper"
                showMonthYearPicker
                minDate={minDate}
                maxDate={maxDate}

              />
            </div>
          </div>
        </div>

        <button className="motor-button" onClick={handleSubmit}>
          Ver Saídas
        </button>
      </div>
    </div>
  );
}