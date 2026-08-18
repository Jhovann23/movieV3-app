import {useNavigate} from "react-router";
import {imageURL} from "../../api.js";

export default function WatchlistCards({key, id, poster_path, title, movie_id}) {
    const navigate = useNavigate();
    return (
        <div
            className="text-white mb-4 box-border px-1"
            key={key}
            onClick={() => {
                navigate(`/movie/${movie_id}/${title}`);
            }}
        >
            <img
                src={`${imageURL}/${poster_path}`}
                alt={title}
                className="w-[160px] h-[255px] rounded-md border-2 border-[#445566] mr-2 hover:cursor-pointer hover:opacity-80"
            />
        </div>
    )
}