"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { tmdbApi } from "../../../src/api/tmdb"
import { omdbApi } from "../../../src/api/omdb"
import MovieDetails from "../../../src/components/movie/MovieDetails"
import MovieList from "../../../src/components/movie/MovieList"
import Loader from "../../../src/components/common/Loader"
import ErrorMessage from "../../../src/components/common/ErrorMessage"

const MovieDetailsPage = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [omdbData, setOmdbData] = useState(null)
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (id) {
            fetchMovieData()
        }
    }, [id])

    const fetchMovieData = async () => {
        setLoading(true)
        setError(null)

        try {
            // Fetch movie details from TMDB
            const movieData = await tmdbApi.getMovieDetails(id)
            setMovie(movieData)
            setSimilarMovies(movieData.similar?.results?.slice(0, 12) || [])

            // Fetch additional data from OMDB if IMDB ID is available
            if (movieData.imdb_id) {
                try {
                    const omdbResponse = await omdbApi.getByImdbId(movieData.imdb_id)
                    setOmdbData(omdbResponse)
                } catch (omdbError) {
                    console.warn("OMDB data not available:", omdbError.message)
                }
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader text="Loading movie details..." />
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchMovieData} />
    }

    if (!movie) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Movie not found</h2>
                <p className="text-gray-600 mt-2">The movie you're looking for doesn't exist.</p>
            </div>
        )
    }

    return (
        <div>
            <MovieDetails movie={movie} omdbData={omdbData} />

            {/* Similar Movies */}
            {similarMovies.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <MovieList movies={similarMovies} title="Similar Movies" />
                </div>
            )}
        </div>
    )
}

export default MovieDetailsPage