import { REQUEST_OPTIONS, IMAGE_PATH_ENDPOINT } from "../globals/globalVariables";
import AddToListBtn from "./AddToListBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Hero = ({ movie }) => {

    // let videos = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
    // console.log(videos);

    // let videosLink = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
    let videosLink = `https://api.themoviedb.org/3/movie/852445/videos`;
    const fetchVideos = async() => {
        let response = await fetch(videosLink, REQUEST_OPTIONS);
        let videos = await response.json();

        // console.log(videos);
    }

    fetchVideos();

    return (
        <div className="heroContainer">
            <div className="heroImageContainer">
                <img className="heroImage" src={`${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`} alt={movie.title} /> 
            </div>

            <div className="heroTextContainer">
                <h3>NOW PLAYING:</h3>
                <h1>{movie.title}</h1>

                <div className="utilityBtnContainer">
                    <button className="playTrailerBtn">PLAY TRAILER</button>
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