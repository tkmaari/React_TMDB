import { useState } from "react";
import instance from "./axios";
import MovieCard from "./components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async () => {
    try {
      const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
      const DEFAULT_LANG = import.meta.env.VITE_DEFAULT_LANGUAGE || "ja-JP";

      const res = await instance.get<{ results: Movie[] }>("/search/movie", {
        params: {
          api_key: TMDB_API_KEY,
          query,
          language: DEFAULT_LANG,
        },
      });

      setMovies(res.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="app-container">
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#ffffff",
        }}
      >
        映画検索
      </h1>

      <div style={{ marginBottom: "2rem", display: "flex" }}>
        <input
          type="text"
          placeholder="映画のタイトルを入力して下さい"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            marginRight: "0.5rem",
            width: "250px",
          }}
        />
        <button
          onClick={searchMovies}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            backgroundColor: "#e50914",
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          検索
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
}
