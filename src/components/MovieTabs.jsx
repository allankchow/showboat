import { useEffect, useState, useRef } from 'react';
import {    API_KEY, 
            IMAGE_PATH_ENDPOINT, 
            POPULAR_ENDPOINT, 
            NOW_PLAYING_ENDPOINT, 
            TOP_RATED_ENDPOINT, 
            UPCOMING_ENDPOINT,
        } from '../globals/globalVariables';
import { isInMyList } from '../globals/utilityFunctions';
import MovieItem from './MovieItem';

function MovieTabs({ myList }) {

    // initialize states
    const [currentTab, setCurrentTab] = useState('popular');
    const [movies, setMovies] = useState([]);
    const tabsRefs = useRef({}); // initializing with empty object
    const [displayCount, setDisplayCount] = useState(12); // number of movies to be displayed
    const [currentPage, setCurrentPage] = useState(1);

    // endpoints object
    const tabs = {
        popular: POPULAR_ENDPOINT,
        now_playing: NOW_PLAYING_ENDPOINT,
        top_rated: TOP_RATED_ENDPOINT,
        upcoming: UPCOMING_ENDPOINT,
    };

    // changes to desired date format
    function formatDate(date) {
        date = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); //localize date
    }

    // extracts only useful data from fetched api movies data
    const transformMoviesData = (movies) => {
        return movies.map(movie => ({
            posterPath: movie.poster_path ? `${IMAGE_PATH_ENDPOINT}/w300${movie.poster_path}` : null,
            id: movie.id,
            // title: movie.title,
            title: movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title, //limit title characters 
            releaseDate: formatDate(movie.release_date),
            voteAverage: movie.vote_average.toFixed(1), // round to 1 decimal place
            overview: movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview, // Limit to 100 characters 
        }));
    }

    // useEffect to fetch and update movie api data
    useEffect (() => {
        const fetchMovies = async () => {
            const endpoint = `${tabs[currentTab]}&api_key=${API_KEY}&page=${currentPage}`;
            {console.log(endpoint)}
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                setMovies(prevMovies => {
                    const allMovies = [...prevMovies, ...transformMoviesData(data.results)];

                    // filter out movie duplicates
                    const uniqueMovies = allMovies.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));
                    return uniqueMovies;
                }); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchMovies();
    }, [currentTab, currentPage]);

    // useEffect to change page back to 1 on tab switch
    useEffect(() => {
        // Reset movies and page number when changing tabs
        setMovies([]);
        setCurrentPage(1);
        setDisplayCount(12);
    }, [currentTab]);

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

    // called on "see more" button click
    const handleSeeMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
        setDisplayCount(prevDisplayCount => prevDisplayCount + 12);
    }

    // start of jsx
    return(
        <div>
            <div className="tabs-container">
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
            </div>

            <div className="tab-content">
                {movies.length > 0 ? (
                    // scenario 1: there is atleast a movie in the movies array
                    movies.slice(0, displayCount).map((movie) => (
                        // pass movie object as a prop to MovieItem
                        <MovieItem key={movie.id} movie={movie} isInMyList={isInMyList(myList, movie.id)}/> 
                    ))
                ) : (
                    // scenario 2: no movies in the movies array
                    <p>No movies found!</p>)}
            </div>
            <div>
                {/* show see more button if the movies array is greater than 12 */}
                {displayCount < movies.length && (
                    <button className = "see-more-btn" onClick={handleSeeMore}>See More</button>
                )}
            </div>
        </div>
    );
}

export default MovieTabs;