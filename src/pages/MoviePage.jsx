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
import Actor from "../components/Actor";
import MobileInfo from "../components/MobileInfo";
import TabletDesktopInfo from "../components/TabletDesktopInfo";

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
                    character: cast[i].character,
                    picture: `${IMAGE_PATH_ENDPOINT}/w185/${cast[i].profile_path}`
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
            backdropPath: `${IMAGE_PATH_ENDPOINT}/w1280${movie.backdrop_path}`,
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

                console.log(data)
    
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

    // console.log(movie);

    return (
        <main className="movieInfoPage">
            {movie 
                ? <>
                    {layout === "mobile" && (
                        <MobileInfo movie={movie} AddToListBtn={AddToListBtn} Actor={Actor} />
                    )}
                    
                    {(layout === "tablet" || layout === "desktop") && (
                        <TabletDesktopInfo movie={movie} AddToListBtn={AddToListBtn} Actor={Actor} />
                    )}
                </>

                : (
                    <h1>404 ERROR</h1>
                )
            }
        </main>
    )
}

export default MoviePage;