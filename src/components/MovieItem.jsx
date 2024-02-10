import React from "react";
import { Link } from "react-router-dom";

import useMyListHandler from "../hooks/useMyListHandler";
import AddToListBtn from "./AddToListBtn";
import Rating from "./Rating";


function MovieItem({ movie, isInMyList }) {
    const { handleMyListClick } = useMyListHandler();

    return (
        <div className="movie-item" key={movie.id}>
            {movie.posterPath ? (
                // scenario 1: poster found
                <img src={movie.posterPath} alt={`Poster for ${movie.title}`} />
            ) : (
                // scenario 2: no poster found
                <div className="no-image">No Image Available</div> // Placeholder if no poster
            )}
            <div className="overlay">
                <Rating movie={movie} />
                <p>{movie.releaseDate}</p>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <div className="bottom-buttons">
                    <Link to={`/movie/${movie.id}`}>More Info</Link>
                    <AddToListBtn
                        size="1x"
                        movieItemObj={movie}
                        isInMyList={isInMyList}
                        handleClick={handleMyListClick}
                    />
                </div>
            </div>
        </div>
    );
}
export default MovieItem;
