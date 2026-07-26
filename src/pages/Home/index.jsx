import { useMemo, useState } from 'react'

import GenreFilter from '../../components/GenreFilter'
import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import MovieCarousel from '../../components/MovieCarousel'
import movies, { GENRES } from '../../data/movies'
import './index.css'

const HERO_IMAGE = 'https://picsum.photos/seed/nxtflixhero/1600/900'
const CAROUSEL_SIZE = 16
const FRESH_RELEASE_FROM_YEAR = 2015

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState('All')

  
  const trendingMovies = useMemo(
    () => [...movies].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, CAROUSEL_SIZE),
    [],
  )

  const freshReleases = useMemo(
    () => movies.filter((movie) => movie.year >= FRESH_RELEASE_FROM_YEAR).slice(0, CAROUSEL_SIZE),
    [],
  )

  const filteredMovies = useMemo(
    () =>
      selectedGenre === 'All'
        ? movies
        : movies.filter((movie) => movie.genre === selectedGenre),
    [selectedGenre],
  )

  return (
    <>
      <Header />

      <main className="home-page">
        <section className="home-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
          <div className="home-hero-content">
            <div>
              <h1 className="home-hero-title">Discover your next favourite</h1>
              <p className="home-hero-text">
                Browse {movies.length}+ titles across every genre. Add to Watch Later and pick up
                anytime.
              </p>
            </div>
          </div>
        </section>

        <MovieCarousel title="Trending Now" movies={trendingMovies} direction="left" />
        <MovieCarousel title="Fresh Releases" movies={freshReleases} direction="right" />

        <section className="home-catalog page-container">
          <GenreFilter
            genres={GENRES}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

          {filteredMovies.length === 0 ? (
            <p className="home-empty">No movies found for this genre.</p>
          ) : (
            <ul className="movie-grid">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}

export default Home
