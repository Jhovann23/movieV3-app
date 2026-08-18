import WatchlistCards from "../assets/components/WatchlistCards.jsx"
import axios from "axios";
import {useEffect, useState} from "react";

export default function Watchlist(){
    const [watchlist, setWatchlist] = useState([]);
    const token = localStorage.getItem('access_token');

    useEffect(()=>{
        const getWatchlist = async () => {
            const movie = await axios.get("http://127.0.0.1:3030/api/v1/watchlist", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setWatchlist(movie.data.data)
        }
        getWatchlist();
    }, [token]);

    return (
        <div className={"bg-[#161819] min-h-screen"}>
            <div className={"w-[950px] m-auto"}>
                <div className={"pt-8 font-bold text-2xl"}>
                    <span className={"text-[#01BBEB] font-heading"}>WatchList</span>
                </div>
                <div className={"flex gap-3 py-8 flex-row flex-wrap"}>
                    {watchlist.map((item, index) => {
                        return (
                            <WatchlistCards key={index} id={item.id} title={item.movie_title} poster_path={item.poster_path} movie_id={item.movie_id}/>
                        )
                        }
                    )}
                </div>

            </div>

        </div>
    )
}