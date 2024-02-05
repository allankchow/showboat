import defaultProfilePic from "../assets/images/default-profile-picture.png";

const Actor = ({ actor }) => {

    return (
        <div className="actorCard">
            <img 
                src={
                    (!actor.picture)
                        ? defaultProfilePic
                        : actor.picture
                } 
                alt={
                    (!actor.picture)
                        ? "Default profile picture"
                        : actor.name
                } 
            />
            <div className="actor">
                <p className="actorName">{actor.name}</p>
                <p className="actorCharacter">{actor.character}</p>
            </div>
        </div>
    )
}

export default Actor