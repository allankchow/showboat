import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { 
    API_KEY, 
    MOVIE_ENDPOINT, 
    IMAGE_PATH_ENDPOINT,
    tabletWidth,
} from "../globals/globalVariables";
import { createMovieObject } from "../globals/utilityFunctions";

import { parseVideos, parseDate } from "../globals/utilityFunctions";
import AddToListBtn from "../components/AddToListBtn";
import Actor from "../components/Actor";
import Rating from "../components/Rating";
import posterPlaceholder from "../assets/images/poster-placeholder.png";

import useMyListHandler from '../hooks/useMyListHandler'
import { isInMyList } from "../globals/utilityFunctions";
import backdropPlaceholder from "../assets/images/backdrop-placeholder.png";


const MoviePage = () => {

    // Get the movie id from the query string
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [movie, setMovie] = useState(null);
    const [movieItemObj, setMovieItemObj] = useState(null);
    const [isMobile, setIsMobile] = useState(true);

    // get myList movies from local storage
    const myList = useSelector((state) => state.myList.items);
    // This custom hook dispatches the actions which add / removes a movie from my list
    const { handleMyListClick } = useMyListHandler();

    // Convert runtime in minutes to "xh ym" format
    const minutesToHourMinutes = (seconds) => {
        const hours = Math.floor(seconds/60);
        const minutes = Math.floor(seconds % 60);

        return `${hours}h ${minutes}m`;
    }

    // Return an array of genres
    const parseGenres = (genres) => {
        return genres.map(genre => genre.name);
    }

    // Extract the movie certification rating
    const parseCertification = (certifications) => {
        let certification = null;
        const countryInfo = certifications.find(country => country.iso_3166_1 === "US");
        if (countryInfo) {
            for (let i = 0; i < countryInfo.release_dates.length; i++) {
                const releaseDateInfo = countryInfo.release_dates[i];
                certification = releaseDateInfo.certification;

                if (certification) break;
            }
        }

        if (!certification) certification = "N/A";

        return certification;
    }

    // Parse the first 12 cast members
    const parseCast = (cast) => {
        let parsedCast = [];
        for (let i = 0; i < cast.length; i++) {
            let profilePath = "";
            (!cast[i].profile_path)
                ? profilePath = null
                : profilePath = `${IMAGE_PATH_ENDPOINT}/w185/${cast[i].profile_path}`;

            parsedCast.push(
                {
                    name: cast[i].name,
                    character: cast[i].character,
                    picture: profilePath,
                }
            )

            if (i===12) {
                break;
            }
        }

        return parsedCast;
    }

    // Extract required information from movie object
    const parseMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            backdropPath: `${IMAGE_PATH_ENDPOINT}/w1280${movie.backdrop_path}`,
            posterPath: movie.poster_path
                ? `${IMAGE_PATH_ENDPOINT}/w300${movie.poster_path}`
                : posterPlaceholder,
            rating: movie.vote_average.toFixed(1),
            releaseDate: parseDate(movie.release_date),
            runtime: minutesToHourMinutes(movie.runtime),
            genres: parseGenres(movie.genres),
            overview: movie.overview,
            certification: parseCertification(movie.release_dates.results),
            cast: parseCast(movie.credits.cast),
            trailer: parseVideos(movie.videos),
        };
    }

    // Movie data fetching
    useEffect(() => {
        // Fetch the movie
        const fetchMovie = async () => {
            try {
                const fetchUrl = `${MOVIE_ENDPOINT}/${id}?api_key=${API_KEY}&append_to_response=release_dates,credits,videos`;
                const response = await fetch(fetchUrl);
                const data = await response.json();
                
                if (response.ok) {
                    setMovie(parseMovie(data));
                    setMovieItemObj(createMovieObject(data));
                } else {
                    navigate("/error");   // navigate to error page
                }

            } catch (err) {
                console.error("Error fetching movie: ", err.message);
            }
        }

        fetchMovie();
    }, [id]);


    // Device layout based on window width
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < tabletWidth) {
                setIsMobile(true);
            } else if (screenWidth >= tabletWidth) {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return (
        <main className="movieInfoPage">
            {movie 
                ? (
                    <>
                        <section className="heroSection">
                            <div className="heroContainer">
                                <div className="heroImageContainer">
                                {movie.backdropPath ? (
                                    <img className="heroImage" src={movie.backdropPath} alt={movie.title} />
                                ) : (
                                    // Ensure the path to your placeholder image is correct and accessible
                                    <img className="heroImage" src={backdropPlaceholder} alt="No backdrop found" />
                                )}
                                </div>
            
                                <div className="heroTextContainer">
            
                                    {isMobile 
                                        ? (   // Mobile
                                            <>
                                                <div className="headerContainer">
                                                    <h1>{movie.title}</h1>
                                                    <AddToListBtn movieItemObj={movieItemObj} isInMyList={isInMyList(myList, movie.id)} handleClick={handleMyListClick} />
                                                </div>
                                                <h3>Overview</h3>
                                                <p>{movie.overview ? movie.overview : "N/A"}</p>
                                            </>
                                        )
                                        : (   // Tablet/desktop
                                            <>
                                                <div className="textWrapper">
                                                    <div className="headerContainer">
                                                        <h1>{movie.title}</h1>
                                                        <AddToListBtn movieItemObj={movieItemObj} isInMyList={isInMyList(myList, movie.id)} handleClick={handleMyListClick} />
                                                    </div>
                                                    <h3>Overview</h3>
                                                    <p>{movie.overview ? movie.overview : "N/A"}</p>
                                                </div>
            
                                                <div className="moviePosterContainer">
                                                    <img src={movie.posterPath} />
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </section>
                        <div className="movieInfoWrapper">
                            <section className="belowHeroSection">
                                <div className="rowWrapper">
                                    <div className="ratingContainer">
                                        <Rating rating={movie.rating} />
                                        <p className="certification">{movie.certification}</p>
                                    </div>
                                </div>
                                <div className="genreContainer">
                                    {
                                        (movie.genres.length > 0)
                                            ? movie.genres.map(genre => (
                                                <p key={genre} className="genre">{genre}</p>
                                            ))
                                            : <p className="genre">Genre N/A</p>
                                    }
                                </div>
                                <div className="dateContainer">
                                    <p>{movie.releaseDate}</p>
                                    <p>{movie.runtime}</p>
                                </div>
            
                                {isMobile && 
                                    <div className="moviePosterContainer">
                                        <img src={movie.posterPath} />
                                    </div>
                                }
            
                                <div className="trailerContainer">
                                    <iframe
                                        title={`${movie.title} Trailer`}
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${movie.trailer}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    >
                                    </iframe>
                                </div>
                                    
                                <div className="castContainer">
                                    <h3>Cast</h3>
                                    <div className="cast">
                                        {movie.cast.map(actor => (
                                            <Actor key={actor.name} actor={actor} />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </>
                )

                : (
                    <h1>404 ERROR</h1>
                )
            }
        </main>
    )
}

export default MoviePage;