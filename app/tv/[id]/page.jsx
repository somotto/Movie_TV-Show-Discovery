"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { tmdbApi } from "../../../src/api/tmdb"
import { omdbApi } from "../../../src/api/omdb"
import TVDetails from "../../../src/components/tv/TVDetails"
import TVList from "../../../src/components/tv/TVList"
import Loader from "../../../src/components/common/Loader"
import ErrorMessage from "../../../src/components/common/ErrorMessage"

const TVDetailsPage = () => {
    const { id } = useParams()
    const [show, setShow] = useState(null)
    const [omdbData, setOmdbData] = useState(null)
    const [similarShows, setSimilarShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (id) {
            fetchTVData()
        }
    }, [id])

    const fetchTVData = async () => {
        setLoading(true)
        setError(null)

        try {
            // Fetch TV show details from TMDB
            const showData = await tmdbApi.getTVDetails(id)
            setShow(showData)
            setSimilarShows(showData.similar?.results?.slice(0, 12) || [])

            // Try to fetch additional data from OMDB
            if (showData.name) {
                try {
                    const omdbResponse = await omdbApi.getByTitle(showData.name, showData.first_air_date?.split("-")[0])
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
        return <Loader text="Loading TV show details..." />
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchTVData} />
    }

    if (!show) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">TV show not found</h2>
                <p className="text-gray-600 mt-2">The TV show you're looking for doesn't exist.</p>
            </div>
        )
    }

    return (
        <div>
            <TVDetails show={show} omdbData={omdbData} />

            {/* Similar Shows */}
            {similarShows.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <TVList shows={similarShows} title="Similar TV Shows" />
                </div>
            )}
        </div>
    )
}

export default TVDetailsPage