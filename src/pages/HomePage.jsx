import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { getMovieListPopular, getMovieTopRated, getMovieUpComing } from "../api";

import Banner from "../assets/Components/Banner";
import Movies from "../assets/Components/Movies";

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    getMovieListPopular().then((movie) => {
      setPopularMovies(movie);
    });
  }, []);

  useEffect(() => {
    getMovieTopRated().then((movie) => {
      setTopRatedMovies(movie);
    });
  }, []);

  useEffect(() => {
    getMovieUpComing().then((movie) => {
      setUpComingMovies(movie);
    });
  }, []);

  return (
    <div className="bg-black box-border">
      <Banner popularMovies={popularMovies} />
      <Movies
        popularMovies={popularMovies}
        topRatedMovies={topRatedMovies}
        upComingMovies={upComingMovies}
      />
    </div>
  );
}

// function Navbar() {
//   const [searchList, setSearchList] = useState("");
//   const [movie, setMovie] = useState("");

//   const search = async (q) => {
//     const query = await searchMovie(q);
//     setMovie(query);
//   };

//   return (
//     <div className="bg-black flex p-5">
//       <a href="">
//         <img
//           src="img/logo2.jpg"
//           alt=""
//           className="h-[60px] object-cover"
//         />
//       </a>
//       <div className="w-[700px] relative m-auto">
//         <input
//           type="text"
//           placeholder="Search Movie"
//           className="w-[700px] text-black p-1 rounded-sm focus:outline-none focus:ring-4 focus:border-[#01BBEB]"
//           value={searchList}
//           onChange={({ target }) => {
//             setSearchList(target.value);
//             search(target.value);
//           }}
//         />
//         <ul className="bg-[#313131] mt-2 absolute z-20 w-full rounded-lg  ">
//           {movie.length > 0
//             ? movie.map((e) => {
//                 return (
//                   <SearchList
//                     key={e.id}
//                     title={e.title}
//                     release={e.release_date}
//                     overview={e.overview}
//                     poster={`${imageURL}/${e.poster_path}`}
//                   />
//                 );
//               })
//             : ""}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function SearchList({ id, title, release, overview, poster }) {
//   return (
//     <li className="flex mb-4 border-b-2 p-4" key={id}>
//       <img src={poster} alt="" className="w-[100px] h-[128px] object-cover" />
//       <div className="flex-col ml-4">
//         <h1 className="font-semibold text-xl text-white ">{title}</h1>
//         <p className="text-gray-300 font-semibold text-lg">{release}</p>
//         <p className="text-gray-300">{overview}</p>
//       </div>
//     </li>
//   );
// }

// function Banner({ popularMovies }) {
//   return (
//     <div>
//       <Carousel
//         className="object-contain"
//         showThumbs={false}
//         showStatus={false}
//         infiniteLoop={true}
//         autoPlay={true}
//         interval={2500}
//       >
//         {popularMovies.map((movie) => {
//           return (
//             <BannerDetail
//               key={movie.id}
//               title={movie.title}
//               release={movie.release_date}
//               overview={movie.overview}
//               rate={movie.vote_average}
//               banner={`${imageOriginal}/${movie.backdrop_path}`}
//             />
//           );
//         })}
//       </Carousel>
//     </div>
//   );
// }

// function BannerDetail({ id, title, release, overview, rate, banner }) {
//   return (
//     <div className="relative cursor-pointer" key={id}>
//       <img src={banner} className="h-[800px] object-cover w-[1440px]"/>
//       <div className="text-white flex flex-col text-left p-12 mt-[-32rem]">
//         <div className="text-7xl font-extrabold mb-6" >
//           {title}
//         </div>
//         <div className="text-2xl font-semibold mb-6">
//           {release}
//           <span className="ml-6">{rate}</span>
//         </div>
//         <p className="text-left font-normal w-[40rem]">{overview}</p>
//       </div>
//     </div>
//   );
// }

// function Movies({ popularMovies, topRatedMovies, upComingMovies }) {
//   const [selected, setSelected] = useState("");

//   const list = ["Popular", "Top Rated", "Upcoming"];

//   return (
//     <div className="mt-12 w-[1200px] m-auto p-8">
//       <ul className="flex gap-8 font-semibold text-3xl text-white">
//         {list.map((list, index) => {
//           let baseClass = "";

//           if (index === 0) {
//             baseClass +=
//               selected === 0
//                 ? "text-[#01BBEB]"
//                 : selected === 1 || selected === 2
//                 ? "text-white"
//                 : "text-[#01BBEB]";
//           } else {
//             baseClass += selected === index ? "text-[#01BBEB]" : "text-white";
//           }

//           return (
//             <li
//               className={`hover:text-[#01BBEB] cursor-pointer 1 ${baseClass}`}
//               key={index}
//               onClick={() => setSelected(index)}
//             >
//               {list}
//             </li>
//           );
//         })}
//       </ul>
//       <div className="flex flex-wrap object-contain mt-12">
//         {selected === 1
//           ? topRatedMovies.map((movie) => {
//               return (
//                 <TopRatedMoviesCards
//                   key={movie.id}
//                   title={movie.title}
//                   poster={`${imageURL}/${movie.poster_path}`}
//                   release={movie.release_date}
//                 />
//               );
//             })
//           : ""}

//         {selected === 2
//           ? upComingMovies.map((movie) => {
//               return (
//                 <UpComingMoviesCards
//                   key={movie.id}
//                   title={movie.title}
//                   poster={`${imageURL}/${movie.poster_path}`}
//                   release={movie.release_date}
//                 />
//               );
//             })
//           : ""}

//         {selected === 0
//           ? popularMovies.map((movie) => {
//               return (
//                 <PopularCards
//                   key={movie.id}
//                   title={movie.title}
//                   poster={`${imageURL}/${movie.poster_path}`}
//                   release={movie.release_date}
//                 />
//               );
//             })
//           : selected === 1 || selected === 2
//           ? ""
//           : popularMovies.map((movie) => {
//               return (
//                 <PopularCards
//                   key={movie.id}
//                   title={movie.title}
//                   poster={`${imageURL}/${movie.poster_path}`}
//                   release={movie.release_date}
//                 />
//               );
//             })}
//       </div>
//     </div>
//   );
// }

// function PopularCards({ id, title, poster, release }) {
//   return (
//     <div className="text-white mb-8" key={id}>
//       <img
//         src={poster}
//         alt=""
//         className="w-[200px] h-[300px] border-2 border-white rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
//       />
//       <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
//         {title}
//       </h1>
//       <p>{release}</p>
//     </div>
//   );
// }

// function TopRatedMoviesCards({ id, poster, title, release }) {
//   return (
//     <div className="text-white mb-8" key={id}>
//       <img
//         src={poster}
//         alt=""
//         className="w-[200px] h-[300px] border-2 border-white rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
//       />
//       <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
//         {title}
//       </h1>
//       <p>{release}</p>
//     </div>
//   );
// }

// function UpComingMoviesCards({ id, poster, title, release }) {
//   return (
//     <div className="text-white mb-8" key={id}>
//       <img
//         src={poster}
//         alt=""
//         className="w-[200px] h-[300px] border-2 border-white rounded-2xl mr-2 hover:cursor-pointer hover:opacity-80"
//       />
//       <h1 className="w-[150px] font-bold mt-2 text-lg hover:text-[#01BBEB] hover:cursor-pointer">
//         {title}
//       </h1>
//       <p>{release}</p>
//     </div>
//   );
// }
