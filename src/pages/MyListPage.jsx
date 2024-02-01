import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

const MyListPage = () => {

    useEffect(() => {
        document.title = `${appTitle} - My List`;
    }, []);

    return (
        <div>My List Page</div>
    )
}

export default MyListPage;