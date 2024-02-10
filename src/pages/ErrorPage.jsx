import { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {

    useEffect(() => {
        document.title = `404 Page Not Found`;
    }, []);

    return (
        <main class="errorPage">
            <h1>404 Error</h1>
            <h3>Oops! We cant's find the page you're looking for</h3>
            <p>The page you tried to request doesn't exist!</p>

            <Link to="/">Back to Home</Link>
        </main>
    )
}

export default ErrorPage;