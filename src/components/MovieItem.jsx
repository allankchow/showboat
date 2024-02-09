import React from "react";
import { Link } from "react-router-dom";
import AddToListBtn from "./AddToListBtn";

function MovieItem({ movie }) {
    return (
        <div className="movie-item" key={movie.id}>
            {movie.posterPath ? (
                // scenario 1: poster found
                <img src={movie.posterPath} alt={`Poster for ${movie.title}`} />
            ) : (
                // scenario 2: no poster found
                <div className="no-image">No Image Available</div> // Placeholder if no poster
            )}
            <div className = "overlay">
                <div className="rating-circle">
                    <span className="rating-number">{movie.voteAverage}</span>
                    <div className="circle-backdrop">
                        <div 
                            className="circle-fill" 
                            style={{ 
                                background: `conic-gradient(#003DC6 ${movie.voteAverage * 10}%, transparent 0)` 
                            }}
                        >
                            <div className ="circle-inner-fill"></div>
                        </div>
                    </div>
                </div>
                <p>{movie.releaseDate}</p>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <div className = "bottom-buttons">
                    <Link to={`/movie/${movie.id}`}>More Info</Link>
                    <AddToListBtn size="2x" />
                </div>
            </div>
        </div>
    )
}
export default MovieItem;