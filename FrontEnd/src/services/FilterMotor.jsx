export const FilterMotor = (data) =>{
    const destinos = [...new Set(data.map(item => item.Destination))];
    const navios = [...new Set(data.map(item => item.ShipName))];
    const embarkDate = [...new Set(data.map(item => new Date(item.EmbarkDate)))];
    const debarkDate = [...new Set(data.map(item => new Date(item.DebarkDate)))];

    return { destinos, navios, embarkDate, debarkDate };
}