"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { tmdbApi } from "../../src/api/tmdb"
import { useDebounce } from "../../src/hooks/useDebounce"
import MovieCard from "../../src/components/movie/MovieCard"
import TVCard from "../../src/components/tv/TVCard"
import Loader from "../../src/components/common/Loader"
import ErrorMessage from "../../src/components/common/ErrorMessage"
import Button from "../../src/components/common/Button"

const SearchPage = () => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filter, setFilter] = useState("all") // all, movie, tv

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchContent(debouncedQuery, 1)
    } else {
      setResults([])
      setTotalPages(0)
    }
  }, [debouncedQuery, filter])

  const searchContent = async (searchQuery, pageNum = 1) => {
    setLoading(true)
    setError(null)

    try {
      let response
      if (filter === "movie") {
        response = await tmdbApi.searchMovies(searchQuery, pageNum)
      } else if (filter === "tv") {
        response = await tmdbApi.searchTV(searchQuery, pageNum)
      } else {
        response = await tmdbApi.searchMulti(searchQuery, pageNum)
      }

      if (pageNum === 1) {
        setResults(response.results || [])
      } else {
        setResults((prev) => [...prev, ...(response.results || [])])
      }

      setTotalPages(response.total_pages || 0)
      setPage(pageNum)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (page < totalPages && !loading) {
      searchContent(debouncedQuery, page + 1)
    }
  }

  const filteredResults = results.filter((item) => {
    if (filter === "movie") return item.media_type === "movie" || !item.media_type
    if (filter === "tv") return item.media_type === "tv" || !item.media_type
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search movies and TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button onClick={() => setFilter("all")} variant={filter === "all" ? "primary" : "outline"} size="medium">
              All
            </Button>
            <Button
              onClick={() => setFilter("movie")}
              variant={filter === "movie" ? "primary" : "outline"}
              size="medium"
            >
              Movies
            </Button>
            <Button onClick={() => setFilter("tv")} variant={filter === "tv" ? "primary" : "outline"} size="medium">
              TV Shows
            </Button>
          </div>
        </div>

        {/* Results Count */}
        {query && !loading && (
          <p className="text-gray-600">
            {filteredResults.length > 0
              ? `Found ${filteredResults.length} results for "${query}"`
              : `No results found for "${query}"`}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && page === 1 && <Loader text="Searching..." />}

      {/* Error State */}
      {error && <ErrorMessage message={error} onRetry={() => searchContent(debouncedQuery, 1)} />}

      {/* Results */}
      {filteredResults.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredResults.map((item) => {
              if (item.media_type === "movie" || (!item.media_type && item.title)) {
                return <MovieCard key={`movie-${item.id}`} movie={item} />
              } else if (item.media_type === "tv" || (!item.media_type && item.name)) {
                return <TVCard key={`tv-${item.id}`} show={item} />
              }
              return null
            })}
          </div>

          {/* Load More Button */}
          {page < totalPages && (
            <div className="text-center">
              <Button onClick={loadMore} loading={loading} variant="outline" size="large">
                Load More Results
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && query && filteredResults.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse our popular content instead.</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
