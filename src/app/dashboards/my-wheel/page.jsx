'use client'
import LineChart from "@/components/LineChart";
import MySunburstChart from "@/components/MySunburstChart";
import { useEffect, useState } from "react";
import mydata from "./portfolio";

export default function MyWheel() {

    const [pastPortfolio, setPastPortfolio] = useState(null)
    const [pastNifty, setPastNifty] = useState(null)
    const [pastDebt, setPastDebt] = useState(null)

    // Only fetch on load
    useEffect(() => {
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

        
    }, [])

    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>
            <div className='flex flex-row justify-center items-center'>
                <div className="flex flex-row w-full justify-center items-center">
                    <MySunburstChart data={mydata} amount={150000} />
                </div>
                {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"test"} />}
            </div>
        </>
    )
}