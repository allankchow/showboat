import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { API_KEY, SEARCH_ENDPOINT } from '../globals/globalVariables';

import { createMovieObject, isInMyList } from "../globals/utilityFunctions";
import MovieItem from "../components/MovieItem";

const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState(null);
    const [resultInfo, setResultInfo] = useState({totalPages: 0, totalResults: 0});
    // const [currentPage, setCurrentPage] = useState(1);

    const currentPage = new URLSearchParams(location.search).get('page') || 1;

    // get myList movies from local storage
    const myList = useSelector((state) => state.myList.items);


    // Function to handle page change
    const handlePageChange = (newPage) => {
        // Update URL parameters and trigger navigation
        navigate(`${location.pathname}?page=${newPage}`);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchUrl = `${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage}`;
                const response = await fetch(fetchUrl);
                const data = await response.json();
                
                setSearchResults(data.results.map(movie => { return createMovieObject(movie)}));
                setResultInfo({totalPages: data.total_pages, totalResults: data.total_results});

            } catch (err) {
                console.error("Error fetching movies");
            }
        }

        fetchMovies();
    }, [searchTerm, currentPage]);
    

    return (
        <main>
            <section className="searchResultSection">
                <div className="headerContainer">
                    <h1>Search results for "{searchTerm}"</h1>
                    {resultInfo.totalPages === 0
                        ? <p className="totalPages">Page 0 of {resultInfo.totalPages}</p>
                        : <p className="totalPages">Page {currentPage} of {resultInfo.totalPages}</p>
                    }
                </div>
                {resultInfo.totalPages > 1 && (
                        <div className="buttonContainer">
                            <button
                                onClick={() => handlePageChange(Number(currentPage) - 1)}
                                disabled={currentPage <= 1}
                            >
                                Previous
                            </button>
                            <p className="currentPage">{currentPage}</p>
                            <button
                                onClick={() => handlePageChange(Number(currentPage) + 1)}
                                disabled={currentPage >= resultInfo.totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                <div className="movieContainer">
                    {searchResults && (
                        searchResults.map(movie => (
                            <MovieItem key={movie.id} movie={movie} isInMyList={isInMyList(myList, movie.id)} />
                        ))
                    )}
                </div>

            </section>
        </main>
    )
}

export default SearchPage;