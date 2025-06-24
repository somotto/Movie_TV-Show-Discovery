export const API_CONFIG = {
  TMDB: {
    BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3",
    API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY || "62dbeac78c348c3d0cdeaa43ec1ddd5b",
    ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ||
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmRiZWFjNzhjMzQ4YzNkMGNkZWFhNDNlYzFkZGQ1YiIsIm5iZiI6MTc1MDY3ODk3OC44ODk5OTk5LCJzdWIiOiI2ODU5M2RjMmZjNzk0ZjU4NDg1M2NlZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wn9DosWXlvYkBsx26SSkgG5EssQNK7jzGAzeioQgfew",
    IMAGE_BASE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p",
  },
  OMDB: {
    BASE_URL: process.env.NEXT_PUBLIC_OMDB_BASE_URL || "https://www.omdbapi.com",
    API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY || "f82b2738",
  },
  YOUTUBE: {
    BASE_URL: "https://www.googleapis.com/youtube/v3",
    API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "AIzaSyCWVKiYjUkedR-ZoXWl4J_7QTLKaxZw5nM",
  },
}

export const IMAGE_SIZES = {
  POSTER: {
    SMALL: "w185",
    MEDIUM: "w342",
    LARGE: "w500",
    ORIGINAL: "original",
  },
  BACKDROP: {
    SMALL: "w300",
    MEDIUM: "w780",
    LARGE: "w1280",
    ORIGINAL: "original",
  },
}

export const GENRES = {
  MOVIE: {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  },
  TV: {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western",
  },
}

export const validateApiKeys = () => {
  const errors = []

  if (!API_CONFIG.TMDB.API_KEY || API_CONFIG.TMDB.API_KEY === "your_tmdb_api_key_here") {
    errors.push("NEXT_PUBLIC_TMDB_API_KEY is missing or invalid")
  }

  if (!API_CONFIG.OMDB.API_KEY || API_CONFIG.OMDB.API_KEY === "your_omdb_api_key_here") {
    errors.push("NEXT_PUBLIC_OMDB_API_KEY is missing or invalid")
  }

  if (!API_CONFIG.YOUTUBE.API_KEY || API_CONFIG.YOUTUBE.API_KEY === "your_youtube_api_key_here") {
    errors.push("NEXT_PUBLIC_YOUTUBE_API_KEY is missing or invalid")
  }

  return errors
}