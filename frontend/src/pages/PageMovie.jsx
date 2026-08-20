import { useNavigate, useParams } from "react-router";
import {getRecommendationsMovie, imageURL} from "../api";
import { useEffect, useState } from "react";
import { imageOriginal } from "../api";
import axios from "axios";
import {Check, Plus, StarPlus, ThumbsUp} from "lucide-react";
import {useToast} from "../context/ToastContext.jsx";
import {ReviewRateModal} from "../assets/components/ReviewModal.jsx";

export default function PageMovie() {
  const [recommendations, setRecommendations] = useState([]);
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const toast = useToast();
  const poster_path = recommendations.poster_path;

  const isInWatchlist = inWatchlist;
  window.scrollTo({top: 0})

  const { id, title } = useParams();
  const navigate = useNavigate()
  const idNum = parseInt(id);
  const token = localStorage.getItem("access_token");

  const runtime = parseInt(detail.runtime)

  const jam = Math.floor(runtime / 60);
  const sisaMenit = runtime % 60;

  const percentageRate = Math.round(detail.vote_average * 10) + " %";

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
      }, [idNum]
  )

  const handleRateSubmit =  async ({score, review}) => {
    try {
      await axios.post(`http://127.0.0.1:3030/api/v1/movies/${id}/rate`, {
        score: score,
        review: review,
        poster_path: poster_path,
        title: title,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Rating successfully rated.");
    }catch (e) {
      console.log(e);
      toast.error(e.data.message);
    }
  }

  const onWatchListClick = () => {
    setInWatchlist((v) => !v)
  }

  const releaseDate = detail?.release_date;

  const releaseYear = releaseDate
      ? releaseDate.split("-")[0]
      : null;

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
        <div className="text-white ml-8">
          <h1 className="font-bold text-5xl font-heading">{title}</h1>
          <div className="text-xl mt-2 font-body">
            <span className="mr-4">{jam}h {sisaMenit}m</span>
            <span className="mr-2">{releaseYear}</span>
            {detail.genres && detail.genres.length > 0 && (
              <p className="mt-2">
                {detail.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
          <div className={"flex justify-between border-2 px-4 rounded-md shadow-md text-white border-gray-400 w-[20%] my-2 py-0.5"}>
            <ThumbsUp height={28}/>
            <p className="text-xl font-body">{percentageRate}</p>
          </div>
          <p className="w-[650px] mb-12 font-body">{detail.overview}</p>
        </div>

        <div className={"text-white bg-[#161819] border-2 border-[#2C3440] p-3.5 rounded-lg w-[25%] h-[150px] ml-12 font-heading"}>
          <button className={"flex mb-3 border-b w-full border-b-white py-2 pb-3.5 font-semibold"} onClick={onWatchListClick}>
            {isInWatchlist ? <Check className={"mr-2"}/> : <Plus className={"mr-2"} />}
            {isInWatchlist ? "Ketuk untuk hapus" : "Tambahkan ke watchlist"}
          </button>

          <button className={"py-2 flex"} onClick={() => setReviewOpen(true)}>
            <StarPlus className={"mr-2"}/>
            <span className={"font-semibold"}>
                Review & Rate
              </span>
          </button>
        </div>

        <ReviewRateModal
            open={reviewOpen}
            onClose={() => setReviewOpen(false)}
            onSubmit={handleRateSubmit}
            movie={title}
        />
      </div>

      <div className="w-[1200px] m-auto">
        <h1 className="text-white font-bold text-4xl p-4 mb-4 font-heading">Top Cast</h1>
        <div className="flex flex-wrap">
          {credits.map((credit) => {
            return (
              <div
                className=" mb-8 border-white rounded-t-lg mr-4 hover:cursor-pointer "
                key={credit.id}
              >
                <img
                  src={`${imageURL}/${credit.profile_path}`}
                  alt=""
                  className="w-[138px] h-[175px] object-cover rounded-t-lg"
                />
                <div className=" w-[138px] h-[90px] bg-white rounded-b-lg">
                  <h1 className="font-bold pt-2 pl-2 text-base hover:text-[#01BBEB] hover:cursor-pointer font-heading">
                    {credit.name}
                  </h1>
                  <h1 className="pb-4 pl-2 w-[138px] text-xs font-body">{credit.character}</h1>
                </div>
              </div>
            );
          })}

          <div className="w-[1200px] h-[400px] m-auto">
            <h1 className="text-white font-bold text-4xl p-4 mb-4 font-heading">
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
                      alt={`${movie.title}`}
                      className="rounded-t-xl"
                    />
                    <div className="bg-white p-3 h-[100px] hover:bg-[#01BBEB] rounded-b-lg">
                      <h1 className="font-semibold font-heading">{movie.title}</h1>
                      <h1 className={"font-body"}>{movie.release_date}</h1>
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
