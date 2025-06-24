import axios from "axios"

const createApiClient = (baseURL, defaultParams = {}, useBearer = false) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    params: defaultParams,
  })

  client.interceptors.request.use(
    (config) => {
      // Add Bearer token for TMDB v4 API if specified
      if (useBearer && process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data || error.message)
      return Promise.reject(error)
    },
  )

  return client
}

export default createApiClient
