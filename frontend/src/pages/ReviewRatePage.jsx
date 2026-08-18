import ReviewRateCards from "../assets/components/ReviewRateCards.jsx";

export default function ReviewRatePage() {
    return (
        <div className={"bg-[#161819] min-h-screen"}>
            <div className={"w-[950px] m-auto"}>
                <div className={"pt-8 font-bold text-2xl"}>
                    <span className={"text-[#01BBEB]"}>Reviews</span>
                </div>

                <div className={"flex col py-8 flex-col"}>
                    <ReviewRateCards />
                    <ReviewRateCards />
                </div>
            </div>



        </div>
    )
}