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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

export { formatDate, formatCurrency };