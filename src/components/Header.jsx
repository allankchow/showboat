import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { tabletWidth } from '../globals/globalVariables';
import Nav from './Nav';
import HamburgerMenu from './HamburgerMenu';

const Header = () => {

    const [showNav, setShowNav] = useState(false);
    const [logoSrc, setLogoSrc] = useState("/src/assets/logo/movie-database-logo.png");

    const logo = "/src/assets/logo/movie-database-logo.png";
    const logoHover = "/src/assets/logo/movie-database-logo-hover.png"

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
                <NavLink to="/">
                    <img 
                        src={logoSrc} 
                        alt="Site Logo" 
                        onMouseOver={() => setLogoSrc(logoHover)}
                        onMouseLeave={() => setLogoSrc(logo)}
                    />
                </NavLink>
            </div>
            <HamburgerMenu showNav={showNav} toggleNav={toggleNav}/>
            <Nav toggleNav={toggleNav}/>
        </header>
    )
}

export default Header;