"use client"
import { useApi } from "../src/hooks/useApi"
import { tmdbApi } from "../src/api/tmdb"
import MovieList from "../src/components/movie/MovieList"
import TVList from "../src/components/tv/TVList"
import Loader from "../src/components/common/Loader"
import ErrorMessage from "../src/components/common/ErrorMessage"

const HomePage = () => {
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useApi(() => tmdbApi.getTrending("all", "day"), [])

  const {
    data: popularMovies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useApi(() => tmdbApi.getPopularMovies(), [])

  const {
    data: popularTV,
    loading: tvLoading,
    error: tvError,
    refetch: refetchTV,
  } = useApi(() => tmdbApi.getPopularTV(), [])

  if (trendingLoading || moviesLoading || tvLoading) {
    return <Loader text="Loading trending content..." />
  }

  if (trendingError || moviesError || tvError) {
    return (
      <ErrorMessage
        message="Failed to load content. Please try again."
        onRetry={() => {
          refetchTrending()
          refetchMovies()
          refetchTV()
        }}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Discover Amazing Movies & TV Shows</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore trending content, manage your watchlist, and discover your next favorite entertainment.
        </p>
      </div>

      {/* Trending Today */}
      {trendingData?.results && trendingData.results.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Trending Today</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingData.results.slice(0, 12).map((item) => {
              if (item.media_type === "movie") {
                return (
                  <div
                    key={`movie-${item.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <a href={`/movie/${item.id}`}>
                      <div className="relative aspect-[2/3] bg-gray-200">
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          {item.vote_average?.toFixed(1)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{new Date(item.release_date).getFullYear()}</p>
                      </div>
                    </a>
                  </div>
                )
              } else if (item.media_type === "tv") {
                return (
                  <div
                    key={`tv-${item.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <a href={`/tv/${item.id}`}>
                      <div className="relative aspect-[2/3] bg-gray-200">
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          {item.vote_average?.toFixed(1)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{new Date(item.first_air_date).getFullYear()}</p>
                      </div>
                    </a>
                  </div>
                )
              }
              return null
            })}
          </div>
        </section>
      )}

      {/* Popular Movies */}
      {popularMovies?.results && (
        <section className="mb-12">
          <MovieList movies={popularMovies.results.slice(0, 12)} title="Popular Movies" />
        </section>
      )}

      {/* Popular TV Shows */}
      {popularTV?.results && (
        <section className="mb-12">
          <TVList shows={popularTV.results.slice(0, 12)} title="Popular TV Shows" />
        </section>
      )}
    </div>
  )
}

export default HomePage
