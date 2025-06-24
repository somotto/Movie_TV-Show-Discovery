import TVCard from "./TVCard"

const TVList = ({ shows, title, showWatchlistButton = true }) => {
  if (!shows || shows.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No TV shows found.</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {shows.map((show) => (
          <TVCard key={show.id} show={show} showWatchlistButton={showWatchlistButton} />
        ))}
      </div>
    </div>
  )
}

export default TVList
