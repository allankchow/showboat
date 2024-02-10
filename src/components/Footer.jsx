import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare, faXTwitter} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';



const Footer = () => {
    const [logoSrc, setLogoSrc] = useState("/src/assets/logo/movie-database-logo-no-text.png");

    const logo = "/src/assets/logo/movie-database-logo-no-text.png";
    const logoHover = "/src/assets/logo/movie-database-logo-no-text-hover.png"

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
                            <Link to="/">Home</Link>
                            <Link to="/mylist">My List</Link>
                            <Link to="/about">About</Link>
                    </div>
                    <div className="footerCategory">
                        <Link to="#">Popular</Link>
                        <Link to="#">Now Playing</Link>
                        <Link to="#">Top Rated</Link>
                        <Link to="#">Upcoming</Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footerCopyright">@2023 Showboat</div>
        </footer>
    )
}

export default Footer;