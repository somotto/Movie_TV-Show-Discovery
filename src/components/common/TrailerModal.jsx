"use client"

import { useState, useEffect } from "react"
import { youtubeApi } from "../../api/youtube"
import Button from "./Button"
import Loader from "./Loader"

const TrailerModal = ({ isOpen, onClose, title, year, type = "movie" }) => {
    const [trailers, setTrailers] = useState([])
    const [selectedTrailer, setSelectedTrailer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (isOpen && title) {
            fetchTrailers()
        }
    }, [isOpen, title, year, type])

    const fetchTrailers = async () => {
        setLoading(true)
        setError(null)
        setTrailers([])
        setSelectedTrailer(null)

        try {
            const response = await youtubeApi.searchTrailers(title, year, type)
            const trailerList = response.items || []
            setTrailers(trailerList)
            if (trailerList.length > 0) {
                setSelectedTrailer(trailerList[0])
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setTrailers([])
        setSelectedTrailer(null)
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Background overlay - lower z-index */}
            <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity z-40" onClick={handleClose}></div>

            {/* Modal content - higher z-index */}
            <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
                <div className="relative w-full max-w-6xl mx-auto">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute -top-12 right-0 z-60 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
                    >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Title */}
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white text-center">{title} - Trailers</h3>
                    </div>

                    {/* Content */}
                    <div className="bg-black rounded-lg overflow-hidden">
                        {loading && (
                            <div className="aspect-video flex items-center justify-center bg-gray-900">
                                <Loader text="Loading trailers..." />
                            </div>
                        )}

                        {error && (
                            <div className="aspect-video flex items-center justify-center bg-gray-900">
                                <div className="text-center">
                                    <p className="text-red-400 mb-4">{error}</p>
                                    <Button onClick={fetchTrailers} variant="primary">
                                        Try Again
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!loading && !error && trailers.length === 0 && (
                            <div className="aspect-video flex items-center justify-center bg-gray-900">
                                <p className="text-white">No trailers found for this {type}.</p>
                            </div>
                        )}

                        {!loading && !error && trailers.length > 0 && (
                            <div className="space-y-4">
                                {/* Main video player - highest z-index */}
                                {selectedTrailer && (
                                    <div className="relative aspect-video bg-black">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedTrailer.id.videoId}?autoplay=1&rel=0&modestbranding=1&fs=1`}
                                            title={selectedTrailer.snippet.title}
                                            className="absolute inset-0 w-full h-full z-50"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                {/* Trailer selection - below video */}
                                {trailers.length > 1 && (
                                    <div className="bg-gray-900 p-4 rounded-b-lg">
                                        <h4 className="text-sm font-medium text-white mb-3">Available Trailers:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {trailers.map((trailer) => (
                                                <button
                                                    key={trailer.id.videoId}
                                                    onClick={() => setSelectedTrailer(trailer)}
                                                    className={`text-left p-3 rounded-lg border transition-colors ${selectedTrailer?.id.videoId === trailer.id.videoId
                                                            ? "border-blue-500 bg-blue-900 bg-opacity-50"
                                                            : "border-gray-600 hover:border-gray-500 hover:bg-gray-800"
                                                        }`}
                                                >
                                                    <div className="flex space-x-3">
                                                        <div className="relative flex-shrink-0">
                                                            <img
                                                                src={trailer.snippet.thumbnails.medium?.url || trailer.snippet.thumbnails.default?.url}
                                                                alt={trailer.snippet.title}
                                                                className="w-16 h-12 object-cover rounded"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-white truncate">{trailer.snippet.title}</p>
                                                            <p className="text-xs text-gray-400 truncate">{trailer.snippet.channelTitle}</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrailerModal