import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {

    return (
        <nav className='siteNavigation'>
            <ul>
                {/* Nav links */}
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/my-list">MY LIST</NavLink></li>
                <li><NavLink to="/about">ABOUT</NavLink></li>

                {/* Search input */}
                <form className="searchInput">
                    <div className='searchInputContainer'>
                        <input type="text" id="searchInput" name="searchInput" placeholder='Search...'/>
                        <button type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </form>
            </ul>
        </nav>
    )
}

export default Nav;