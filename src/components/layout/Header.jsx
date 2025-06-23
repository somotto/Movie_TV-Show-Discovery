"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDebounce } from "../../hooks/useDebounce"

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    React.useEffect(() => {
        if (debouncedSearchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
        }
    }, [debouncedSearchQuery, router])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">MovieDB</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search movies and TV shows..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </form>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                        <Link href="/movies" className="hover:text-blue-400 transition-colors">
                            Movies
                        </Link>
                        <Link href="/tv" className="hover:text-blue-400 transition-colors">
                            TV Shows
                        </Link>
                        <Link href="/watchlist" className="hover:text-blue-400 transition-colors">
                            Watchlist
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/" className="hover:text-blue-400 transition-colors">
                                Home
                            </Link>
                            <Link href="/movies" className="hover:text-blue-400 transition-colors">
                                Movies
                            </Link>
                            <Link href="/tv" className="hover:text-blue-400 transition-colors">
                                TV Shows
                            </Link>
                            <Link href="/watchlist" className="hover:text-blue-400 transition-colors">
                                Watchlist
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header