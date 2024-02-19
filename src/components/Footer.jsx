import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare, faXTwitter} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import logo from "/src/assets/logo/movie-database-logo-no-text.png";
import logoHover from "/src/assets/logo/movie-database-logo-no-text-hover.png";

import { scrollToTop } from '../globals/utilityFunctions';

const Footer = () => {
    const [logoSrc, setLogoSrc] = useState(logo);

    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerLogoSocials">
                    <Link to="/">
                        <img 
                            src={logoSrc} 
                            alt="Site Logo" 
                            onMouseOver={() => setLogoSrc(logoHover)}
                            onMouseLeave={() => setLogoSrc(logo)}
                        />
                    </Link>
                    <div className="footerSocials">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />   
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </a>
                    </div>
                </div>
                <div className="footerLinks">
                    <div className="footerNav">
                            <Link to="/" onClick={scrollToTop}>Home</Link>
                            <Link to="/my-list" onClick={scrollToTop}>My List</Link>
                            <Link to="/about" onClick={scrollToTop}>About</Link>
                    </div>
                    <div className="footerCategory">
                        <Link to="/popular">Popular</Link>
                        <Link to="/now_playing">Now Playing</Link>
                        <Link to="/top_rated">Top Rated</Link>
                        <Link to="/upcoming">Upcoming</Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footerCopyright">@2023 ShowBoat</div>
        </footer>
    )
}

export default Footer;