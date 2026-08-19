import {useNavigate} from "react-router";
import {Star} from "lucide-react"
import {imageURL} from "../../api.js";

export default function ReviewRateCards({key, id, poster_path, title, movie_id, score, review}) {
    const navigate = useNavigate();

    const scoreProps = score ?? 0;
    const starArray = []

    for (let i = 1; i <= scoreProps; i++) {
        starArray.push(i)
    }
    return (
        <div
            className="text-white mb-4 box-border px-1"
            key={key}
        >
            <div className={"flex gap-3 flex-row "}>
                <img
                    src={`${imageURL}/${poster_path}`}
                    alt={title}
                    className="w-[125px] h-[180px] rounded-md border-2 border-[#445566] mr-2 hover:cursor-pointer hover:opacity-80"
                    onClick={() => {
                        navigate(`/movie/${movie_id}/${title}`);
                    }}
                />
                <div className={"flex flex-col justify-start gap-6 mb-4"}>
                    <span className={"font-bold font-heading text-2xl"}>{title}</span>
                    <div className={"flex gap-1 flex-row"}>
                        {starArray.map((i) => (
                            <div className={"flex flex-row"} key={i}>
                                <Star size={22} className={"fill-[#F5B301] text-[#F5B301]"}/>
                            </div>
                        ))}
                    </div>

                    <span className={"font-body text-sm w-[850px]"}>{review}</span>
                </div>
            </div>

        </div>
    )
}