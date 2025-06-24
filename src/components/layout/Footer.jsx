const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MovieDB</h3>
            <p className="text-gray-400">Your ultimate destination for discovering movies and TV shows.</p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/movies" className="hover:text-white transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a href="/tv" className="hover:text-white transition-colors">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="/trending" className="hover:text-white transition-colors">
                  Trending
                </a>
              </li>
              <li>
                <a href="/genres" className="hover:text-white transition-colors">
                  Genres
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/watchlist" className="hover:text-white transition-colors">
                  My Watchlist
                </a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-white transition-colors">
                  Favorites
                </a>
              </li>
              <li>
                <a href="/ratings" className="hover:text-white transition-colors">
                  My Ratings
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MovieDB. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Data provided by{" "}
            <a href="https://www.themoviedb.org/" className="text-blue-400 hover:text-blue-300">
              The Movie Database (TMDB)
            </a>{" "}
            and{" "}
            <a href="http://www.omdbapi.com/" className="text-blue-400 hover:text-blue-300">
              OMDb API
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
