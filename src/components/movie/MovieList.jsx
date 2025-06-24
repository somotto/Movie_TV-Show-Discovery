import MovieCard from "./MovieCard"

const MovieList = ({ movies, title, showWatchlistButton = true }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No movies found.</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showWatchlistButton={showWatchlistButton} />
        ))}
      </div>
    </div>
  )
}

export default MovieList
