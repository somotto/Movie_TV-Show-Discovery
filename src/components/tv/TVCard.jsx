"use client"
import Link from "next/link"
import Image from "next/image"
import { getImageUrl, formatDate, formatRating } from "../../utils/helpers"
import Button from "../common/Button"

const TVCard = ({ show, showWatchlistButton = true }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/tv/${show.id}`}>
                <div className="relative aspect-[2/3] bg-gray-200">
                    <Image
                        src={getImageUrl(show.poster_path, "w342") || "/placeholder.svg"}
                        alt={show.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {show.vote_average > 0 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-semibold">
                            {formatRating(show.vote_average)}
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/tv/${show.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">{show.name}</h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3">{formatDate(show.first_air_date)}</p>

                {show.overview && <p className="text-gray-700 text-sm mb-4 line-clamp-3">{show.overview}</p>}

                {showWatchlistButton && (
                    <Button
                        onClick={() => console.log("Add to watchlist:", show.id)}
                        variant="primary"
                        size="small"
                        className="w-full"
                    >
                        Add to Watchlist
                    </Button>
                )}
            </div>
        </div>
    )
}

export default TVCard