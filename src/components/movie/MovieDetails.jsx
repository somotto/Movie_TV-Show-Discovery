"use client"

import { useState } from "react"
import Image from "next/image"
import { useWatchlist } from "../../contexts/WatchlistContext"
import { getImageUrl, formatDate, formatRuntime, formatRating } from "../../utils/helpers"
import Button from "../common/Button"

const MovieDetails = ({ movie, omdbData }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, updateWatchlistItem } = useWatchlist()
  const [userRating, setUserRating] = useState(0)
  const [userStatus, setUserStatus] = useState("want_to_watch")
  const inWatchlist = isInWatchlist(movie.id, "movie")

  const handleWatchlistToggle = () => {
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
        status: userStatus,
        userRating: userRating,
      })
    }
  }

  const handleStatusChange = (status) => {
    setUserStatus(status)
    if (inWatchlist) {
      updateWatchlistItem(movie.id, "movie", { status })
    }
  }

  const handleRatingChange = (rating) => {
    setUserRating(rating)
    if (inWatchlist) {
      updateWatchlistItem(movie.id, "movie", { userRating: rating })
    }
  }

  const director = movie.credits?.crew?.find((person) => person.job === "Director")
  const cast = movie.credits?.cast?.slice(0, 10) || []

  return (
    <div className="bg-white">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-96 bg-gray-900">
          <Image
            src={getImageUrl(movie.backdrop_path, "w1280") || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Watchlist Controls */}
              <div className="mt-6 space-y-4">
                <Button onClick={handleWatchlistToggle} variant={inWatchlist ? "danger" : "primary"} className="w-full">
                  {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>

                {inWatchlist && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={userStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="want_to_watch">Want to Watch</option>
                        <option value="watching">Watching</option>
                        <option value="watched">Watched</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRatingChange(rating)}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                              rating <= userRating
                                ? "bg-yellow-400 text-yellow-900"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{movie.title}</h1>
                {movie.tagline && <p className="text-xl text-gray-600 italic mb-4">{movie.tagline}</p>}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>{formatDate(movie.release_date)}</span>
                  <span>•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                  {movie.genres && movie.genres.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{movie.genres.map((g) => g.name).join(", ")}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Ratings */}
              <div className="flex flex-wrap gap-6">
                {movie.vote_average > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{formatRating(movie.vote_average)}</div>
                    <div className="text-sm text-gray-600">TMDB</div>
                  </div>
                )}
                {omdbData?.imdbRating && omdbData.imdbRating !== "N/A" && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{omdbData.imdbRating}</div>
                    <div className="text-sm text-gray-600">IMDb</div>
                  </div>
                )}
                {omdbData?.Ratings?.find((r) => r.Source === "Rotten Tomatoes") && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {omdbData.Ratings.find((r) => r.Source === "Rotten Tomatoes").Value}
                    </div>
                    <div className="text-sm text-gray-600">Rotten Tomatoes</div>
                  </div>
                )}
              </div>

              {/* Overview */}
              {movie.overview && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* Director */}
              {director && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Director</h2>
                  <p className="text-gray-700">{director.name}</p>
                </div>
              )}

              {/* Cast */}
              {cast.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-center">
                        <div className="relative aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={getImageUrl(actor.profile_path, "w185") || "/placeholder.svg"}
                            alt={actor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-medium text-sm">{actor.name}</p>
                        <p className="text-gray-600 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.budget > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Budget</h3>
                    <p className="text-gray-700">${movie.budget.toLocaleString()}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Revenue</h3>
                    <p className="text-gray-700">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Production Companies</h3>
                    <p className="text-gray-700">{movie.production_companies.map((c) => c.name).join(", ")}</p>
                  </div>
                )}
                {movie.production_countries && movie.production_countries.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Countries</h3>
                    <p className="text-gray-700">{movie.production_countries.map((c) => c.name).join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
