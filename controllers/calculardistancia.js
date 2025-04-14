const axios = require('axios'); 


async function calcularDistancia(origem, destino) {
    const apiKey = '5b3ce3597851110001cf6248f5e9f169cb9b4e76b38a02a31aedd4af';
    const [origemCoord, destinoCoord] = await Promise.all([ 
        getCoordenadas(origem), 
        getCoordenadas(destino)
    ]);

    const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
            api_key: apiKey,
            start: origemCoord,
            end: destinoCoord
        }
    });

    const distanciaMetros = response.data.features[0].properties.segments[0].distance;
    return distanciaMetros / 1000; // transforma em KM
}

async function getCoordenadas(local) {
    const apiKey = '5b3ce3597851110001cf6248f5e9f169cb9b4e76b38a02a31aedd4af'; // mesma chave
    const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: {
            api_key: apiKey,
            text: local
        }
    });

    const coord = response.data.features[0].geometry.coordinates;
    return coord.join(','); // retorna tipo "longitude,latitude"
}

module.exports = { calcularDistancia }; // Exporte a função para uso em outros arquivos
