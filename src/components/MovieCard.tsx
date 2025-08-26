import React from "react";

interface MovieCardProps {
  title: string;
  poster_path: string | null;
  release_date: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path, release_date }) => {
  return (
    <div className="movie-card" style={{
      width: "200px",
      backgroundColor: "#222",
      borderRadius: "8px",
      padding: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
      color: "white",
    }}>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          style={{ borderRadius: "6px", marginBottom: "8px", display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
      ) : (
        <div style={{
          width: "200px",
          height: "300px",
          backgroundColor: "#444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto"
        }}>
          No Image
        </div>
      )}
      <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "0.9rem" }}>{title}</p>
      <p style={{ fontSize: "0.75rem", color: "#ccc", textAlign: "center" }}>Release: {release_date}</p>
    </div>
  );
};

export default MovieCard;
