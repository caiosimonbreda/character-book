import axios from 'axios'

export async function getAllCharacters(filter) {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${filter}`);
    return response.data;
}

export async function fetchFromUrl(url) {
    const response = await axios.get(url)
    return response.data;
}

export async function getEpisodeNames(episodes) {
    const episodeIds = episodes.map((episode) => episode.replace("https://rickandmortyapi.com/api/episode/", ""))
    let response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds.toString()}`)
    const results = Array.isArray(response.data) ? response.data : [response.data]
    return results.map((episode) => episode.name)
}