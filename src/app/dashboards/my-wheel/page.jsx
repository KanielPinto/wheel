'use client'
import LineChart from "@/components/LineChart";
import MySunburstChart from "@/components/MySunburstChart";
import { useEffect, useState } from "react";
import mydata from "./portfolio";
import PriceSlider from "@/components/PriceSlider";
import { useUser } from "@clerk/nextjs"
import 'chartjs-adapter-moment';


export default function MyWheel() {

    const { user, isLoading } = useUser();

    const [pastPortfolio, setPastPortfolio] = useState(null)
    const [pastNifty, setPastNifty] = useState(null)
    const [pastDebt, setPastDebt] = useState(null)

    const [chartData, setChartData] = useState(null)

    const [amount, setamount] = useState(10000)

    const [vsNifty, setVsNifty] = useState(0)
    const [vsDebt, setVsDebt] = useState(0)
    const [retNifty, setRetNifty] = useState(0)
    const [retDebt, setRetDebt] = useState(0)
    const [retPf, setRetPf] = useState(0)



    // Only fetch on load
    useEffect(() => {
        if (!isLoading && user) {
            // Fetch user.id or perform any other actions
            console.log(user.id);

            fetch("http://localhost:5000/portfolio/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "uid": user.id,
                })
            }).then(async res => {
                var myportfolio = await res.json()
                myportfolio = myportfolio['portfolio']
                setChartData({
                    "name": "Assets",
                    "children": [
                        {
                            "name": "Others",
                            "color": "#ffffff75",
                            "style": "",
                            "children": [
                                {
                                    "name": "Fixed Income",
                                    "value": myportfolio['others'][0]['value']
                                }
                            ]
                        },
                        {
                            "name": "Mutual Funds",
                            "color": "#4C273E",
                            "children": [
                                {
                                    "name": "Largecap",
                                    "color": "#4dffa675",
                                    "children": [
                                        {
                                            "name": myportfolio['large'][0]['name'],
                                            "color": "#ff4d4d75",
                                            "value": myportfolio['large'][0]['value']
                                        },
                                        {
                                            "name": myportfolio['large'][0]['name'],
                                            "color": "#4da6ff75",
                                            "value": myportfolio['large'][1]['value']
                                        }
                                    ]
                                },
                                {
                                    "name": "Midcap",
                                    "color": "#4da6ff75",
                                    "children": [
                                        {
                                            "name": myportfolio['mid'][0]['name'],
                                            "color": "#ff4d4d75",
                                            "value": myportfolio['mid'][0]['value']
                                        },
                                        {
                                            "name": myportfolio['mid'][1]['name'],
                                            "color": "#4da6ff75",
                                            "value": myportfolio['mid'][1]['value']
                                        }
                                    ]
                                },
                                {
                                    "name": "Smallcap",
                                    "color": "#ff4d4d75",
                                    "children": [
                                        {
                                            "name": myportfolio['small'][0]['name'],
                                            "color": "#ff4d4d75",
                                            "value": myportfolio['small'][0]['value']
                                        },
                                        {
                                            "name": myportfolio['small'][1]['name'],
                                            "color": "#4da6ff75",
                                            "value": myportfolio['small'][1]['value']
                                        }
                                    ]
                                },
                                {
                                    "name": "Index",
                                    "color": "#944dff75",
                                    "children": [
                                        {
                                            "name": myportfolio['index'][0]['name'],
                                            "color": "#ff4d4d75",
                                            "value": myportfolio['index'][0]['value']
                                        },
                                        {
                                            "name": myportfolio['index'][1]['name'],
                                            "color": "#4da6ff75",
                                            "value": myportfolio['index'][1]['value']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            })

            fetch("http://localhost:5000/portfolio/past", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "uid": user.id,
                    "years": 1
                })
            }).then(async res => {
                var resjson = await res.json()
                setPastPortfolio(resjson['portfolio'])
                setPastNifty(resjson['benchmarks']['nifty'].reverse())
                setPastDebt(resjson['benchmarks']['debt'].reverse())
                setVsNifty(resjson['volatility']['vsNifty'])
                setVsDebt(resjson['volatility']['vsDebt'])
                setRetNifty(resjson['benchmarks']['nifty_ret'])
                setRetDebt(resjson['benchmarks']['debt_ret'])
                setRetPf(resjson['abs_return'])
            })


        }



    }, [isLoading, user])

    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>

            <div class="parent grid grid-cols-5 grid-rows-5 gap-5">
                <div class="div1 col-span-2 row-span-2">
                    <div class="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] hover:border-white backdrop-blur-[20px] rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        {chartData && <MySunburstChart data={chartData} amount={amount} />}
                    </div>
                </div>
                <div class="div2 col-span-3 row-span-2">
                    <div class="w-full h-full">
                        {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"My Portfolio"} />}
                    </div>
                </div>
                <div class="div3 col-span-1 row-span-1">
                    <div class="box relative items-center self-center flex flex-col justify-between w-full h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <PriceSlider></PriceSlider>
                    </div>
                </div>
                <div class="div4 col-span-2 row-span-1">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Volatility</h1>
                        <h1 className={`${vsNifty <= 1 ? "text-green-600" : "text-red-600"}`}>(vs Nifty) {vsNifty}</h1>
                        <h1 className={`${vsDebt <= 10 ? "text-green-600" : "text-red-600"}`}>(vs Debt) {vsDebt}</h1>
                    </div>
                </div>
                <div class="div5 col-span-2 row-span-1">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Returns (Absolute)</h1>
                        <h1 className={`${vsNifty > 0 ? "text-green-600" : "text-red-600"}`}>(Portfolio) {retPf}</h1>
                        <h1 className={`${vsDebt > 0 ? "text-green-600" : "text-red-600"}`}>(Nifty) {retNifty}</h1>
                        <h1 className={`${vsDebt > 0 ? "text-green-600" : "text-red-600"}`}>(Debt) {retDebt}</h1>
                    </div>
                </div>
                <div class="div6 col-span-1 row-span-1">
                    <div class="box relative items-center self-center flex flex-col justify-between w-full h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <PriceSlider></PriceSlider>
                    </div>
                </div>
                <div class="div7 col-span-2 row-span-1">
                    <div class="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Value 1</h1>
                    </div>
                </div>
                <div class="div8 col-span-2 row-span-1">
                    <div class="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Value 1</h1>
                    </div>
                </div>
                <div class="div9 col-span-5 row-span-1">


                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Value 3 </h1>
                    </div>
                </div>
            </div>

        </>
    )
}