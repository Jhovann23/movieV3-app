import PopularCards from "./PopularCards";
import TopRatedMoviesCards from "./TopRatedMovies";
import UpComingMoviesCards from "./UpComingMoviesCards";
import { imageURL } from "../../api"; 
import { useState } from "react";

export default function Movies({
  popularMovies,
  topRatedMovies,
  upComingMovies,
}) {
  const [selected, setSelected] = useState("");

  const list = ["Popular", "Top Rated", "Upcoming"];


  //After rewrite
    return (
        <div className="mt-12 w-[1200px] m-auto p-8">
            <ul className="flex gap-8 font-semibold text-3xl text-white">
                {list.map((list, index) => {
                    let baseClass = "";

                    if (index === 0) {
                        baseClass +=
                            selected === 0
                                ? "text-[#01BBEB]"
                                : selected === 1 || selected === 2
                                    ? "text-white"
                                    : "text-[#01BBEB]";
                    } else {
                        baseClass += selected === index ? "text-[#01BBEB]" : "text-white";
                    }

                    return (
                        <li
                            className={`hover:text-[#01BBEB] cursor-pointer 1 ${baseClass}`}
                            key={index}
                            onClick={() => setSelected(index)}
                        >
                            {list}
                        </li>
                    );
                })}
            </ul>
            <div className="flex flex-wrap object-contain mt-12">
                <PopularCards/>
            </div>
        </div>
    );

  //Before rewrite
  // return (
  //   <div className="mt-12 w-[1200px] m-auto p-8">
  //     <ul className="flex gap-8 font-semibold text-3xl text-white">
  //       {list.map((list, index) => {
  //         let baseClass = "";
  //
  //         if (index === 0) {
  //           baseClass +=
  //             selected === 0
  //               ? "text-[#01BBEB]"
  //               : selected === 1 || selected === 2
  //               ? "text-white"
  //               : "text-[#01BBEB]";
  //         } else {
  //           baseClass += selected === index ? "text-[#01BBEB]" : "text-white";
  //         }
  //
  //         return (
  //           <li
  //             className={`hover:text-[#01BBEB] cursor-pointer 1 ${baseClass}`}
  //             key={index}
  //             onClick={() => setSelected(index)}
  //           >
  //             {list}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //     <div className="flex flex-wrap object-contain mt-12">
  //       {selected === 1
  //         ? topRatedMovies.map((movie) => {
  //             return (
  //               <TopRatedMoviesCards
  //                 key={movie.id}
  //                 title={movie.title}
  //                 poster={`${imageURL}/${movie.poster_path}`}
  //                 release={movie.release_date}
  //                 id={movie.id}
  //               />
  //             );
  //           })
  //         : ""}
  //
  //       {selected === 2
  //         ? upComingMovies.map((movie) => {
  //             return (
  //               <UpComingMoviesCards
  //                 key={movie.id}
  //                 title={movie.title}
  //                 poster={`${imageURL}/${movie.poster_path}`}
  //                 release={movie.release_date}
  //                 id={movie.id}
  //               />
  //             );
  //           })
  //         : ""}
  //
  //       {selected === 0
  //         ? popularMovies.map((movie) => {
  //             return (
  //               <PopularCards
  //                 key={movie.id}
  //                 title={movie.title}
  //                 poster={`${imageURL}/${movie.poster_path}`}
  //                 release={movie.release_date}
  //                 id={movie.id}
  //               />
  //             );
  //           })
  //         : selected === 1 || selected === 2
  //         ? ""
  //         : popularMovies.map((movie) => {
  //             return (
  //               <PopularCards
  //                 key={movie.id}
  //                 title={movie.title}
  //                 poster={`${imageURL}/${movie.poster_path}`}
  //                 release={movie.release_date}
  //                 id={movie.id}
  //               />
  //             );
  //           })}
  //     </div>
  //   </div>
  // );
}
