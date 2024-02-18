import { IMAGE_PATH_ENDPOINT } from '../globals/globalVariables';

const parseVideos = (videos) => {  
    // The results contain an array of video objects
    videos = videos.results;
    // Get only the trailers
    let trailerVideos = videos.filter(video => video.type === 'Trailer');
    // If there are more than 1 trailers, get the last one (which is the offical trailer)
    let trailerVideo = (trailerVideos.length > 0) 
                            ? trailerVideos[trailerVideos.length - 1].key
                            : null;
    return trailerVideo;
}

// This function checks whether a movie is in myList or not
const isInMyList = (myList, id) => {
    if (myList.length === 0) return false;

    return myList.some(movie => movie.id === id);
}


const parseDate = (date) => {
    const dateObject = new Date(date);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };

    return dateObject.toLocaleDateString('en-US', options);
}

const createMovieObject = (movie) => {
    return {
        posterPath: movie.poster_path ? `${IMAGE_PATH_ENDPOINT}/w300${movie.poster_path}` : null,
        id: movie.id,
        title: movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title, //limit title characters 
        releaseDate: parseDate(movie.release_date),
        voteAverage: movie.vote_average.toFixed(1), // round to 1 decimal place
        overview: movie.overview.length > 80 ? movie.overview.slice(0, 80) + '...' : movie.overview, // Limit to 100 characters 
    }
}

const scrollToTop = (e) => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export { 
    parseVideos, 
    isInMyList,
    parseDate,
    createMovieObject,
    scrollToTop,
};