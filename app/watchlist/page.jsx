"use client"

import { useState } from "react"
import { useWatchlist } from "../../src/contexts/WatchlistContext"
import MovieCard from "../../src/components/movie/MovieCard"
import TVCard from "../../src/components/tv/TVCard"
import Button from "../../src/components/common/Button"

const WatchlistPage = () => {
    const { watchlist, clearWatchlist, getWatchlistByStatus } = useWatchlist()
    const [activeTab, setActiveTab] = useState("all")
    const [sortBy, setSortBy] = useState("dateAdded")

    const filterWatchlist = () => {
        let filtered = watchlist

        if (activeTab !== "all") {
            filtered = getWatchlistByStatus(activeTab)
        }

        // Sort the results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "dateAdded":
                    return new Date(b.dateAdded) - new Date(a.dateAdded)
                case "title":
                    return (a.title || a.name || "").localeCompare(b.title || b.name || "")
                case "rating":
                    return (b.vote_average || 0) - (a.vote_average || 0)
                case "userRating":
                    return (b.userRating || 0) - (a.userRating || 0)
                default:
                    return 0
            }
        })

        return filtered
    }

    const filteredWatchlist = filterWatchlist()
    const movies = filteredWatchlist.filter((item) => item.type === "movie")
    const tvShows = filteredWatchlist.filter((item) => item.type === "tv")

    const statusCounts = {
        all: watchlist.length,
        want_to_watch: getWatchlistByStatus("want_to_watch").length,
        watching: getWatchlistByStatus("watching").length,
        watched: getWatchlistByStatus("watched").length,
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlist</h1>
                    <p className="text-gray-600">
                        {watchlist.length} {watchlist.length === 1 ? "item" : "items"} in your watchlist
                    </p>
                </div>

                {watchlist.length > 0 && (
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="dateAdded">Sort by Date Added</option>
                            <option value="title">Sort by Title</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="userRating">Sort by My Rating</option>
                        </select>

                        <Button onClick={clearWatchlist} variant="danger" size="medium">
                            Clear All
                        </Button>
                    </div>
                )}
            </div>

            {watchlist.length === 0 ? (
                /* Empty State */
                <div className="text-center py-12">
                    <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
                    <p className="text-gray-600 mb-6">
                        Start adding movies and TV shows to keep track of what you want to watch.
                    </p>
                    <Button onClick={() => (window.location.href = "/")} variant="primary">
                        Browse Content
                    </Button>
                </div>
            ) : (
                <>
                    {/* Status Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {[
                            { key: "all", label: "All", count: statusCounts.all },
                            { key: "want_to_watch", label: "Want to Watch", count: statusCounts.want_to_watch },
                            { key: "watching", label: "Watching", count: statusCounts.watching },
                            { key: "watched", label: "Watched", count: statusCounts.watched },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {filteredWatchlist.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No items found for the selected filter.</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Movies */}
                            {movies.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Movies ({movies.length})</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                        {movies.map((movie) => (
                                            <div key={`movie-${movie.id}`} className="relative">
                                                <MovieCard movie={movie} />
                                                {movie.userRating > 0 && (
                                                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                                                        My Rating: {movie.userRating}/10
                                                    </div>
                                                )}
                                                <div className="mt-2 text-center">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${movie.status === "watched"
                                                                ? "bg-green-100 text-green-800"
                                                                : movie.status === "watching"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                    >
                                                        {movie.status === "want_to_watch"
                                                            ? "Want to Watch"
                                                            : movie.status === "watching"
                                                                ? "Watching"
                                                                : "Watched"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* TV Shows */}
                            {tvShows.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">TV Shows ({tvShows.length})</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                        {tvShows.map((show) => (
                                            <div key={`tv-${show.id}`} className="relative">
                                                <TVCard show={show} />
                                                {show.userRating > 0 && (
                                                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                                                        My Rating: {show.userRating}/10
                                                    </div>
                                                )}
                                                <div className="mt-2 text-center">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${show.status === "watched"
                                                                ? "bg-green-100 text-green-800"
                                                                : show.status === "watching"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                    >
                                                        {show.status === "want_to_watch"
                                                            ? "Want to Watch"
                                                            : show.status === "watching"
                                                                ? "Watching"
                                                                : "Watched"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default WatchlistPage