import { useNavigate } from "react-router";

export default function TopRatedMoviesCards({ id, poster, title, release }) {
  const navigate = useNavigate();

  return (
    <div
      className="text-white mb-8 box-border px-1"
      key={id}
      onClick={() => {
        navigate(`/movie/top-rate/${id}/${title}`);
      }}
    >
      <img
        src={poster}
        alt=""
        className="w-[200px] h-[300px] rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
      />
      <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer font-heading">
        {title}
      </h1>
      <p className={"font-body"}>{release}</p>
    </div>
  );
}
