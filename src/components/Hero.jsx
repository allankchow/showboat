import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { REQUEST_OPTIONS, IMAGE_PATH_ENDPOINT } from "../globals/globalVariables";
import { parseVideos } from "../globals/utilityFunctions";
import AddToListBtn from "./AddToListBtn";

const Hero = ({ movie }) => {

    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchVideos = async() => {
            // Get the movie videos
            const videosLink = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
            const response = await fetch(videosLink, REQUEST_OPTIONS);
            const videos = await response.json();
            
            const trailerVideo = parseVideos(videos);
            
            setTrailer(trailerVideo);
        }
    
        fetchVideos();
    }, [movie]);

    // Open the traile in a new tab
    const openTrailer = () => {
        if (trailer) {
            let youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            window.open(youtubeUrl, '_blank');
        }
    }

    return (
        <div className="heroContainer">
            <div className="heroImageContainer">
                <img className="heroImage" src={`${IMAGE_PATH_ENDPOINT}/w1280${movie.backdrop_path}`} alt={movie.title} /> 
            </div>

            <div className="heroTextContainer">
                <h3>NOW PLAYING:</h3>
                <h1>{movie.title}</h1>

                <div className="utilityBtnContainer">
                    <button className="playTrailerBtn" onClick={trailer ? openTrailer : null}>PLAY TRAILER</button>
                    <div className="infoAddContainer">
                        <div className="infoBtn">
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </div>
                        <AddToListBtn size="1x" />    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Hero;