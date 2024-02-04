import { useEffect, useState, useRef } from 'react';
import {    API_KEY, 
            IMAGE_PATH_ENDPOINT, 
            POPULAR_ENDPOINT, 
            NOW_PLAYING_ENDPOINT, 
            TOP_RATED_ENDPOINT, 
            UPCOMING_ENDPOINT,
        } from '../globals/globalVariables';

function MovieTabs() {

    // initialize states
    const [currentTab, setCurrentTab] = useState('popular');
    const [movies, setMovies] = useState([]);
    const tabsRefs = useRef({}); // initializing with empty object

    // endpoints object
    const tabs = {
        popular: POPULAR_ENDPOINT,
        now_playing: NOW_PLAYING_ENDPOINT,
        top_rated: TOP_RATED_ENDPOINT,
        upcoming: UPCOMING_ENDPOINT,
    };

    // extracts only useful data from fetched api movies data
    const transformMoviesData = (movies) => {
        return movies.map(movie => ({
            posterPath: movie.poster_path ? `${IMAGE_PATH_ENDPOINT}/w500${movie.poster_path}` : null,
            title: movie.title,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average.toFixed(1), // round to 1 decimal place
            overview: movie.overview.length > 100 ? movie.overview.slice(0, 150) + '...' : movie.overview, // Limit to 100 characters 
        }));
    }

    // useEffect to fetch and update movie api data
    useEffect(() => {
        const fetchMovies = async () => {
            const endpoint = tabs[currentTab]; // Use the selected tab to determine the endpoint
            const url = `${endpoint}&api_key=${API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const transformedMovies = transformMoviesData(data.results);
                setMovies(transformedMovies); // Set the transformed movies into the state
                console.log("Current tab:", currentTab);
                console.log("Fetching from endpoint:", endpoint);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchMovies();
    }, [currentTab]); // Dependency array to re-fetch data when currentTab changes


    // useEffect to ensure that the active tab is scrolled into view when it's selected
    useEffect(() => {
        const activeTabElement = tabsRefs.current[currentTab];
        if(activeTabElement) {
            activeTabElement.scrollIntoView({
                behavior: 'smooth', 
                block: 'nearest',       // vertical alignment
                inline: 'start'         // horizontal alignment
            });
        }
    }, [currentTab]);


    // helper function to determine if tab active
    const isActive = (tab) => currentTab === tab;

    // start of jsx
    return(
        <div>
            <div className ="tabs">
                {/* iterate over tabs object and use them to dynamically create tabs */}
                {Object.keys(tabs).map((tab, index) => (
                    <button 
                        key={tab}
                        ref={element => (tabsRefs.current[tab] = element)} //Assign DOM element to the tabRefs object
                        className={isActive(tab) ? 'active' : ''} //adds class "active" if tab is active
                        onClick={() => setCurrentTab(tab)} 
                    >
                        {tab.replace('_', ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {movies.length > 0 ? (
                    // scenario 1: there is atleast a movie in the movies array
                    movies.map((movie, index) => (
                        <div className="movie-item" key={index}>
                            {movie.posterPath ? (
                                // scenario 1: poster found
                                <img src={movie.posterPath} alt={`Poster for ${movie.title}`} />
                            ) : (
                                // scenario 2: no poster found
                                <div className="no-image">No Image Available</div> // Placeholder if no poster
                            )}
                            <div className = "overlay">
                                <h3>{movie.title}</h3>
                                <p>Release Date: {movie.releaseDate}</p>
                                <p>Vote Average: {movie.voteAverage}</p>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        ))
                ) : (
                    // scenario 2: no movies in the movies array
                    <p>No movies found!</p>)}
            </div>
        </div>
    );
}

export default MovieTabs;