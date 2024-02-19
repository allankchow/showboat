import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import {    API_KEY, 
            IMAGE_PATH_ENDPOINT, 
            POPULAR_ENDPOINT, 
            NOW_PLAYING_ENDPOINT, 
            TOP_RATED_ENDPOINT, 
            UPCOMING_ENDPOINT,
        } from '../globals/globalVariables';
import { isInMyList, createMovieObject } from '../globals/utilityFunctions';
import MovieItem from './MovieItem';


function MovieTabs({ myList }) {

    // initialize states
    const [currentTab, setCurrentTab] = useState('popular');
    const [movies, setMovies] = useState([]);
    const tabsRefs = useRef({}); // initializing with empty object
    const [displayCount, setDisplayCount] = useState(12); // number of movies to be displayed
    const [currentPage, setCurrentPage] = useState(1);
    const { tab } = useParams(); // Get tab parameter from URL
    const tabContentRef = useRef(null); // used for scrolling tab into view
    const navigate = useNavigate(); // to change url on tab change

    // endpoints object
    const tabs = {
        popular: POPULAR_ENDPOINT,
        now_playing: NOW_PLAYING_ENDPOINT,
        top_rated: TOP_RATED_ENDPOINT,
        upcoming: UPCOMING_ENDPOINT,
    };

    // called when tabs changed to update url
    const changeTab = (newTab) => {
        setCurrentTab(newTab);
        navigate(`/${newTab}`); // Change the URL to the new tab
    };

    //useeffect to set tab based on url, and scroll to tab from external page
    useEffect(() => {
        if (tab && tabs[tab]) {
            setCurrentTab(tab);
        } else {
            navigate('/'); // Redirect to a valid tab if URL param is invalid
            return;
        }
        // Delayed scroll to account for dynamic content loading
        setTimeout(() => {
            if (tabContentRef.current) {
                const position = tabContentRef.current.getBoundingClientRect().top + window.pageYOffset;
                const offset = 90; // Adjust as needed
                window.scrollTo({ top: position - offset, behavior: 'smooth' });
            }
        }, 100); // Adjust delay as necessary
    }, [tab, currentTab, navigate]);
    

    // useEffect to fetch and update movie api data
    useEffect (() => {
        const fetchMovies = async () => {
            const endpoint = `${tabs[currentTab]}&api_key=${API_KEY}&page=${currentPage}`;
            // {console.log(endpoint)}
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                const transformedMovies = data.results.map(createMovieObject);
                setMovies(prevMovies => {
                    const allMovies = [...prevMovies, ...transformedMovies];

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
                inline: 'center'         // horizontal alignment
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
            <div className="tab-content" ref={tabContentRef}>
                <div className="tabs-container">
                    <div className ="tabs">
                        {/* iterate over tabs object and use them to dynamically create tabs */}
                        {Object.keys(tabs).map((tab, index) => (
                            <button 
                                key={tab}
                                ref={element => (tabsRefs.current[tab] = element)} //Assign DOM element to the tabRefs object
                                className={isActive(tab) ? 'active' : ''} //adds class "active" if tab is active
                                onClick={() => changeTab(tab)} 
                            >
                                {tab.replace('_', ' ').toUpperCase()}
                            </button>
                        ))}
                    </div>
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