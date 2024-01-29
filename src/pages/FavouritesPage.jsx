import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

const FavouritesPage = () => {

    useEffect(() => {
        document.title = `${appTitle} - Favourites`;
    }, []);

    return (
        <div>Favourites Page</div>
    )
}

export default FavouritesPage;