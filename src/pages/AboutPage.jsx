import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

const AboutPage = () => {

    useEffect(() => {
        document.title = `${appTitle} - About`;
    }, []);

    return (
        <div>About Page</div>
    )
}

export default AboutPage;