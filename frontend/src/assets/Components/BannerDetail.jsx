import { useNavigate } from "react-router";
import { ThumbsUp } from "lucide-react"

export default function BannerDetail({ id, title, release, overview, rate, banner }) {
  const navigate = useNavigate()
  const releaseYear = release.split("-")[0]

  const percentageRate = Math.round(rate * 10) + " %";

    return (
        <div className="relative cursor-pointer" key={id} onClick={() => navigate(`/movie/popular/${id}/${title}`)}>
            <img src={banner} className="h-[800px] object-cover w-[1440px]"/>
            <div className="text-white flex flex-col text-left p-12 mt-[-32rem]">
                <div className="text-7xl font-extrabold mb-6 font-heading" >
                    {title}
                </div>
                <div className="flex text-2xl font-semibold mb-6 font-body">
                    <div className={"border-2 px-4 rounded-md shadow-md border-gray-400"}>
                        <span>{releaseYear}</span>
                    </div>
                    <div className={"flex ml-6 border-2 px-4 rounded-md shadow-md text-white border-gray-400"}>
                        <ThumbsUp height={32}/>
                        <span className="ml-6 font-bold">{percentageRate}</span>
                    </div>
                </div>
                <p className="text-left font-normal w-[40rem] font-body">{overview}</p>
            </div>
        </div>
    );
  }