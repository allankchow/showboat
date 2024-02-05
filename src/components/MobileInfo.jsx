const MobileInfo = ({ movie, AddToListBtn, Actor }) => {
    
    return (
        <>
            <section className="heroSection">
                <div className="heroContainer">
                    <div className="heroImageContainer">
                        <img className="heroImage" src={movie.backdropPath} alt={movie.title} /> 
                    </div>

                    <div className="heroTextContainer">
                        <div className="headerContainer">
                            <h1>{movie.title}</h1>
                            <AddToListBtn />
                        </div>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </section>
            <div className="movieInfoWrapper">
                <section className="belowHeroSection">
                    <div className="rowWrapper">
                        <div className="ratingContainer">
                            <p className="rating">{movie.rating}</p>
                            <p className="certification">{movie.certification}</p>
                        </div>
                    </div>
                    <div className="genreContainer">
                        {
                            (movie.genres.length > 0)
                                ? movie.genres.map(genre => (
                                    <p key={genre} className="genre">{genre}</p>
                                ))
                                : <p className="genre">Genre N/A</p>
                        }
                    </div>
                    <div className="dateContainer">
                        <p>{movie.releaseDate}</p>
                        <p>{movie.runtime}</p>
                    </div>

                    <div className="moviePosterContainer">
                        <img src={movie.posterPath} />
                    </div>

                    {movie.trailer && (
                        <div className="trailerContainer">
                            <iframe
                                title={`${movie.title} Trailer`}
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${movie.trailer}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                    )}

                    <div className="castContainer">
                        <h3>Cast</h3>
                        <div className="cast">
                            {movie.cast.map(actor => (
                                <Actor key={actor.name} actor={actor} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MobileInfo;