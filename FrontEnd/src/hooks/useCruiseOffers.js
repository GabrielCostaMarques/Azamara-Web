import { useState, useEffect } from "react";
import { getCruises } from "../services/getCruises";
import { formatCurrency, formatDate } from '../utils/FormarterFields';

export function useCruiseOffers() {
  const [allOffers, setAllOffers] = useState([]); // Todos os dados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await getCruises();

        console.log(data);

        const now = new Date();
        const valid = data
          .filter((o) => o.Available === "OK" && new Date(o.EmbarkDate) > now)
          .sort((a, b) => a.TotalCruiseFare - b.TotalCruiseFare);

        const mapped = valid.map((o) => ({
          id: o.ProductId,
          code: o.ProductId,
          image: o.ImageBackground,
          category: o.Destination.toUpperCase(),
          title: o.ProductName,
          departure: formatDate(o.EmbarkDate),
          departureRaw: o.EmbarkDate, // Mantém data raw para filtros
          ship: o.ShipName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
          EmbarkPortName: o.EmbarkPortName.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A",
          EmbarkDate: o.EmbarkDate.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
          price: `R$ ${formatCurrency(o.TotalCruiseFare)}`,
          priceValue: o.TotalCruiseFare, // Para ordenação
          priceX: `R$ ${formatCurrency(o.TotalCruiseFare / 10)}`,
          installments: "Em 10x de",
          discount: "SEM ENTRADA",
          taxes: "Sem entrada e em até 10x sem juros",
          ports: o.ItineraryPortNames,
          itinerary: o.Itinerary,
          nights: o.Duration
        }));

        setAllOffers(mapped);
      } catch (err) {
        console.error("Erro ao carregar ofertas:", err);
        setError("Não foi possível carregar as ofertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { allOffers, loading, error };
}