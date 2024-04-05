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



    // Only fetch on load
    useEffect(() => {
        if (!isLoading && user) {
            // Fetch user.id or perform any other actions
            console.log(user.id);
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
            })

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
                                            "name":myportfolio['large'][0]['name'],
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
        }



    }, [isLoading, user])

    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex w-full gap-4">
                    <div>
                        <div className="container relative font-sans text-white">
                            <div className="box relative flex flex-col justify-between w-fit h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] hover:border-white backdrop-blur-[20px] rounded-[0.7rem] transition-all duration-300 ease-in-out">
                                {chartData && <MySunburstChart data={chartData} amount={amount} />}

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full gap-4">
                        <div className="box relative items-center self-center flex flex-col justify-between w-full h-fit p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
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
            {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"My Portfolio"} />}
        </>
    )
}