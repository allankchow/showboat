import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FavouritesPage from "../pages/FavouritesPage";
import MoviePage from "../pages/MoviePage";
import ErrorPage from "../pages/ErrorPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Nav />
                <Routes>
                    <Route path="/" exact element={<HomePage />}></Route>
                    <Route path="/about" exact element={<AboutPage />}></Route>
                    <Route path="/favourites" exact element={<FavouritesPage />}></Route>
                    <Route path="/movie/:id" exact element={<MoviePage />}></Route>
                    <Route path="*" exact element={<ErrorPage />}></Route>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;