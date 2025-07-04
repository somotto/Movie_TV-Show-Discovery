import { Inter } from "next/font/google"
import { WatchlistProvider } from "../src/contexts/WatchlistContext"
import MainLayout from "../src/components/layout/MainLayout"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MovieDB - Discover Movies & TV Shows",
  description:
    "Your ultimate destination for discovering movies and TV shows. Search, explore, and manage your watchlist.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WatchlistProvider>
          <MainLayout>{children}</MainLayout>
        </WatchlistProvider>
      </body>
    </html>
  )
}
