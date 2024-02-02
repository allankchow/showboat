import { useState, useEffect } from "react";
import { 
    appTitle,
    REQUEST_OPTIONS,
    NOW_PLAYING_ENDPOINT,
    POPULAR_ENDPOINT,
    TOP_RATED_ENDPOINT,
    UPCOMING_ENDPOINT,
    IMAGE_PATH_ENDPOINT
} from "../globals/globalVariables";

const HomePage = () => {

    const [movieData, setMovieData] = useState([]);
    const [heroMovie, setHeroMovie] = useState({});

    useEffect(() => {
        document.title = `${appTitle} - Home`;
    }, []);

    useEffect(() => {
        const fetchMovies = async() => {
            const response = await fetch(NOW_PLAYING_ENDPOINT, REQUEST_OPTIONS);
            let data = await response.json();

            setMovieData(data.results);
            setHeroMovie(data.results[0]);
        }

        fetchMovies();

    }, []);


    return (
        <main>
            <div className="heroImageContainer">
                {heroMovie && <img className="heroImage" src={`${IMAGE_PATH_ENDPOINT}/original${heroMovie.backdrop_path}`} />} 
            </div>
        </main>
    )
}

export default HomePage;