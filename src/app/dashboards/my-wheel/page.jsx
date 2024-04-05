'use client'
import LineChart from "@/components/LineChart";
import MySunburstChart from "@/components/MySunburstChart";
import { useEffect, useState } from "react";
import mydata from "./portfolio";
import PriceSlider from "@/components/PriceSlider";
import 'chartjs-adapter-moment';

export default function MyWheel() {

    const [pastPortfolio, setPastPortfolio] = useState(null)
    const [pastNifty, setPastNifty] = useState(null)
    const [pastDebt, setPastDebt] = useState(null)

    // Only fetch on load
    useEffect(() => {
        async function fetchPastPortfolio() {
            try {
                fetch("http://localhost:5000/portfolio/past", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "uid": "user_2edN07fAM9ljMfoioKB0pVhPZVS",
                        "years": 1
                    })
                }).then(async res => {
                    var resjson = await res.json()
                    setPastPortfolio(resjson['portfolio'])
                    setPastNifty(resjson['benchmarks']['nifty'].reverse())
                    setPastDebt(resjson['benchmarks']['debt'].reverse())
                })
            } catch (err) {
                console.log(err);
            }
        }

        fetchPastPortfolio();

    }, [])

    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex w-full gap-4">
                    <div>
                        <div className="container relative font-sans text-white">
                            <div className="box relative flex flex-col justify-between w-fit h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] hover:border-white backdrop-blur-[20px] rounded-[0.7rem] transition-all duration-300 ease-in-out">
                                <MySunburstChart data={mydata} amount={150000} />

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full gap-4">
                        <div className="box relative flex flex-col justify-between w-full h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                            <PriceSlider></PriceSlider>
                        </div>
                        <div className="flex h-full gap-4">
                            <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                                <h1>Value 1</h1>
                            </div>
                            <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                                <h1>Value 2</h1>
                            </div>
                            <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                                <h1>Value 3 </h1>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
            {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"test"} />}
        </>
    )
}