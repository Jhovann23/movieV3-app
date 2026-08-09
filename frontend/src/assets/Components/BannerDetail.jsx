import { useNavigate } from "react-router";

export default function BannerDetail({ id, title, release, overview, rate, banner }) {
  const navigate = useNavigate()

    //After rewrite

    //Before rewrite
    return (
      <div className="relative cursor-pointer" key={id} onClick={() => navigate(`/movie/popular/${id}/${title}`)}>
        <img src={banner} className="h-[800px] object-cover w-[1440px]"/>
        <div className="text-white flex flex-col text-left p-12 mt-[-32rem]">
          <div className="text-7xl font-extrabold mb-6" >
            {title}
          </div>
          <div className="text-2xl font-semibold mb-6">
            {release}
            <span className="ml-6">{rate}</span>
          </div>
          <p className="text-left font-normal w-[40rem]">{overview}</p>
        </div>
      </div>
    );
  }