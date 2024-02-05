import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare,} from '@fortawesome/free-brands-svg-icons';
import faTwitter from '../assets/x-twitter-white.svg';



const Footer = () => {

    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerLogoSocials">
                    <img src="/src/assets/logo/movie-database-logo-no-text.png" alt="Site Logo" />
                    <div className="footerSocials">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <img className="faTwitter" src={faTwitter} alt="x-twitter icon" />
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </a>
                    </div>
                </div>
                <div className="footerLinks">
                    <div className="footerNav">
                        <a href="#">Home</a>
                        <a href="#">My List</a>
                        <a href="#">About</a>
                    </div>
                    <div className="footerCategory">
                        <a href="#">Popular</a>
                        <a href="#">Now Playing</a>
                        <a href="#">Top Rated</a>
                        <a href="#">Upcoming</a>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footerCopyright">@2023 Showboat</div>
        </footer>
    )
}

export default Footer;