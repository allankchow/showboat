
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { 
    API_KEY, 
    MOVIE_ENDPOINT, 
    IMAGE_PATH_ENDPOINT
} from "../globals/globalVariables";

import { parseVideos } from "../globals/utilityFunctions";

const MoviePage = () => {

    // const { id } = useParams();
    const id = "787699";
    // const id = "572802";
    // const id = "933131";
    
    const [movie, setMovie] = useState(null);

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
            backdrop: `${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`,
            poster: `${IMAGE_PATH_ENDPOINT}/original${movie.poster_path}`,
            rating: movie.vote_average.toFixed(1),
            releaseDate: movie.release_date,
            runtime: minutesToHourMinutes(movie.runtime),
            genres: parseGenres(movie.genres),
            overview: movie.overview,
            certification: parseCertification(movie.release_dates.results),
            cast: parseCast(movie.credits.cast),
            trailer: parseVideos(movie.videos),
        };
    }

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

    
    // console.log(movie)
    return (
        <main>
            <section className="movieInfoPage">
                {movie 
                    ? (
                        <>
                            <h1>{movie.title}</h1>

                        </>
                    )
                    : (
                        <h1>404 ERROR</h1>
                    )
                }
            </section>
        </main>
    )
}

export default MoviePage;