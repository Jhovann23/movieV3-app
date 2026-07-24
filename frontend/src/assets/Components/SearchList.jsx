import { useNavigate } from "react-router";

export default function SearchList({ id, title, release, overview, poster }) {
  const navigate = useNavigate();
  return (
    <li
      className="flex mb-4 border-b-2 p-4 hover:bg-gray-800 hover:cursor-pointer"
      key={id}
      onClick={() => {
        navigate(`/movie/${id}/${title}`);
        console.log(id);
      }}
    >
      <img src={poster} alt="" className="w-[100px] h-[128px] object-cover" />
      <div className="flex-col ml-4">
        <h1 className="font-semibold text-xl text-white ">{title}</h1>
        <p className="text-gray-300 font-semibold text-lg">{release}</p>
        <p className="text-gray-300">{overview}</p>
      </div>
    </li>
  );
}
