import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { REQUEST_OPTIONS, IMAGE_PATH_ENDPOINT } from "../globals/globalVariables";
import AddToListBtn from "./AddToListBtn";

const Hero = ({ movie }) => {

    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchVideos = async() => {
            // Get the movie videos
            let videosLink = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
            let response = await fetch(videosLink, REQUEST_OPTIONS);
            let videos = await response.json();
            
            // The results contain an array of video objects
            videos = videos.results;
            // Get only the trailers
            let trailerVideos = videos.filter(video => video.type === 'Trailer');
            // If there are more than 1 trailers, get the last one (which is the offical trailer)
            let trailerVideo = (trailerVideos.length > 0) 
                                    ? trailerVideos[trailerVideos.length - 1]
                                    : null;
            
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
                <img className="heroImage" src={`${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`} alt={movie.title} /> 
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
                        <AddToListBtn />    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Hero;