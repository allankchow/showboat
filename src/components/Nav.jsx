import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { tabletWidth } from '../globals/globalVariables';

const Nav = ({ toggleNav }) => {

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

    return (
        // <nav className={`siteNavigation ${showNav ? 'show' : 'close'}`} onclick={closeNav}>
        <nav className="siteNavigation" onClick={closeNav}>
            <ul>
                {/* Nav links */}
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/my-list">MY LIST</NavLink></li>
                <li><NavLink to="/about">ABOUT</NavLink></li>

                {/* Search input */}
                <form className="searchInput">
                    <div className='searchInputContainer'>
                        <input 
                            type="text" 
                            id="searchInput" 
                            name="searchInput" 
                            placeholder='Search...'
                            onClick={handleSearchClick}
                        />
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