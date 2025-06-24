"use client"

import { useState } from "react"
import Button from "./Button"
import TrailerModal from "./TrailerModal"

const TrailerButton = ({ title, year, type = "movie", variant = "primary", size = "medium", className = "" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsModalOpen(true)
    }

    return (
        <>
            <Button onClick={handleClick} variant={variant} size={size} className={className}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Trailer
            </Button>

            <TrailerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} year={year} type={type} />
        </>
    )
}

export default TrailerButton