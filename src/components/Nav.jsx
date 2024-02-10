import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { 
    API_KEY,
    SEARCH_ENDPOINT,
    tabletWidth
} from '../globals/globalVariables';

const Nav = ({ toggleNav, scrollToTop }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const closeNav = (e) => {
        if (window.innerWidth < tabletWidth) {
            toggleNav();
        } else {
            e.target.blur();
        }
    }

   // Handle click on the search input to prevent closing the nav
    const handleSearchClick = (e) => {
        e.stopPropagation();
    }

    const handleSearchChange = async (query) => {
        setSearchQuery(query);
        const endPoint = `${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${query}`;
        try {
            const response = await fetch(endPoint);
            const data = await response.json();

            setSearchResults(data.results);
            console.log(data);

        } catch (error) {
            console.error('Error fetching movies:', error);
        }


    }

    return (
        <nav className="siteNavigation" onClick={closeNav}>
            <ul>
                {/* Nav links */}
                <li><NavLink to="/" onClick={scrollToTop}>HOME</NavLink></li>
                <li><NavLink to="/my-list" onClick={scrollToTop}>MY LIST</NavLink></li>
                <li><NavLink to="/about" onClick={scrollToTop}>ABOUT</NavLink></li>

                {/* Search input */}
                <form className="searchInput">
                    <div className='searchInputContainer'>
                        <input 
                            type="text" 
                            id="searchInput" 
                            name="searchInput" 
                            placeholder='Search...'
                            value={searchQuery}
                            onClick={handleSearchClick}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <button type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>

                    {/* Display search results */}
                    {searchResults.length > 0 && (
                        <ul className="searchResults">
                            {searchResults.map(result => (
                                <li key={result.id}>
                                    <Link to={`/movie/${result.id}`}>{result.title}</Link> 
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </ul>
        </nav>
    )
}

export default Nav;