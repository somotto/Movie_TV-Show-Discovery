import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "MovieDB - Discover Movies & TV Shows",
    description:
        "Your ultimate destination for discovering movies and TV shows. Search, explore, and manage your watchlist.",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}