import { useState, useEffect, useRef } from "react";
import { MapPin, Anchor, Calendar, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./motor.css";
import { useCruiseOffers } from "./../../hooks/useCruiseOffers";

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
  const [openUpDestino, setOpenUpDestino] = useState(false);
  const [openUpNavio, setOpenUpNavio] = useState(false);
  const [openSpanClear, setOpenSpanClear] = useState(false);

  const destinoRef = useRef(null);
  const navioRef = useRef(null);

  const { allOffers, loading } = useCruiseOffers();

  const navigate = useNavigate();
  const location = useLocation();

  const minDate = new Date();
  const maxDate = new Date("2028-12-31");

  useEffect(() => {
    if (allOffers && allOffers.length > 0) {
      const uniqueDestinos = [...new Set(allOffers.map((offer) => offer.category))];
      const uniqueNavios = [...new Set(allOffers.map((offer) => offer.ship))];
      setDestinos(uniqueDestinos);
      setNavios(uniqueNavios);
    }
  }, [allOffers]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectDestino = (destino) => {
    setSelectedDestino(destino);
    handleChange("destino", destino);
    setIsOpenDestino(false);
  };

  const handleSelectNavio = (navio) => {
    setSelectedNavio(navio);
    handleChange("navio", navio);
    setIsOpenNavio(false);
  };

  const handleToggleDestino = () => {
    if (destinoRef.current) {
      const rect = destinoRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpDestino(spaceBelow < 500 && spaceAbove > spaceBelow);
    }
    setIsOpenDestino((prev) => !prev);
    setIsOpenNavio(false);
  };

  const handleToggleNavio = () => {
    if (navioRef.current) {
      const rect = navioRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpNavio(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
    setIsOpenNavio((prev) => !prev);
    setIsOpenDestino(false);
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

    navigate("/resultSearch#result", { state: { searchData: obj } });
  };


  const handleDateChange = ([start, end]) => {
    if (start && end && start.getTime() === end.getTime()) {
      // Usuário clicou duas vezes no mesmo mês → selecionar o mês inteiro
      const firstDay = new Date(start.getFullYear(), start.getMonth(), 1);
      const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0);

      setFormData((prev) => ({
        ...prev,
        dataInicio: firstDay,
        dataFim: lastDay,
      }));
    } else {
      // Seleção normal
      setFormData((prev) => ({
        ...prev,
        dataInicio: start,
        dataFim: end,
      }));
    }
  }

  useEffect(() => {
    if (selectedNavio || selectedDestino || formData.dataInicio || formData.dataFim) {
      setOpenSpanClear(true);
    } else {
      setOpenSpanClear(false);
    }
  }, [selectedNavio, selectedDestino, formData.dataInicio, formData.dataFim]);


  const handleClearFields = () => {
    setSelectedDestino(null);
    setSelectedNavio(null);
    setFormData({
      destino: "",
      navio: "",
      dataFim: null,
      dataInicio: null,
    });
    setOpenSpanClear(false);
  };


  return (
    <div className="motor-wrapper">
      <div className="motor">
        {/* DESTINO */}
        <div className="motor-item" ref={destinoRef}>
          <MapPin className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">VIAJANDO PARA</label>
            <div className={`custom-select ${isOpenDestino ? "open" : ""}`}>
              <button
                type="button"
                className="select-trigger"
                onClick={handleToggleDestino}
              >
                <span>{selectedDestino || "Qualquer Destino"}</span>
                <ChevronDown className="select-arrow" />
              </button>

              {isOpenDestino && (
                <ul className={`select-options ${openUpDestino ? "open-up" : ""}`}>
                  {loading ? (
                    <li>Carregando...</li>
                  ) : (
                    <>
                      <li onClick={() => handleSelectDestino("")}>Todos os Destinos</li>
                      {destinos.map((dest) => (
                        <li key={dest} onClick={() => handleSelectDestino(dest)}>
                          {dest
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
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
        <div className="motor-item" ref={navioRef}>
          <Anchor className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">NAVIO</label>
            <div className={`custom-select ${isOpenNavio ? "open" : ""}`}>
              <button
                type="button"
                className="select-trigger"
                onClick={handleToggleNavio}
              >
                <span>{selectedNavio || "Qualquer Navio"}</span>
                <ChevronDown className="select-arrow" />
              </button>

              {isOpenNavio && (
                <ul className={`select-options ${openUpNavio ? "open-up" : ""}`}>
                  {loading ? (
                    <li>Carregando...</li>
                  ) : (
                    <>
                      <li onClick={() => handleSelectNavio("")}>Todos os Navios</li>
                      {navios.map((navio) => (
                        <li key={navio} onClick={() => handleSelectNavio(navio)}>
                          Azamara{" "}
                          {navio
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
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
                onChange={handleDateChange}
                onInputClick={() => {
                  setIsOpenDestino(false);
                  setIsOpenNavio(false);
                }}
                dateFormat="MM/yyyy"
                placeholderText="mm/aaaa - mm/aaaa"
                className="motor-datepicker"
                calendarClassName="custom-calendar"
                popperClassName="custom-datepicker-popper"
                showMonthYearPicker
                minDate={minDate}
                maxDate={maxDate}
                disabledKeyboardNavigation
              />
            </div>
          </div>
        </div>

        <button className="motor-button" onClick={handleSubmit}>
          Ver Saídas
        </button>
      </div>
      {openSpanClear && (
        <button onClick={handleClearFields} className="clear-dates-span">Limpar</button>
      )}
    </div>
  );
}
