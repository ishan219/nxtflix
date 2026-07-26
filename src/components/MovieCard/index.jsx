import { Link } from 'react-router-dom'

import './index.css'

const MovieCard = ({ movie }) => {
  const { id, title, genre, year, rating, duration, poster } = movie

  return (
    <li className="movie-card">
      <Link className="movie-card-link" to={`/movies/${id}`}>
        <img className="movie-card-poster" src={poster} alt={title} loading="lazy" />

        <span className="movie-card-rating">
          <span className="movie-card-star" aria-hidden="true">
            ★
          </span>
          {rating}
        </span>

        <span className="movie-card-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>

        <div className="movie-card-info">
          <h3 className="movie-card-title">{title}</h3>
          <p className="movie-card-meta">
            {genre} • {year} • {duration}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default MovieCard
