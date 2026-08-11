import { useEffect } from "react";
import { useState } from "react";
import { imageOriginal, imageURL } from "../api";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function TopRatesMovie() {
  const [recommendations, setRecommendations] = useState([]);
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  window.scrollTo({top: 0})
  const { id, title } = useParams();
  const navigate = useNavigate()
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
    const getRecommend = async () => {
      const movies = await axios.get(`
        https://api.themoviedb.org/3/movie/${idNum}/recommendations?api_key=${apiKey}`);
      const sliceMovies = movies.data.results.slice(0, 5);
      setRecommendations(sliceMovies);
    };
    getRecommend();
  }, [idNum]);

  return (
    <div className="bg-black box-border" key={id}>
      <div>
        <img
          src={`${imageOriginal}/${detail.backdrop_path}`}
          className="h-[500px] object-cover object-top w-[14400px] bg-[#121212] bg-blend-screen brightness-50"
        />
      </div>

      <div className="flex p-12 mt-[-450px] brightness-100 items-center">
        <img
          src={`${imageURL}/${detail.poster_path}`}
          alt=""
          className="w-[250px] rounded-md drop-shadow-2xl"
        />
        <div className="text-white ml-8 ">
          <h1 className="font-bold text-5xl">{title}</h1>
          <div className="text-xl mb-2 mt-2">
            <span className="mr-4">{detail.runtime} mins</span>
            <span className="mr-2">{detail.release_date}</span>
            {detail.genres && detail.genres.length > 0 && (
              <p className="mt-2">
                {detail.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
          <p className="text-xl mb-2">{detail.vote_average}</p>
          <p className="w-[650px] mb-12">{detail.overview}</p>
        </div>
      </div>

      <div className="w-[1200px] m-auto ">
        <h1 className="text-white font-bold text-4xl p-4 mb-4">Top Cast</h1>
        <div className="flex flex-wrap ">
          {credits.map((credit) => {
            return (
              <div
                className=" mb-8 border-white rounded-t-2xl mr-2 hover:cursor-pointer "
                key={credit.id}
              >
                <img
                  src={`${imageURL}/${credit.profile_path}`}
                  alt=""
                  className="w-[170px] h-[200px] object-cover rounded-t-2xl"
                />
                <div className=" w-[170px] h-[90px] bg-white rounded-b-2xl">
                  <h1 className="font-bold pt-2 pl-2 text-base hover:text-[#01BBEB] hover:cursor-pointer ">
                    {credit.name}
                  </h1>
                  <h1 className="pb-4 pl-2 w-[180px]">{credit.character}</h1>
                </div>
              </div>
            );
          })}

          {/* <div className=" mb-8 border-2 border-white rounded-2xl mr-2 hover:cursor-pointer ">
              <img
                src="/expPoster.jpg"
                alt=""
                className="w-[200px] h-[300px] object-cover rounded-2xl"
              />
              <div className=" w-full bg-white rounded-b-2xl">
                <h1 className="font-bold pt-4 pl-4 text-lg hover:text-[#01BBEB] hover:cursor-pointer ">
                  Abdul
                </h1>
                <h1 className="pb-4 pl-4 w-[200px]">
                  Lorem ipsum dolor sit amet. Lorem, ipsum dolor.
                </h1>
              </div>
            </div> */}

          <div className="w-[1200px] h-[400px]  m-auto">
            <h1 className="text-white font-bold text-4xl p-4 mb-4">
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
                      console.log(movie.id);
                    }}
                  >
                    <img
                      src={`${imageOriginal}/${movie.backdrop_path}`}
                      alt=""
                      className="rounded-t-xl"
                    />
                    <div className="bg-white p-3 h-[100px] hover:bg-[#01BBEB] rounded-b-lg">
                      <h1 className="font-semibold">{movie.title}</h1>
                      <h1>{movie.release_date}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
