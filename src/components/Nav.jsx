import { NavLink } from 'react-router-dom';

const Nav = () => {

    return (
        <nav>
            <ul>
                {/* Nav links */}
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/my-list">MY LIST</NavLink></li>
                <li><NavLink to="/about">ABOUT</NavLink></li>

                {/* Search input */}
                <form className="searchInput">
                    <input type="text" id="searchInput" name="searchInput" />
                </form>
            </ul>
        </nav>
    )
}

export default Nav;