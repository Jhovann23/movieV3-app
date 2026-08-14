import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./assets/Components/Navbar";
import PopularMovie from "./pages/PopularMovie";
import PopularCards from "./assets/Components/PopularCards";
import TopRatedMovie from "./pages/TopRatedMovie";
import UpcomingMovie from "./pages/UpComingMovie";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import SearchMovie from "./pages/SearchMovie";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/popular" element={<TopRatedMovie />} />

        <Route path="/movie/popular/:id/:title" element={<PopularMovie />} />
        <Route path="/movie/popular/:id/:title" element={<PopularCards />} />

        <Route path="/movie/top-rate/:id/:title" element={<TopRatedMovie />} />

        <Route path="/movie/up-coming/:id/:title" element={<UpcomingMovie />} />

        <Route path={"/login"} element={<LoginForm/>}/>
        <Route path={"/register"} element={<RegisterForm/>}/>
        <Route path="/movie/:id/:title" element={<SearchMovie />} />

      </Routes>
    </div>
  );
}
