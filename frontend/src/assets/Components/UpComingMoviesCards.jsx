import { useNavigate } from "react-router";

export default function UpComingMoviesCards({ id, poster, title, release }) {
  const navigate = useNavigate();

  //After rewrite
  return (
      <div
          className="text-white mb-8"
          key={id}
          onClick={() => {
            navigate(`/movie/up-coming/${id}/${title}`);
          }}
      >
        <img
            src={"/images/posterDummy.png"}
            alt=""
            className="w-[200px] h-[300px] rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
        />
        <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
          doomsday
        </h1>
        <p>2019</p>
      </div>
  );
}

  //Before rewrite
//   return (
//     <div
//       className="text-white mb-8"
//       key={id}
//       onClick={() => {
//         navigate(`/movie/up-coming/${id}/${title}`);
//       }}
//     >
//       <img
//         src={poster}
//         alt=""
//         className="w-[200px] h-[300px] rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
//       />
//       <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
//         {title}
//       </h1>
//       <p>{release}</p>
//     </div>
//   );
// }
