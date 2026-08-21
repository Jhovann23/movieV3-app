import { useNavigate } from "react-router";
import {imageURL} from "../../api.js";

export default function SearchList({key, id, title, release, overview, poster }) {
  const navigate = useNavigate();
  const slicesOverview = overview?.slice(0, 500) + '....';

  return (
    <li
      className="flex mb-4 border-b-2 border-[#445566] pb-6"
      key={key}
    >
      <img src={`${imageURL}/${poster}`} alt="" className="w-[100px] h-[128px] object-cover hover:border-2 hover:border-[#445566] hover:cursor-pointer"
           onClick={() => {
          navigate(`/movie/${id}/${title}`);
      }}/>
      <div className="flex-col ml-4">
        <h1 className="font-semibold text-xl text-white font-heading">{title}</h1>
          <div className={"flex justify-between border-2 px-4 rounded-md shadow-md text-white border-gray-400 w-fit my-2"}>
              <p className="text-gray-300 font-semibold text-base font-body">{release}</p>
          </div>
        <p className="text-gray-300 font-body">{slicesOverview}</p>
      </div>
    </li>
  );
}
