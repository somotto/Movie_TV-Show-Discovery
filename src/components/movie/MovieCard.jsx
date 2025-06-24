"use client"
import Link from "next/link"
import Image from "next/image"
import { useWatchlist } from "../../contexts/WatchlistContext"
import { getImageUrl, formatDate, formatRating } from "../../utils/helpers"
import Button from "../common/Button"

const MovieCard = ({ movie, showWatchlistButton = true }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movie.id, "movie")

  const handleWatchlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWatchlist) {
      removeFromWatchlist(movie.id, "movie")
    } else {
      addToWatchlist({
        id: movie.id,
        type: "movie",
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        status: "want_to_watch",
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] bg-gray-200">
          <Image
            src={getImageUrl(movie.poster_path, "w342") || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {formatRating(movie.vote_average)}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {movie.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3">{formatDate(movie.release_date)}</p>

        {movie.overview && <p className="text-gray-700 text-sm mb-4 line-clamp-3">{movie.overview}</p>}

        {showWatchlistButton && (
          <Button
            onClick={handleWatchlistToggle}
            variant={inWatchlist ? "danger" : "primary"}
            size="small"
            className="w-full"
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        )}
      </div>
    </div>
  )
}

export default MovieCard
