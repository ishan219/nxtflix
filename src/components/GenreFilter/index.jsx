import "./index.css";

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => (
  <ul className="genre-filter">
    {genres.map((genre) => (
      <li key={genre}>
        <button
          className={`genre-chip ${genre === selectedGenre ? "genre-chip-active" : ""}`}
          type="button"
          aria-pressed={genre === selectedGenre}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      </li>
    ))}
  </ul>
);

export default GenreFilter;
