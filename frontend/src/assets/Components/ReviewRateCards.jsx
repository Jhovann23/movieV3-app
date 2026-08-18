import {useNavigate} from "react-router";
import {Star} from "lucide-react"
// import {imageURL} from "../../api.js";

export default function ReviewRateCards({key, id, poster_path, title, movie_id}) {
    const navigate = useNavigate();
    return (
        <div
            className="text-white mb-4 box-border px-1"
            key={key}
            onClick={() => {
                navigate(`/movie/${movie_id}/${title}`);
            }}
        >
            <div className={"flex gap-3 flex-row "}>
                <img
                    src={`/images/posterDummy.png`}
                    alt={title}
                    className="w-[125px] h-[180px] rounded-md border-2 border-[#445566] mr-2 hover:cursor-pointer hover:opacity-80"
                />
                <div className={"flex flex-col justify-start gap-6"}>
                    <span className={"font-bold font-heading text-2xl"}>Spiderman : Brand New Day</span>
                    <div className={"flex gap-3 flex-row"}>
                        {[1,2,3,4].map((i) => (
                            <button className={"flex flex-row"} key={i}>
                                <Star size={30} className={"fill-[#F5B301]"}/>
                            </button>
                        ))}
                    </div>

                    <span className={"font-body text-sm w-[850px]"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis felis placerat tortor sollicitudin, sed tempus lacus molestie. Aenean congue non tellus at ultrices. Nam et varius ex. Vestibulum gravida purus vel urna facilisis tempus. Suspendisse euismod venenatis tortor, vehicula viverra tortor finibus vel. Donec dignissim lacus ut turpis ultricies varius vel egestas ex. Pellentesque et hendrerit enim. Curabitur</span>
                </div>
            </div>

        </div>
    )
}