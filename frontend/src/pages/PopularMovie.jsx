import { useNavigate, useParams } from "react-router";
import {apiKey, getMovieListPopular, imageURL} from "../api";
import { getRecommendationsMovie } from "../api";
import { useEffect, useState } from "react";
import { Plus, StarPlus } from "lucide-react"
import { imageOriginal } from "../api";
import axios from "axios";

export default function BannerMovie() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  window.scrollTo({top: 0})
  const { id, title } = useParams();
  const navigate = useNavigate();
  const idNum = parseInt(id);

  useEffect(() => {
    const getDetails = async () => {
      const movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${idNum}?api_key=${apiKey}`
      );
      setDetail(movie.data);
    };
    getDetails();
  }, [idNum]);

  useEffect(() => {
    const getCredit = async () => {
      const credits = await axios.get(
        `https://api.themoviedb.org/3/movie/${idNum}/credits?api_key=${apiKey}`
      );
      const sliceCredits = credits.data.cast.slice(0, 9);
      setCredits(sliceCredits);
    };
    getCredit();
  }, [idNum]);

  useEffect(() => {
    getRecommendationsMovie(idNum).then((movies) => {
      const sliceMovies = movies.slice(0, 5);
      setRecommendations(sliceMovies)
    })
      }, [idNum]
  )

  useEffect(() => {
    getMovieListPopular().then((movies) => {
      const Movies = movies.find((m) => m.id === idNum);
      setPopularMovies(Movies);
    });
  }, [idNum]);

  //After rewrite
  return (
      <div className="bg-black box-border" key={id}>
        <div>
          <img
              src={"/images/bannerDummy.png"}
              className="h-[500px] object-cover object-top w-[14400px] bg-[#121212] bg-blend-screen brightness-50"
          />
        </div>

        <div className="flex p-12 mt-[-480px] brightness-100 items-center">
          <img
              src={"/images/posterDummy.png"}
              alt=""
              className="w-[250px] rounded-md drop-shadow-2xl"
          />
          <div className="text-white ml-8 ">
            <h1 className="font-bold text-5xl">spidermen <span className={"font-thin"}>(2024)</span></h1>
            <div className="text-xl mb-2 mt-2">
              <span className="mr-4">20 mins</span>
                  <p className="mt-2">
                    awikwok
                  </p>
            </div>
            <p className="text-xl mb-2">5</p>
            <p className="w-[650px] mb-12">acikiwr aselole</p>
          </div>

          <div className={"text-white bg-black border-2 border-[#2C3440] p-3.5 rounded-lg w-[25%] h-[150px]"}>
            <div className={"flex mb-3 border-b-2 border-b-white py-2 pb-3.5 font-semibold"}>
              <Plus className={"mr-2"}/>
              <button>Tambahkan Ke Watchlist</button>
            </div>
            <div className={"py-2 flex"}>
              <StarPlus className={"mr-2"}/>
              <span className={"font-semibold"}>
                Review & Rate
              </span>
            </div>

          </div>
        </div>
      </div>
  );

  //Before rewrite
  // return (
  //   <div className="bg-black box-border" key={id}>
  //     <div>
  //       <img
  //         src={`${imageOriginal}/${popularMovies.backdrop_path}`}
  //         className="h-[500px] object-cover object-top w-[14400px] bg-[#121212] bg-blend-screen brightness-50"
  //       />
  //     </div>
  //
  //     <div className="flex p-12 mt-[-450px] brightness-100 items-center">
  //       <img
  //         src={`${imageURL}/${popularMovies.poster_path}`}
  //         alt=""
  //         className="w-[250px] rounded-md drop-shadow-2xl"
  //       />
  //       <div className="text-white ml-8 ">
  //         <h1 className="font-bold text-5xl">{title}</h1>
  //         <div className="text-xl mb-2 mt-2">
  //           <span className="mr-4">{detail.runtime} mins</span>
  //           <span className="mr-2">{popularMovies.release_date}</span>
  //           {detail.genres && detail.genres.length > 0 && (
  //             <p className="mt-2">
  //               {detail.genres.map((g) => g.name).join(", ")}
  //             </p>
  //           )}
  //         </div>
  //         <p className="text-xl mb-2">{popularMovies.vote_average}</p>
  //         <p className="w-[650px] mb-12">{popularMovies.overview}</p>
  //       </div>
  //     </div>
  //
  //     <div className="w-[1200px] m-auto ">
  //       <h1 className="text-white font-bold text-4xl p-4 mb-4">Top Cast</h1>
  //       <div className="flex flex-wrap ">
  //         {credits.map((credit) => {
  //           return (
  //             <div
  //               className=" mb-8 rounded-t-2xl mr-2 hover:cursor-pointer "
  //               key={credit.id}
  //             >
  //               <img
  //                 src={`${imageURL}/${credit.profile_path}`}
  //                 alt=""
  //                 className="w-[170px] h-[200px] object-cover rounded-t-2xl"
  //               />
  //               <div className=" w-[170px] h-[90px] bg-white rounded-b-2xl">
  //                 <h1 className="font-bold pt-2 pl-2 text-base hover:text-[#01BBEB] hover:cursor-pointer ">
  //                   {credit.name}
  //                 </h1>
  //                 <h1 className="pb-4 pl-2 w-[180px]">{credit.character}</h1>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //
  //     <div
  //       className="w-[1200px] h-[400px] m-auto"
  //     >
  //       <h1 className="text-white font-bold text-4xl p-4 mb-4">
  //         Recommendations
  //       </h1>
  //       <div className="flex gap-4 hover:cursor-pointer">
  //         {recommendations.map((movie) => {
  //           return (
  //             <div
  //               className="w-[250px]"
  //               key={movie.id}
  //               onClick={() => {
  //                 navigate(`/movie/${movie.id}/${movie.title}`)
  //                 window.scrollTo({top: 0})
  //                 console.log(movie.id);
  //               }}
  //             >
  //               <img
  //                 src={`${imageOriginal}/${movie.backdrop_path}`}
  //                 alt=""
  //                 className="rounded-t-xl"
  //               />
  //               <div className="bg-white p-3 h-[100px] hover:bg-[#01BBEB] rounded-b-lg">
  //                 <h1 className="font-semibold">{movie.title}</h1>
  //                 <h1>{movie.release_date}</h1>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}
