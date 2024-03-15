import MySunburstChart from "@/components/MySunburstChart";
import mydata from "./portfolio.js";

export default function MyWheel() {
    return (
        <>
            <div className='flex flex-col justify-center'>
                <h1 className="w-fit py-4 px-6 text-3xl font-bold">My Wheel</h1>
                <div className="flex flex-row w-full">
                    <MySunburstChart data={mydata} amount={150000} />
                    {/* <MySunburstChart data={mydata} /> */}
                </div>

            </div>        
        </>
    )
}