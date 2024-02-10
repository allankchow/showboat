const appTitle = "Showboat";

// Media query breakpoints
const tabletWidth = 768;
const desktopSmallWidth = 1000;
const desktopMediumWidth = 1200;
const desktopLargeWidth = 1400;

// TMDB
const API_KEY = "b63bdc99aa7cc89152294bd30422e915";
const REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiZGM5OWFhN2NjODkxNTIyOTRiZDMwNDIyZTkxNSIsInN1YiI6IjY1YjdmZThlZjYyMWIyMDE3Y2M4MThiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AYciPIi5o2TzKba3SQfkrJjnSdsmVjK6rVN1SdXQ0mQ'
    }
};

// TMDB API endpoints
const NOW_PLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing?language=en-US";
const POPULAR_ENDPOINT = "https://api.themoviedb.org/3/movie/popular?language=en-US";
const TOP_RATED_ENDPOINT = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const UPCOMING_ENDPOINT = "https://api.themoviedb.org/3/movie/upcoming?language=en-US";

const IMAGE_PATH_ENDPOINT = "https://image.tmdb.org/t/p";
const MOVIE_ENDPOINT = "https://api.themoviedb.org/3/movie";

const SEARCH_ENDPOINT = "https://api.themoviedb.org/3/search/movie";

const APP_STORAGE_NAME = "myList";

export { 
    appTitle,
    tabletWidth,
    desktopSmallWidth,
    desktopMediumWidth,
    desktopLargeWidth,
    API_KEY,
    REQUEST_OPTIONS,
    NOW_PLAYING_ENDPOINT,
    POPULAR_ENDPOINT,
    TOP_RATED_ENDPOINT,
    UPCOMING_ENDPOINT,
    IMAGE_PATH_ENDPOINT,
    MOVIE_ENDPOINT,
    SEARCH_ENDPOINT,
    APP_STORAGE_NAME
}
