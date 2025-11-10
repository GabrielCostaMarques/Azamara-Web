import { useState } from "react";
import { MapPin, Anchor, Calendar, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./motor.css";

export default function CruiseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destino: "",
    navio: "",
    dataFim: null,
    dataInicio: null,
  });

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

    navigate('/resultSearch', { state: { searchData: obj } });
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
                <option value="CARIBBEAN">Caribbean</option>
                <option value="EUROPE">Europa</option>
                <option value="ALASKA">Alaska</option>
                <option value="MEDITERRANEAN">Mediterranean</option>
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
                <option value="PURSUIT">Azamara Pursuit</option>
                <option value="JOURNEY">Azamara Journey</option>
                <option value="ONWARD">Azamara Onward</option>
                <option value="QUEST">Azamara Quest</option>
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