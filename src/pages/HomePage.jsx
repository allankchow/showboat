import { useState, useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        document.title = `${appTitle} - Home`;

        // Fetch data from Movie API
        setMovies();
    }, [])


    return (
        <div>Home Page</div>
    )
}

export default HomePage;