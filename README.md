# Movie_TV-Show-Discovery
A comprehensive entertainment discovery platform where users can search for movies and TV shows, view detailed information, manage personal watchlists, and discover trending content.

A responsive web application for discovering movies and TV shows, powered by TMDB and YouTube APIs. Features include real-time search, detailed media information, watchlist management, and trailer playback.

### Prerequisites
- Node.js v16+
- npm v8+ or pnpm
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation
1. Clone the repository:
   ```bash
   cd Movie_TV-Show-Discovery
   ```
 
2. Install dependencies using either npm:
   ```bash
   npm install --legacy-peer-deps
   ```
or using pnpm
```bash
pnpm install
```
3. Create a .env.local file in the root directory with your TMDB API key:
   ```bash
   TMDB_API_KEY=your_api_key_here
   ```

 **Running the Application**
  ```bash
   npm run dev
  ```

The application will be available at:
```bash
http://localhost:3000
```
  
**Features**
Search movies and TV shows
View detailed information about movies and shows
Watch trailers
Manage personal watchlist
Responsive design for mobile and desktop
Real-time search functionality
Dark/Light theme support

**Technologies Used**
Next.js 14
React
Tailwind CSS
TMDB API
YouTube API
Axios
React Hook Form

**Contributing**
* Fork the repository
* Create your feature branch (git checkout -b feature/AmazingFeature)
* Commit your changes (git commit -m 'Add some AmazingFeature')
* Push to the branch (git push origin feature/AmazingFeature)
* Open a Pull Request
  
**License**
This project is licensed under the MIT License - see the LICENSE file for details.

**Acknowledgments**
TMDB API for providing movie and TV show data
YouTube API for trailer playback functionality