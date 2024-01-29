import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

const ErrorPage = () => {

    useEffect(() => {
        document.title = `404 Page Not Found`;
    }, []);

    return (
        <div>Error Page</div>
    )
}

export default ErrorPage;