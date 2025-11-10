import { Calendar, Ship, X } from "lucide-react";
import "../promo.css";

export default function ItineraryPopup({ offer, onClose, onBudget }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-contente" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          <X />
        </button>

        <div className="itinerary-title-infos">
          <h3 className="itinerary-title">Itinerário</h3>

          <div className="itinerary-info">
            <p><Calendar size={16} /> {offer.departure}</p>
            <p><Ship size={16} /> Azamara {offer.ship}</p>
          </div>
        </div>

      <div className="itinerary-table-wrapper">
        
        <table className="itinerary-table">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Local</th>
              <th>Data</th>
              <th>Chegada</th>
              <th>Saída</th>
            </tr>
          </thead>

          <tbody>
            {offer.itinerary?.map((item, index) => (
              <tr key={index}>
                <td>{item.DayOfCruise}</td>
                <td>
                  {item.PortName === "AT SEA" ? "Navegando" : item.PortName}
                  {item.OverNightFlag === "Y" && " (Pernoite)"}
                </td>
                <td>{new Date(item.BerthDate).toLocaleDateString("pt-BR")}</td>
                <td>{item.ArrivalTime ? item.ArrivalTime.slice(0, 5) : "-"}</td>
                <td>{item.DepartureTime ? item.DepartureTime.slice(0, 5) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="orcamento-container">
          <button className="orcamento-btn full" onClick={() => onBudget(offer)}>
            SOLICITAR ORÇAMENTO
          </button>
        </div>
      </div>
    </div>
  );
}
