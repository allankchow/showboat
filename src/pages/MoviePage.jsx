import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { 
    API_KEY, 
    MOVIE_ENDPOINT, 
    IMAGE_PATH_ENDPOINT,
    tabletWidth,
    desktopMediumWidth

} from "../globals/globalVariables";
import { parseVideos } from "../globals/utilityFunctions";
import AddToListBtn from "../components/AddToListBtn";

const MoviePage = () => {

    // const { id } = useParams();
    const id = "787699";
    // const id = "572802";
    // const id = "933131";
    
    const [movie, setMovie] = useState(null);
    const [layout, setLayout] = useState(null);

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

    const parseDate = (date) => {
        const dateObject = new Date(date);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };

        return dateObject.toLocaleDateString('en-US', options);
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

        return certification;
    }

    // Parse the first 8 cast members
    const parseCast = (cast) => {
        let parsedCast = [];
        for (let i = 0; i < cast.length; i++) {
            parsedCast.push(
                {
                    name: cast[i].name,
                    character: cast[i].character
                }
            )

            if (i===8) {
                break;
            }
        }

        return parsedCast;
    }

    // Extract required information from movie object
    const parseMovie = (movie) => {
        return {
            title: movie.original_title,
            backdropPath: `${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`,
            posterPath: `${IMAGE_PATH_ENDPOINT}/w300${movie.poster_path}`,
            rating: movie.vote_average.toFixed(1),
            releaseDate: parseDate(movie.release_date),
            runtime: minutesToHourMinutes(movie.runtime),
            genres: parseGenres(movie.genres),
            // genres: ["Comedy", "Family", "Fantasy", "Sci-fi", "LOOOOL"],
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
    
                setMovie(parseMovie(data));
            } catch (err) {
                console.error("Error fetching movie: ", err.message);
            }

        }

        fetchMovie();
    }, []);


    // Device layout based on window width
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < tabletWidth) {
                setLayout("mobile");
            } else if (screenWidth >= tabletWidth && screenWidth < desktopMediumWidth) {
                setLayout("tablet");
            } else {
                setLayout("desktop");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    console.log(movie);

    return (
        <main className="movieInfoPage">
            {movie 
                ? <>
                    {layout === "mobile" && (
                        <>  
                            <section className="heroSection">
                                <div className="heroContainer">
                                    <div className="heroImageContainer">
                                        <img className="heroImage" src={movie.backdropPath} alt={movie.title} /> 
                                    </div>

                                    <div className="heroTextContainer">
                                        <div className="headerContainer">
                                            <h1>{movie.title}</h1>
                                            <AddToListBtn />
                                        </div>
                                        <h3>Overview</h3>
                                        <p>{movie.overview}</p>
                                    </div>
                                </div>
                            </section>
                            <div className="movieInfoWrapper">
                                <section className="belowHeroSection">
                                    <div className="rowWrapper">
                                        <div className="ratingContainer">
                                            <p className="rating">{movie.rating}</p>
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

                                    <div className="moviePoster">
                                        <img src={movie.posterPath} />
                                    </div>

                                    {movie.trailer && (
                                        <div className="trailer">
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
                                    )}
                                </section>
                            </div>
                            
                        </>
                    )}
                    
                    {/* TODO */}
                    {/* {layout === "tablet" && (
                        <h1>Tablet</h1>
                    )}

                    {layout === "desktop" && (
                        <h1>Desktop</h1>
                    )} */}
                </>

                : (
                    <h1>404 ERROR</h1>
                )
            }
        </main>
    )
}

export default MoviePage;