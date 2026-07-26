import { Link } from 'react-router-dom'

import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { useWatchLater } from '../../context/WatchLaterContext'
import './index.css'


const WatchLater = () => {
  const { watchLater } = useWatchLater()

  return (
    <>
      <Header />

      <main className="watch-later-page page-container">
        <h1 className="watch-later-title">Watch Later</h1>

        {watchLater.length === 0 ? (
          <div className="watch-later-empty">
            <p className="watch-later-empty-text">Your Watch Later list is empty.</p>
            <Link className="watch-later-browse" to="/">
              Browse Movies
            </Link>
          </div>
        ) : (
          <ul className="movie-grid">
            {watchLater.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default WatchLater
