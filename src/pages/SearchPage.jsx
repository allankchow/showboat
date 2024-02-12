import { useState, useEffect, useRef } from "react"; 
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { API_KEY, SEARCH_ENDPOINT } from '../globals/globalVariables';

import { createMovieObject, isInMyList } from "../globals/utilityFunctions";
import MovieItem from "../components/MovieItem";

const SearchPage = () => {

    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState(null);
    const [resultInfo, setResultInfo] = useState({totalPages: 0, totalResults: 0});
    const [currentPage, setCurrentPage] = useState(1);

    // get myList movies from local storage
    const myList = useSelector((state) => state.myList.items);

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
            <section className="searchResults">
                <div className="headerContainer">
                    <h1>Results for "{searchTerm}"</h1>
                    {resultInfo.totalPages === 0
                        ? <p>Page 0 of {resultInfo.totalPages}</p>
                        : <p>Page {currentPage} of {resultInfo.totalPages}</p>
                    }
                </div>
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