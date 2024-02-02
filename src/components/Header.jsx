import { useState, useEffect } from "react";

import Nav from './Nav';
import HamburgerMenu from './HamburgerMenu';
import { NavLink } from 'react-router-dom';

const Header = () => {

    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 800px)');
        mediaQuery.addEventListener('change', isDesktop);

        return () => mediaQuery.removeEventListener('change', isDesktop);

    }, []);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    const isDesktop = (e) => {
        if (e.matches) {
            setShowNav(false);
        }
    }

    return (
        <header className={showNav ? "show" : ""}>
            <div className="logoContainer">
                <NavLink to="/">
                    <div>LOGO PLACEHOLDER</div>
                </NavLink>
            </div>
            <HamburgerMenu isOpened={showNav} toggleNav={toggleNav}/>
            <Nav toggleNav={toggleNav}/>
        </header>
    )
}

export default Header;