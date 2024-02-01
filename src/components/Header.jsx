import Nav from './Nav';
import MobileNav from './MobileNav';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <div className="logoContainer">
                <NavLink to="/">
                    <div>LOGO PLACEHOLDER</div>
                </NavLink>
            </div>
            <MobileNav />
            <Nav />
        </header>
    )
}

export default Header;