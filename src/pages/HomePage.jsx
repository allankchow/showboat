import { useState, useEffect } from 'react';

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch data from Movie API
        setMovies();
    }, [])


    return (
        <div>Home Page</div>
    )
}

export default HomePage;