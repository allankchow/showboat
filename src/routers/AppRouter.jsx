import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import MyListPage from "../pages/MyListPage";
import MoviePage from "../pages/MoviePage";
import ErrorPage from "../pages/ErrorPage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path="/" exact element={<HomePage />}></Route>
                    <Route path="/:tab" exact element={<HomePage />}></Route>
                    <Route path="/about" exact element={<AboutPage />}></Route>
                    <Route path="/my-list" exact element={<MyListPage />}></Route>
                    <Route path="/movie/:id" exact element={<MoviePage />}></Route>
                    <Route path="/search/:searchTerm" exact element={<SearchPage />}></Route>
                    <Route path="*" exact element={<ErrorPage />}></Route>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;