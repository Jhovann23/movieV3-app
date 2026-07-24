import { Carousel } from "react-responsive-carousel";
import { imageOriginal } from "../../api";
import BannerDetail from "./BannerDetail";

export default function Banner({ popularMovies }) {
  return (
    <div>
      <Carousel
        className="object-contain"
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2500}
      >
        {popularMovies.map((movie) => {
          return (
            <BannerDetail
              key={movie.id}
              id={movie.id}
              title={movie.title}
              release={movie.release_date}
              overview={movie.overview}
              rate={movie.vote_average}
              banner={`${imageOriginal}/${movie.backdrop_path}`}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
