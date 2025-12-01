
export async function getCruises() {
    const result = await fetch('https://manualdoagente.com.br/wp-json/custom/v1/ofertas-azamara');
    const data = await result.json();
    return data
}

