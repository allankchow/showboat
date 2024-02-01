import Nav from './Nav';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <div className="logoContainer">
                <NavLink to="/">
                    <div>LOGO PLACEHOLDER</div>
                </NavLink>
            </div>
            <Nav />
        </header>
    )
}

export default Header;