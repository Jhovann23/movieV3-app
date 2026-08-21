import { useEffect } from "react";
import { useState } from "react";
import {getRecommendationsMovie, imageOriginal} from "../api";
import axios from "axios";
import { useParams } from "react-router";
import { imageURL } from "../api";
import { useNavigate } from "react-router";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  window.scrollTo({top: 0})

  const { id, title } = useParams();
  const navigate = useNavigate()
  const idNum = parseInt(id);

  const runtime = parseInt(detail.runtime)

  const jam = Math.floor(runtime / 60);
  const sisaMenit = runtime % 60;

  useEffect(() => {
    const getDetails = async () => {
      const movie = await axios.get(
        `http://127.0.0.1:3030/movies/${idNum}/details`
      );
      setDetail(movie.data.data);
    };
    getDetails();
  }, [idNum]);

  useEffect(() => {
    const getCredit = async () => {
      const credits = await axios.get(
        `http://127.0.0.1:3030/movies/${idNum}/credits`
      );
      const sliceCredits = credits.data.data.cast.slice(0, 9);
      setCredits(sliceCredits);
    };
    getCredit();
  }, [idNum]);

  useEffect(() => {
    getRecommendationsMovie(idNum).then((movies) => {
      const sliceMovies = movies.slice(0, 5);
      setRecommendations(sliceMovies)
    })
  }, [idNum]);

  return (
    <div className="bg-black box-border" key={id}>
      <div>
        <img
          src={`${imageOriginal}/${recommendations.backdrop_path}`}
          className="h-[500px] object-cover object-top w-[14400px] bg-[#121212] bg-blend-screen brightness-50"
        />
      </div>

      <div className="flex p-12 mt-[-500px] brightness-100 items-center">
        <img
          src={`${imageURL}/${recommendations.poster_path}`}
          alt=""
          className="w-[250px] rounded-md drop-shadow-2xl"
        />
        <div className="text-white ml-8 ">
          <h1 className="font-bold text-5xl font-body">{title}</h1>
          <div className="text-xl mb-2 mt-2 font-body">
            <span className="mr-4">{jam}h {sisaMenit}m</span>
            <span className="mr-2">{recommendations.release_date}</span>
            {detail.genres && detail.genres.length > 0 && (
              <p className="mt-2">
                Genres: {detail.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
          <p className="text-xl mb-2 font-body">{recommendations.vote_average}</p>
          <p className="w-[650px] mb-12 font-body">{recommendations.overview}</p>
        </div>
      </div>

      <div className="w-[1200px] m-auto ">
        <h1 className="text-white font-bold text-4xl py-4 mt-12 mb-4 font-heading">Top Cast</h1>
        <div className="flex flex-wrap ">
          {credits.map((credit) => {
            return (
              <div
                className=" mb-4 border-white rounded-t-lg mr-4 hover:cursor-pointer "
                key={credit.id}
              >
                <img
                  src={`${imageURL}/${credit.profile_path}`}
                  alt=""
                  className="w-[138px] h-[175px] object-cover rounded-t-lg"
                />
                <div className=" w-[138px] h-[90px] bg-white rounded-b-lg">
                  <h1 className="font-bold pt-2 pl-2 text-sm hover:text-[#01BBEB] hover:cursor-pointer font-heading">
                    {credit.name}
                  </h1>
                  <h1 className="pb-4 pl-2 w-[138px] text-xs font-body">{credit.character}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[1200px] m-auto">
        <h1 className="text-white font-bold text-4xl py-4 mb-4 font-heading">
          Recommendations
        </h1>
        <div className="flex gap-4 hover:cursor-pointer">
          {recommendations.map((movie) => {
            return (
              <div
                className="w-[250px]"
                key={movie.id}
                onClick={() => {
                  navigate(`/movie/${movie.id}/${movie.title}`);
                }}
              >
                <img
                  src={`${imageOriginal}/${movie.backdrop_path}`}
                  alt=""
                  className="rounded-t-xl"
                />
                <div className="bg-white p-3 h-[100px] hover:bg-[#01BBEB]">
                  <h1 className="font-semibold font-heading">{movie.title}</h1>
                  <h1 className={"font-body"}>{movie.release_date}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
