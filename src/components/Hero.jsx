import { IMAGE_PATH_ENDPOINT } from "../globals/globalVariables";

const Hero = ({ movie }) => {

    return (
        <div className="heroImageContainer">
            <img className="heroImage" src={`${IMAGE_PATH_ENDPOINT}/original${movie.backdrop_path}`} /> 
        </div>
    )
}


export default Hero;