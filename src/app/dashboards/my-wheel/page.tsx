import MySunburstChart from "@/components/MySunburstChart";
import mydata from "./portfolio";

export default function MyWheel() {
    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex flex-row w-64 px-6 justify-center items-center">
                    <MySunburstChart data={mydata} amount={150000} />
                </div>
            </div>
        </>
    )
}