import axios from 'axios';

const Pokedex_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const Species_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const fetchPokedex = async () => {
    try {
        const pokedexResponse = await axios.get(Pokedex_URL);
        return pokedexResponse.data;
    } catch (error) {
        console.log('Error fetching pokedex data:', error);
        return [];
    }
};

export const fetchAllSpeciesData = async () => {
    try {
        const allSpeciesData = await Promise.all(
            Array.from({ length: 1008 }, (_, index) => axios.get(`${Species_URL}${index + 1}`))
        );
        return allSpeciesData.map((item) => item.data);
    } catch (error) {
        console.log('Error fetching all species data:', error);
        return [];
    }
};