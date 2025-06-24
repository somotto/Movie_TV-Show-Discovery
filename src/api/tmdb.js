import createApiClient from "./apiClient"
import { apiCache } from "./cache"
import { API_CONFIG } from "../utils/constants"

const tmdbClient = createApiClient(API_CONFIG.TMDB.BASE_URL, {
    api_key: API_CONFIG.TMDB.API_KEY,
})

const makeRequest = async (endpoint, params = {}) => {
    const cacheKey = `tmdb_${endpoint}_${JSON.stringify(params)}`
    const cachedData = apiCache.get(cacheKey)

    if (cachedData) {
        return cachedData
    }

    try {
        const response = await tmdbClient.get(endpoint, { params })
        apiCache.set(cacheKey, response.data)
        return response.data
    } catch (error) {
        if (error.response?.data?.status_message) {
            throw new Error(`TMDB API Error: ${error.response.data.status_message}`)
        }
        throw new Error(`TMDB API Error: ${error.message}`)
    }
}

export const tmdbApi = {
    // Search
    searchMulti: (query, page = 1) => makeRequest("/search/multi", { query, page }),
    searchMovies: (query, page = 1) => makeRequest("/search/movie", { query, page }),
    searchTV: (query, page = 1) => makeRequest("/search/tv", { query, page }),

    // Trending
    getTrending: (mediaType = "all", timeWindow = "day") => makeRequest(`/trending/${mediaType}/${timeWindow}`),

    // Movies
    getPopularMovies: (page = 1) => makeRequest("/movie/popular", { page }),
    getTopRatedMovies: (page = 1) => makeRequest("/movie/top_rated", { page }),
    getNowPlayingMovies: (page = 1) => makeRequest("/movie/now_playing", { page }),
    getUpcomingMovies: (page = 1) => makeRequest("/movie/upcoming", { page }),
    getMovieDetails: (movieId) => makeRequest(`/movie/${movieId}`, { append_to_response: "credits,videos,similar" }),

    // TV Shows
    getPopularTV: (page = 1) => makeRequest("/tv/popular", { page }),
    getTopRatedTV: (page = 1) => makeRequest("/tv/top_rated", { page }),
    getOnTheAirTV: (page = 1) => makeRequest("/tv/on_the_air", { page }),
    getTVDetails: (tvId) => makeRequest(`/tv/${tvId}`, { append_to_response: "credits,videos,similar" }),

    // Genres
    getMovieGenres: () => makeRequest("/genre/movie/list"),
    getTVGenres: () => makeRequest("/genre/tv/list"),

    // Discover
    discoverMovies: (params = {}) => makeRequest("/discover/movie", params),
    discoverTV: (params = {}) => makeRequest("/discover/tv", params),
}