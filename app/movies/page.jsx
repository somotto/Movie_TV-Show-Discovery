"use client"

import { useState, useEffect } from "react"
import { tmdbApi } from "../../src/api/tmdb"
import { useApi } from "../../src/hooks/useApi"
import MovieList from "../../src/components/movie/MovieList"
import Loader from "../../src/components/common/Loader"
import ErrorMessage from "../../src/components/common/ErrorMessage"
import Button from "../../src/components/common/Button"
import ApiStatus from "../../src/components/common/ApiStatus"

const MoviesPage = () => {
    const [activeCategory, setActiveCategory] = useState("popular")
    const [page, setPage] = useState(1)
    const [allMovies, setAllMovies] = useState([])

    const getApiFunction = () => {
        switch (activeCategory) {
            case "popular":
                return () => tmdbApi.getPopularMovies(page)
            case "top_rated":
                return () => tmdbApi.getTopRatedMovies(page)
            case "now_playing":
                return () => tmdbApi.getNowPlayingMovies(page)
            case "upcoming":
                return () => tmdbApi.getUpcomingMovies(page)
            default:
                return () => tmdbApi.getPopularMovies(page)
        }
    }

    const { data, loading, error, refetch } = useApi(getApiFunction(), [activeCategory, page])

    useEffect(() => {
        if (data?.results) {
            if (page === 1) {
                setAllMovies(data.results)
            } else {
                setAllMovies((prev) => [...prev, ...data.results])
            }
        }
    }, [data, page])

    useEffect(() => {
        setPage(1)
        setAllMovies([])
    }, [activeCategory])

    const categories = [
        { key: "popular", label: "Popular" },
        { key: "top_rated", label: "Top Rated" },
        { key: "now_playing", label: "Now Playing" },
        { key: "upcoming", label: "Upcoming" },
    ]

    const loadMore = () => {
        if (data?.total_pages && page < data.total_pages) {
            setPage((prev) => prev + 1)
        }
    }

    const getCategoryTitle = () => {
        const category = categories.find((cat) => cat.key === activeCategory)
        return category ? category.label : "Popular"
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ApiStatus />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                        <Button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            variant={activeCategory === category.key ? "primary" : "outline"}
                            size="medium"
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Loading State for Initial Load */}
            {loading && page === 1 && <Loader text={`Loading ${getCategoryTitle().toLowerCase()} movies...`} />}

            {/* Error State */}
            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={() => {
                        setPage(1)
                        refetch()
                    }}
                />
            )}

            {/* Movies Grid */}
            {allMovies.length > 0 && (
                <div className="space-y-8">
                    <MovieList movies={allMovies} title={`${getCategoryTitle()} Movies`} showWatchlistButton={true} />

                    {/* Load More Button */}
                    {data?.total_pages && page < data.total_pages && (
                        <div className="text-center">
                            <Button onClick={loadMore} loading={loading && page > 1} variant="outline" size="large">
                                Load More Movies
                            </Button>
                        </div>
                    )}

                    {/* Results Info */}
                    <div className="text-center text-gray-600">
                        <p>
                            Showing {allMovies.length} of {data?.total_results?.toLocaleString() || 0} movies
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && allMovies.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6zm3 3a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z"
                        />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No movies found</h3>
                    <p className="text-gray-600">Try refreshing the page or check back later.</p>
                </div>
            )}
        </div>
    )
}

export default MoviesPage