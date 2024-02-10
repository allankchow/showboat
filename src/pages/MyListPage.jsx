import { useEffect, useState } from "react";
import { appTitle } from "../globals/globalVariables";
import MovieItem from "../components/MovieItem";

const MyListPage = () => {
    const [myList, setMyList] = useState([]);

    useEffect(() => {
        document.title = `${appTitle} - My List`;    
        const storedList = JSON.parse(localStorage.getItem("myList"));
        if (storedList) {
            setMyList(storedList);
        }
    }, []);

    return (
        <main>
            <div className="my-list">
                <h2>MY LIST</h2>
                <div className="movie-list">
                    {myList.map(movie => (
                        <MovieItem key={movie.id} movie={movie} isInMyList={true}/>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default MyListPage;