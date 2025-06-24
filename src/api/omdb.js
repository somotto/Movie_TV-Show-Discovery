import createApiClient from "./apiClient"
import { apiCache } from "./cache"
import { API_CONFIG } from "../utils/constants"

const omdbClient = createApiClient(API_CONFIG.OMDB.BASE_URL, {
  apikey: API_CONFIG.OMDB.API_KEY,
})

const makeRequest = async (params) => {
  const cacheKey = `omdb_${JSON.stringify(params)}`
  const cachedData = apiCache.get(cacheKey)

  if (cachedData) {
    return cachedData
  }

  try {
    const response = await omdbClient.get("", { params })
    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "OMDB API Error")
    }
    apiCache.set(cacheKey, response.data)
    return response.data
  } catch (error) {
    if (error.response?.data?.Error) {
      throw new Error(`OMDB API Error: ${error.response.data.Error}`)
    }
    throw new Error(`OMDB API Error: ${error.message}`)
  }
}

export const omdbApi = {
  getByImdbId: (imdbId) => makeRequest({ i: imdbId }),
  getByTitle: (title, year) => makeRequest({ t: title, y: year }),
  search: (query, page = 1) => makeRequest({ s: query, page }),
}
