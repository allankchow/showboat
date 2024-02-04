
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { API_KEY, MOVIE_ENDPOINT, IMAGE_PATH_ENDPOINT } from '../globals/globalVariables';

const MoviePage = () => {

    // const { id } = useParams();
    const id = "787699";
    // const id = "572802";
    // const id = "933131";
    
    const [movie, setMovie] = useState(null);

    const minutesToHourMinutes = (seconds) => {
        const hours = Math.floor(seconds/60);
        const minutes = Math.floor(seconds % 60);

        return `${hours}h ${minutes}m`;
    }

    const parseGenres = (genres) => {
        return genres.map(genre => genre.name);
    }

    const parseMovie = (movie) => {
        return {
            title: movie.original_title,
            backdrop: `${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`,
            rating: movie.vote_average.toFixed(1),
            releaseDate: movie.release_date,
            runtime: minutesToHourMinutes(movie.runtime),
            genres: parseGenres(movie.genres),
            overview: movie.overview,
        };
    }

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(`${MOVIE_ENDPOINT}/${id}?api_key=${API_KEY}`);
            const data = await response.json();
            setMovie(parseMovie(data));

            console.log(parseMovie(data))
        }

        const fetchCertification = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`);
            const data = await response.json();
            const certifications = data.results;

            const countryInfo = certifications.find(country => country.iso_3166_1 === "US");
            if (countryInfo) {
                countryInfo.release_dates.forEach(releaseDateInfo => {
                    const certification = releaseDateInfo.certification;
                    if (certification) {
                        setMovie({...movie, certification: certification});
                    }
                });
            }
        }

        fetchMovie();
        fetchCertification();
    }, []); 

    

    return (
        <div>Movie Page {id}</div>
    )
}

export default MoviePage;