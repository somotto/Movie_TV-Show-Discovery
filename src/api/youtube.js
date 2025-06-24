import createApiClient from "./apiClient"
import { apiCache } from "./cache"
import { API_CONFIG } from "../utils/constants"

const youtubeClient = createApiClient(API_CONFIG.YOUTUBE.BASE_URL, {
    key: API_CONFIG.YOUTUBE.API_KEY,
})

const makeRequest = async (endpoint, params = {}) => {
    const cacheKey = `youtube_${endpoint}_${JSON.stringify(params)}`
    const cachedData = apiCache.get(cacheKey)

    if (cachedData) {
        return cachedData
    }

    try {
        const response = await youtubeClient.get(endpoint, { params })
        apiCache.set(cacheKey, response.data)
        return response.data
    } catch (error) {
        if (error.response?.data?.error?.message) {
            throw new Error(`YouTube API Error: ${error.response.data.error.message}`)
        }
        throw new Error(`YouTube API Error: ${error.message}`)
    }
}

export const youtubeApi = {
    // Search for videos
    searchVideos: (query, maxResults = 5) =>
        makeRequest("/search", {
            q: query,
            part: "snippet",
            type: "video",
            maxResults,
            order: "relevance",
        }),

    // Get video details
    getVideoDetails: (videoId) =>
        makeRequest("/videos", {
            id: videoId,
            part: "snippet,statistics,contentDetails",
        }),

    // Search for movie/TV show trailers specifically
    searchTrailers: (title, year, type = "movie", maxResults = 3) => {
        const searchQuery = `${title} ${year ? year : ""} ${type === "movie" ? "movie" : "TV show"} official trailer`
        return makeRequest("/search", {
            q: searchQuery,
            part: "snippet",
            type: "video",
            maxResults,
            order: "relevance",
            videoDuration: "medium", // Filter out very short videos
        })
    },
}