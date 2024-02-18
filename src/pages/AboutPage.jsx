import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

import tmdbAttributionLogo from '../assets/images/tmdb-attribute-logo.svg';
import aboutImage from '../assets/images/about-image.jpg';

const AboutPage = () => {

    useEffect(() => {
        document.title = `${appTitle} - About`;
    }, []);

    return (
        <main className="about">
            <section className="about-section-01"> 
                <h2>ABOUT</h2>
                <h3>Welcome Aboard The ShowBoat! - The Ultimate Cinema Voyage </h3>
                <p>Embark on a journey with ShowBoat, where movies are more than just entertainment; they are voyages into the depths of storytelling, artistry, and the souls behind the scenes. At ShowBoat, we chart the waters of cinema, navigating through the tales each film tells and the myriad perspectives of our audience. Our platform is the deck from which you can dive into the endless ocean of cinematic narratives, a place where stories are shared, discussed, and cherished.</p>
                <h3>Our Compass</h3>
                <p>To navigate the vast and vibrant seas of cinema, connecting movie lovers to the rich tapestry of films that span the spectrum from heart-pounding blockbusters to the understated beauty of indie gems, from golden age classics to the cutting-edge of modern storytelling. ShowBoat is your sextant to the stars of the movie universe, guiding you to your next cinematic discovery.</p>
                <img src={aboutImage} alt="Person watching shows"/>
                <h3>Set Sail with ShowBoat</h3>
                <p>Join us on this grand voyage across the silver screen's horizons. Explore, interact, and immerse yourself in the wonder of movies. Your ticket is booked, and your cabin awaits. The world of cinema beckons—let ShowBoat be your guide to its endless stories and uncharted waters. Welcome aboard, where every film is a journey, and every viewer is a voyager.</p>

                <div className="tmdbAttribution">
                    <img src={tmdbAttributionLogo} alt="TMDB Logo" />
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                </div>
            </section>
        </main>
    )
}

export default AboutPage;