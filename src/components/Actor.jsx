const Actor = ({ actor }) => {

    return (
        <div className="actorCard">
            <img src={actor.picture} />
            <div className="actor">
                <p className="actorName">{actor.name}</p>
                <p className="actorCharacter">{actor.character}</p>
            </div>
        </div>
    )
}

export default Actor