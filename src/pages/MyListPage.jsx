import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { appTitle } from "../globals/globalVariables";
import MovieItem from "../components/MovieItem";

const MyListPage = () => {
    // Get myList movies from state
    const myList = useSelector((state) => state.myList.items);
    
    // Set local state with the list from state
    const [myLocalList, setMyLocalList] = useState(myList);

    // Update local state when state changes
    useEffect(() => {
        setMyLocalList(myList); // Update local state with myList from state
    }, [myList]); // Listen for changes in myList from state

    useEffect(() => {
        document.title = `${appTitle} - My List`;    
    }, []);

    return (
        <main>
            <div className="my-list">
                <h2>MY LIST</h2>
                {myLocalList.length === 0 ? (
                    <p>Sorry, you have no favourited movies. Return to the home page to add a favourited movie.</p>
                ) : (
                    <div className="movie-list">
                        {myLocalList.map(movie => (
                            <MovieItem key={movie.id} movie={movie} isInMyList={true}/>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default MyListPage;