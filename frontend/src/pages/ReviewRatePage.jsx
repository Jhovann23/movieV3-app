import ReviewRateCards from "../assets/components/ReviewRateCards.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useToast} from "../context/ToastContext.jsx";

export default function ReviewRatePage() {
    const [reviewRateMovie, setReviewRateMovie] = useState([]);
    const toast = useToast();
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const GetAllReviewRateMovies = async () => {
            try{
                const movies = await axios.get("http://127.0.0.1:3030/api/v1/movies/rate", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setReviewRateMovie(movies.data.data);
            }catch (e) {
                console.log(e)
                toast.error(e.response.data.message)
            }
        }
        GetAllReviewRateMovies();
    },[token])

    return (
        <div className={"bg-[#161819] min-h-screen"}>
            <div className={"w-[950px] m-auto"}>
                <div className={"pt-8 font-bold text-2xl"}>
                    <span className={"text-[#01BBEB] font-bold font-heading"}>Reviews</span>
                </div>

                <div className={"flex col py-8 flex-col"}>
                    {reviewRateMovie.length > 0 && reviewRateMovie.map((movie, index)  => {
                        return(
                            <ReviewRateCards movie_id={movie.movie_id} key={index} poster_path={movie.poster_path} score={movie.score} review={movie.review} title={movie.movie_title} id={movie.id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}