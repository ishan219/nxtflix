import { Navigate, useNavigate, useParams } from 'react-router-dom'

import Header from '../../components/Header'
import { useWatchLater } from '../../context/WatchLaterContext'
import movies from '../../data/movies'
import './index.css'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWatchLater, toggleWatchLater } = useWatchLater()

  
  const movie = movies.find((item) => item.id === Number(id))

  if (!movie) {
    return <Navigate to="/not-found" replace />
  }

  const isSaved = isInWatchLater(movie.id)

  return (
    <>
      <Header />

      <main className="details-page">
        <div
          className="details-backdrop"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
          role="presentation"
        />

        <div className="details-body">
          <img className="details-poster" src={movie.poster} alt={movie.title} />

          <div className="details-info">
            <h1 className="details-title">{movie.title}</h1>

            <div className="details-meta">
              <span className="details-genre-tag">{movie.genre}</span>
              <span>{movie.year}</span>
              <span className="details-dot">•</span>
              <span>{movie.duration}</span>
              <span className="details-rating">
                <span className="details-star" aria-hidden="true">
                  ★
                </span>
                {movie.rating}
              </span>
            </div>

            <p className="details-overview">{movie.overview}</p>

            <div className="details-actions">
              <button
                className={`details-watch-later ${isSaved ? 'details-watch-later--saved' : ''}`}
                type="button"
                onClick={() => toggleWatchLater(movie)}
              >
                {isSaved ? '✓ Added to Watch Later' : '+ Watch Later'}
              </button>

              <button className="details-back" type="button" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MovieDetails
