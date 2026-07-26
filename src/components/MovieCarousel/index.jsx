import { Link } from 'react-router-dom'

import './index.css'


const MovieCarousel = ({ title, movies, direction = 'left' }) => {
  const loopedMovies = [...movies, ...movies]

  return (
    <section className="carousel">
      <h2 className="carousel-title page-container">{title}</h2>

      <div className="carousel-container">
        <ul className={`carousel-track carousel-track-${direction}`}>
          {loopedMovies.map((movie, index) => (
            <li className="carousel-item" key={`${movie.id}-${index}`}>
              <Link className="carousel-link" to={`/movies/${movie.id}`}>
                <img
                  className="carousel-poster"
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                />
                <div className="carousel-overlay">
                  <p className="carousel-item-title">{movie.title}</p>
                  <p className="carousel-item-meta">
                    {movie.genre} • {movie.rating}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MovieCarousel
