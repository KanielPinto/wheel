import React from 'react'
import MySunburstChart from '@/components/MySunburstChart'
import mydata from './portfolio'

export default function Stocks() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="w-fit py-4 px-6 text-3xl font-bold">Portfolio Recommender</h1>
            <div className="flex flex-row w-full justify-center items-center">
                <MySunburstChart data={mydata} amount={150000}/>
                {/* <MySunburstChart data={mydata} /> */}
            </div>
            
        </div>
    )
}