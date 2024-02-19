import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { tabletWidth } from '../globals/globalVariables';
import { scrollToTop } from "../globals/utilityFunctions";

import Nav from './Nav';
import HamburgerMenu from './HamburgerMenu';

import logo from "/src/assets/logo/movie-database-logo.png";
import logoHover from "/src/assets/logo/movie-database-logo-hover.png";

const Header = () => {

    const [showNav, setShowNav] = useState(false);
    const [logoSrc, setLogoSrc] = useState(logo);

    // Add an event listener which watches the screen width 
    useEffect(() => {
        let mediaQuery = window.matchMedia(`(min-width: ${tabletWidth}px)`);
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
                <NavLink to="/" onClick={scrollToTop}>
                    <img 
                        src={logoSrc} 
                        alt="Showboat movie database logo" 
                        onMouseOver={() => setLogoSrc(logoHover)}
                        onMouseLeave={() => setLogoSrc(logo)}
                    />
                </NavLink>
            </div>
            <HamburgerMenu showNav={showNav} toggleNav={toggleNav} />
            <Nav toggleNav={toggleNav} scrollToTop={scrollToTop} />
        </header>
    )
}

export default Header;