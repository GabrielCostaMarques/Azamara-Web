import { useState, useMemo } from "react";

export function useCruiseFilters(allOffers = [], initialFilter = {}) {
  const MAX_DISPLAY = 10;
  const GET_MORE = 10;

  // Estado inicial de filtros
  const [filters, setFilters] = useState({
    destination: initialFilter?.destino || "Todos os Destinos",
    dateRange:
      initialFilter?.dataInicio && initialFilter?.dataFim
        ? `${new Date(initialFilter.dataInicio).toLocaleDateString("pt-BR")} - ${new Date(initialFilter.dataFim).toLocaleDateString("pt-BR")}`
        : "Qualquer Data",
    ships: initialFilter?.navio || "Todos os Navios",
    guests: "2",
    sortBy: "Menor Preço",
  });

  const [displayCount, setDisplayCount] = useState(MAX_DISPLAY);

  // Filtragem
  const filteredOffers = useMemo(() => {
    return allOffers.filter((offer) => {
      const offerDestination = offer.category?.toUpperCase();
      const offerShip = offer.ship?.toUpperCase();
      const filterDestination = filters.destination?.toUpperCase();
      const filterShip = filters.ships?.toUpperCase();

      // DESTINO
      const matchesDestination =
        filters.destination === "Todos os Destinos" ||
        offerDestination?.includes(filterDestination);

      // NAVIO
      const matchesShip =
        filters.ships === "Todos os Navios" ||
        offerShip?.includes(filterShip);

      // DATAS
      let matchesDate = true;
      if (
        filters.dateRange &&
        filters.dateRange !== "Qualquer Data" &&
        filters.dateRange.includes("-")
      ) {
        const [startStr, endStr] = filters.dateRange
          .split("-")
          .map((d) => d.trim());
        const [startDay, startMonth, startYear] = startStr.split("/");
        const [endDay, endMonth, endYear] = endStr.split("/");
        const start = new Date(`${startYear}-${startMonth}-${startDay}`);
        const end = new Date(`${endYear}-${endMonth}-${endDay}`);
        const embark = new Date(offer.departureRaw || offer.EmbarkDate);
        matchesDate = embark >= start && embark <= end;
      }

      return matchesDestination && matchesShip && matchesDate;
    });
  }, [allOffers, filters]);

  // Ordenação
  const sortedOffers = useMemo(() => {
    const sorted = [...filteredOffers];
    switch (filters.sortBy) {
      case "Menor Preço":
        return sorted.sort((a, b) => a.priceValue - b.priceValue);
      case "Maior Preço":
        return sorted.sort((a, b) => b.priceValue - a.priceValue);
      case "Duração":
        return sorted.sort((a, b) => b.nights - a.nights);
      case "Data de Partida":
        return sorted.sort(
          (a, b) => new Date(a.departureRaw) - new Date(b.departureRaw)
        );
      default:
        return sorted;
    }
  }, [filteredOffers, filters.sortBy]);

  // Paginação
  const displayedOffers = useMemo(() => {
    return sortedOffers.slice(0, displayCount);
  }, [sortedOffers, displayCount]);

  const hasMore = displayCount < sortedOffers.length;

  const seeMore = () => setDisplayCount((prev) => prev + GET_MORE);

  return {
    filters,
    setFilters,
    displayedOffers,
    seeMore,
    hasMore,
    sortedOffers,
  };
}
