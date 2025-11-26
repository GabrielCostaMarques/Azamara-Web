import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FitToBounds({ positions }) {
    const map = useMap();
    if (positions.length > 0) map.fitBounds(positions);
    return null;
}

export default function CruiseMap({ itinerary }) {
    if (!itinerary || itinerary.length === 0) return <p>Nenhum itinerário disponível.</p>;

    const positions = itinerary
        .filter((i) => i.Latitude && i.Longitude)
        .map((i) => [i.Latitude, i.Longitude]);

    const center = positions.length > 0 ? positions[0] : [0, 0];

    return (
        <MapContainer
            center={center}
            zoom={5}
            scrollWheelZoom={false}
            style={{
                height: "480px",
                width: "100%",
                borderRadius: "10px",
                marginTop: "1rem",
            }}

        >
            <FitToBounds positions={positions} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline
                positions={positions}
                color="#007bff"
                dashArray="6,8"
                weight={3}
            />

            {itinerary.map((stop, index) => (
                <Marker key={index} position={[stop.Latitude, stop.Longitude]}>
                    <Popup>
                        <strong>{stop.PortName === "AT SEA" ? "Navegando" : stop.PortName}</strong>
                        <br />
                        Dia {stop.DayOfCruise}
                        <br />
                        {new Date(stop.BerthDate).toLocaleDateString("pt-BR")}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
