import axios from 'axios';

const Pokedex_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const Species_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const fetchPokedex = async () => {
    try {
        const pokedexResponse = await axios.get(Pokedex_URL);
        return pokedexResponse.data;
    } catch (error) {
        console.error('Error fetching pokedex data:', error.message);
        return [];
    }
};

export const fetchAllSpeciesData = async () => {
    try {
        const speciesDataArray = [];
        const batchSize = 20; // 每批請求的數量
        const totalSpecies = 1008; // 總共的數量

        for (let i = 1; i <= totalSpecies; i += batchSize) {
            const requests = Array.from({ length: batchSize }, (_, index) =>
                axios.get(`${Species_URL}${i + index}`)
            );
            const responses = await Promise.all(requests);
            const data = responses.map(response => response.data);
            speciesDataArray.push(...data);
        }

        return speciesDataArray;
    } catch (error) {
        console.error('Error fetching all species data:', error.message);
        return [];
    }
};
