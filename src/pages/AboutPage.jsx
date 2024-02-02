import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

import aboutImage01 from '../assets/images/about-image-01.jpg';

const AboutPage = () => {

    useEffect(() => {
        document.title = `${appTitle} - About`;
    }, []);

    return (
        <>
            <div class="about">
                <section class="about-section-01"> 
                    <h2>ABOUT</h2>
                    <h3>Welcome to ShowBoat - More Than a Movie Database </h3>
                    <p>ShowBoat is not just about movies; it's about the stories, the art, and the people behind them. We believe every film has a story and every viewer has a perspective. Our platform is a space for sharing those stories and perspectives, fostering a community that celebrates the art of cinema.</p>
                    <h3>Our Mission:</h3>
                    <p>To bridge the gap between movie enthusiasts and the vast, colorful world of cinema. Whether it's the adrenaline of blockbuster hits, the raw charm of indie films, the timeless appeal of classic masterpieces, or the innovative spirit of contemporary marvels, ShowBoat is your gateway to the universe of movies.</p>
                    <img src={aboutImage01} alt="Person watching shows"/>
                    <h3>Join Us:</h3>
                    <p>Whether you're a casual viewer or a hardcore cinephile, ShowBoat welcomes you aboard this cinematic voyage. Explore, engage, and be enthralled. The world of movies awaits you!</p>
                </section>
            </div>
        </>
    )
}

export default AboutPage;