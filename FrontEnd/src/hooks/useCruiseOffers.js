import { useState, useEffect } from "react";
import { getCruises } from "../services/getCruises";

export function useCruiseOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase())
      .replace(/\.$/, "");
  };

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await getCruises();

        const now = new Date();
        const valid = data
          .filter((o) => o.Available === "OK" && new Date(o.EmbarkDate) > now)
          .sort((a, b) => a.TotalCruiseFare - b.TotalCruiseFare)
          .slice(0, 6);

        const mapped = valid.map((o) => ({
          id: o.ProductId,
          image: o.ImageBackground,
          category: o.Destination.toUpperCase(),
          title: o.ProductName,
          departure: formatDate(o.EmbarkDate),
          ship: o.ShipName,
          price: `R$ ${formatCurrency(o.TotalCruiseFare)}`,
          priceX: `R$ ${formatCurrency(o.TotalCruiseFare / 10)}`,
          installments: "Em 10x de",
          discount: "SEM ENTRADA",
          taxes: "Sem entrada e em até 10x sem juros",
          ports: o.ItineraryPortNames,
          itinerary: o.Itinerary,
        }));

        setOffers(mapped);
      } catch (err) {
        console.error("Erro ao carregar ofertas:", err);
        setError("Não foi possível carregar as ofertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
}
