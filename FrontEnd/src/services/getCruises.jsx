
export async function getCruises() {
    const result = await fetch('/public/ofertasAzamara.json');
    const data = await result.json();
    return data
}

