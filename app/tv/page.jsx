"use client"

import { useState, useEffect } from "react"
import { tmdbApi } from "../../src/api/tmdb"
import { useApi } from "../../src/hooks/useApi"
import TVList from "../../src/components/tv/TVList"
import Loader from "../../src/components/common/Loader"
import ErrorMessage from "../../src/components/common/ErrorMessage"
import Button from "../../src/components/common/Button"
import ApiStatus from "../../src/components/common/ApiStatus"

const TVPage = () => {
    const [activeCategory, setActiveCategory] = useState("popular")
    const [page, setPage] = useState(1)
    const [allShows, setAllShows] = useState([])

    const getApiFunction = () => {
        switch (activeCategory) {
            case "popular":
                return () => tmdbApi.getPopularTV(page)
            case "top_rated":
                return () => tmdbApi.getTopRatedTV(page)
            case "on_the_air":
                return () => tmdbApi.getOnTheAirTV(page)
            default:
                return () => tmdbApi.getPopularTV(page)
        }
    }

    const { data, loading, error, refetch } = useApi(getApiFunction(), [activeCategory, page])

    useEffect(() => {
        if (data?.results) {
            if (page === 1) {
                setAllShows(data.results)
            } else {
                setAllShows((prev) => [...prev, ...data.results])
            }
        }
    }, [data, page])

    useEffect(() => {
        setPage(1)
        setAllShows([])
    }, [activeCategory])

    const categories = [
        { key: "popular", label: "Popular" },
        { key: "top_rated", label: "Top Rated" },
        { key: "on_the_air", label: "On The Air" },
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
                <h1 className="text-3xl font-bold text-gray-900 mb-6">TV Shows</h1>

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
            {loading && page === 1 && <Loader text={`Loading ${getCategoryTitle().toLowerCase()} TV shows...`} />}

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

            {/* TV Shows Grid */}
            {allShows.length > 0 && (
                <div className="space-y-8">
                    <TVList shows={allShows} title={`${getCategoryTitle()} TV Shows`} showWatchlistButton={true} />

                    {/* Load More Button */}
                    {data?.total_pages && page < data.total_pages && (
                        <div className="text-center">
                            <Button onClick={loadMore} loading={loading && page > 1} variant="outline" size="large">
                                Load More TV Shows
                            </Button>
                        </div>
                    )}

                    {/* Results Info */}
                    <div className="text-center text-gray-600">
                        <p>
                            Showing {allShows.length} of {data?.total_results?.toLocaleString() || 0} TV shows
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && allShows.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No TV shows found</h3>
                    <p className="text-gray-600">Try refreshing the page or check back later.</p>
                </div>
            )}
        </div>
    )
}

export default TVPage