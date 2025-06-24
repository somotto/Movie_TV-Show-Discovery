"use client"

import { useState } from "react"
import Image from "next/image"
import { getImageUrl, formatDate, formatRating } from "../../utils/helpers"
import Button from "../common/Button"

const TVDetails = ({ show, omdbData }) => {
    const [userRating, setUserRating] = useState(0)
    const [userStatus, setUserStatus] = useState("want_to_watch")

    const creators = show.created_by || []
    const cast = show.credits?.cast?.slice(0, 10) || []

    return (
        <div className="bg-white">
            {/* Backdrop */}
            {show.backdrop_path && (
                <div className="relative h-96 bg-gray-900">
                    <Image
                        src={getImageUrl(show.backdrop_path, "w1280") || "/placeholder.svg"}
                        alt={show.name}
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
                                    src={getImageUrl(show.poster_path, "w500") || "/placeholder.svg"}
                                    alt={show.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Watchlist Controls */}
                            <div className="mt-6 space-y-4">
                                <Button onClick={() => console.log("Toggle watchlist")} variant="primary" className="w-full">
                                    Add to Watchlist
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {/* Title and Basic Info */}
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{show.name}</h1>
                                {show.tagline && <p className="text-xl text-gray-600 italic mb-4">{show.tagline}</p>}

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <span>{formatDate(show.first_air_date)}</span>
                                    {show.last_air_date && (
                                        <>
                                            <span>-</span>
                                            <span>{formatDate(show.last_air_date)}</span>
                                        </>
                                    )}
                                    {show.number_of_seasons && (
                                        <>
                                            <span>•</span>
                                            <span>
                                                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? "s" : ""}
                                            </span>
                                        </>
                                    )}
                                    {show.number_of_episodes && (
                                        <>
                                            <span>•</span>
                                            <span>{show.number_of_episodes} Episodes</span>
                                        </>
                                    )}
                                    {show.genres && show.genres.length > 0 && (
                                        <>
                                            <span>•</span>
                                            <span>{show.genres.map((g) => g.name).join(", ")}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="flex flex-wrap gap-6">
                                {show.vote_average > 0 && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600">{formatRating(show.vote_average)}</div>
                                        <div className="text-sm text-gray-600">TMDB</div>
                                    </div>
                                )}
                                {omdbData?.imdbRating && omdbData.imdbRating !== "N/A" && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600">{omdbData.imdbRating}</div>
                                        <div className="text-sm text-gray-600">IMDb</div>
                                    </div>
                                )}
                            </div>

                            {/* Overview */}
                            {show.overview && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                                    <p className="text-gray-700 leading-relaxed">{show.overview}</p>
                                </div>
                            )}

                            {/* Creators */}
                            {creators.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Created By</h2>
                                    <p className="text-gray-700">{creators.map((c) => c.name).join(", ")}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TVDetails