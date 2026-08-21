import SearchList from "../assets/components/SearchList.jsx";
import {useEffect, useState} from "react";
import {searchMovie} from "../api.js";
import {useSearchParams} from "react-router";

export default function SearchListPage() {
    const [movies, setMovie] = useState([]);
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");
    const title = query.charAt(0).toUpperCase() + query.slice(1);

    useEffect(() => {
        searchMovie(query).then((query) => {
            setMovie(query);
        })
    }, [query])

    return (
        <div className={"bg-[#161819] min-h-screen border-box"}>
            <div className={"w-[950px] m-auto"}>
                <div className={"pt-8 font-bold text-2xl"}>
                    <span className={"text-[#01BBEB] font-bold font-heading"}>Showing Matches For {title}</span>
                </div>

                <div className={"flex col py-8 flex-col"}>
                    {movies.length > 0 && movies.map((movie, index) => {
                        return(
                            <SearchList key={index} id={movie.id} title={movie.title} release={movie.release_date} overview={movie.overview} poster={movie.poster_path} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}