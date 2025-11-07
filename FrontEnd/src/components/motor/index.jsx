import { useState } from "react";
import { MapPin, Anchor, Calendar, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./motor.css";

export default function CruiseForm() {
  const [formData, setFormData] = useState({
    destino: "",
    navio: "",
    data: null,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Orçamento:", formData);
    alert("Buscando saídas...");
  };

  return (
    <div className="motor-wrapper">
      <div className="motor">
        {/* DESTINO */}
        <div className="motor-item">
          <MapPin className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">VIAJANDO PARA</label>
            <div className="custom-select">
              <select
                value={formData.destino}
                onChange={(e) => handleChange("destino", e.target.value)}
              >
                <option value="">Qualquer Destino</option>
                <option value="caribe">Caribe</option>
                <option value="europa">Europa</option>
                <option value="alaska">Alaska</option>
                <option value="bahamas">Bahamas</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
          </div>
        </div>

        {/* NAVIO */}
        <div className="motor-item">
          <Anchor className="motor-icon" />
          <div className="motor-field">
            <label className="motor-label">NAVIO</label>
            <div className="custom-select">
              <select
                value={formData.navio}
                onChange={(e) => handleChange("navio", e.target.value)}
              >
                <option value="">Selecione o seu Navio</option>
                <option value="pursuit">Azamara Pursuit</option>
                <option value="journey">Azamara Journey</option>
                <option value="onward">Azamara Onward</option>
                <option value="quest">Azamara Quest</option>
              </select>
              <ChevronDown className="select-arrow" />
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
                dateFormat="MM/yyyy"
                placeholderText="mm/aaaa - mm/aaaa"
                className="motor-datepicker"
                calendarClassName="custom-calendar"
                popperClassName="custom-datepicker-popper"
                showMonthYearPicker
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