const parseVideos = (videos) => {  
    // The results contain an array of video objects
    videos = videos.results;
    // Get only the trailers
    let trailerVideos = videos.filter(video => video.type === 'Trailer');
    // If there are more than 1 trailers, get the last one (which is the offical trailer)
    let trailerVideo = (trailerVideos.length > 0) 
                            ? trailerVideos[trailerVideos.length - 1]
                            : null;
    return trailerVideo.key;
}

// This function checks whether a movie is in myList or not
const isInMyList = (myList, id) => {
    if (myList.length === 0) return false;

    return myList.some(movie => movie.id === id);
}

export { parseVideos, isInMyList };