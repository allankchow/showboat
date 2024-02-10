import React from "react";
import { Link } from "react-router-dom";

import posterPlaceholder from "../assets/images/poster-placeholder.png";
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
                <img src={posterPlaceholder} alt="No movie poster" />
            )}
            <div className="overlay">
                <Rating rating={movie.voteAverage} />
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
