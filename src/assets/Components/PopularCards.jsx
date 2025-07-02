import { useNavigate } from "react-router";

export default function PopularCards({ id, title, poster, release }) {
  const navigate = useNavigate();

  return (
    <div
      className="text-white mb-8"
      key={id}
      onClick={() => {
        navigate(`/movie/popular/${id}/${title}`);
      }}
    >
      <img
        src={poster}
        alt=""
        className="w-[200px] h-[300px] border-2 border-white rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
      />
      <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
        {title}
      </h1>
      <p>{release}</p>
    </div>
  );
}
