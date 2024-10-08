'use client'
import LineChart from "@/components/LineChart";
import MySunburstChart from "@/components/MySunburstChart";
import { useEffect, useState } from "react";
import mydata from "./portfolio";
import PriceSlider from "@/components/PriceSlider";
import Stat from "@/components/Stat";
import { useUser } from "@clerk/nextjs"
import 'chartjs-adapter-moment';
import { Slider, SliderValue, Tooltip } from "@nextui-org/react";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa";
import { FileQuestionIcon, MessageCircleQuestionIcon, InfoIcon } from "lucide-react";


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

    const [value, setValue] = React.useState(1000);
    const [inputValue, setInputValue] = React.useState("1000");

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());

        console.log(value);
    };

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1 Year"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    // Only fetch on load
    useEffect(() => {
        if (!isLoading && user) {

            fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/portfolio/", {
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
                                            "name": myportfolio['large'][1]['name'],
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

            fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/portfolio/past", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "uid": user.id,
                    "years": parseInt(selectedValue.split(" ")[0])
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



    }, [isLoading, user, selectedValue])


    let investmentValue = PriceSlider.value;


    return (
        <>
            <div className="flex w-full justify-between items-center">
                <h1 className="w-full py-6 text-3xl font-semibold font-sans">My Wheel</h1>
                <Button variant="ghost" color="secondary" onClick={() => {
                    // Redirect to another page
                    window.location.href = '/dashboards/risk-assessment';
                }} className="p-5 hidden md:flex font-semibold" startContent={<FileQuestionIcon />}>Retake Risk Assessment</Button>
            </div>

            <div className="parent grid grid-cols-7 grid-rows-2 md:grid-rows-3 gap-5 font-sans mb-5 md:mb-0">
                <div className="div1 md:col-span-3 col-span-full md:row-span-2">

                    <div className="box relative flex flex-col justify-between items-center w-full h-full p-8 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <Tooltip content={
                            <div className="px-1 py-2 max-w-64">
                                <div className="text-small font-bold mb-1">Where should I invest ?</div>
                                <div className="text-tiny">This wheel suggests in what asset classes you should invest and what amount as well. It picks the top performing mutual funds in each category by market cap.</div>
                            </div>
                        } placement="left-end">
                            <InfoIcon className="absolute top-2 right-3 text-gray-400" />
                        </Tooltip>
                        <h1 className="text-2xl pb-4 font-sans">Investment Wheel</h1>

                        {chartData && <MySunburstChart data={chartData} amount={parseInt(inputValue)} />}
                        <div className="pb-0 p-4 flex self-center items-center justify-center w-full">
                            <Slider
                                label="Investment Amount"
                                size="sm"
                                step={500}
                                maxValue={150000}
                                minValue={500}
                                color="foreground"
                                classNames={{
                                    base: "max-w-md",
                                    label: "text-medium",
                                }}

                                // we extract the default children to render the input
                                renderValue={({ children, ...props }) => (
                                    <output {...props}>
                                        <Tooltip
                                            className="text-tiny text-default-500 rounded-md"
                                            content="Press Enter to confirm"
                                            placement="left"
                                        >
                                            <input
                                                className="px-1 py-0.5 w-16 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                                type="text"
                                                aria-label="Temperature value"
                                                value={inputValue}
                                                onChange={(e) => {
                                                    const v = e.target.value;

                                                    setInputValue(v);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                                                        setValue(Number(inputValue));
                                                    }
                                                }}
                                            />
                                        </Tooltip>
                                    </output>
                                )}
                                value={value}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </div>
                <div className="div2 md:col-span-4 col-span-full md:row-span-2">
                    <div className="w-full h-full">
                        <div className='flex flex-col justify-center p-6 shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white transition-all duration-300 ease-in-out rounded-xl items-center self-center w-full h-full'>
                            <Tooltip content={
                                <div className="px-1 py-2 max-w-64">
                                    <div className="text-small font-bold mb-1">What If I Invested earlier ?</div>
                                    <p className="text-tiny mb-1">Compare the potential returns of your portfolio versus NIFTY 50 and Liquid Funds i.e. The stock market index that represents the weighted average of 50 of the largest Indian companies listed on the NSE and funds that invest in debt having almost no risk or volatility thus generating low but steady returns comparable to Bank FD&apos;s respectively.</p>
                                    <p className="text-tiny">The longer the timeframe - the greater the magic of compounding.</p>
                                </div>
                            } placement="left-end">
                                <InfoIcon className="absolute top-2 right-3 text-gray-400" />
                            </Tooltip>
                            <h1 className="text-2xl">Performance Comparison</h1>

                            <div className="h-96 md:h-full w-full">
                                {pastPortfolio && <LineChart amount={parseInt(inputValue)} data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"My Portfolio"} />}

                            </div>
                            <div className="flex flex-row font-inter justify-center align-middle">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize mx-2"
                                        >
                                            {selectedValue}
                                            <FaAngleDown className="ml-1" />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        <DropdownItem key="1 Year">1 Year</DropdownItem>
                                        <DropdownItem key="3 Years">3 Years</DropdownItem>
                                        <DropdownItem key="5 Years">5 Years</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div4 md:col-span-3 col-span-full row-span-1">
                    <div className="box relative flex flex-col justify-center items-center w-full p-8 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <Tooltip content={
                            <div className="px-1 py-2 max-w-64">
                                <div className="text-small font-bold mb-1">Is my principal at risk ?</div>
                                <div className="text-tiny">Volatility refers to the variability of returns associated with investments. We have compared your portfolio volatility to NIFTY 50 which is an index fund with a CAGR of around 13-15 % thus offering optimum returns for low-moderate risk. Debt on the other hand offers low risk thus yielding a low ROI.</div>
                            </div>
                        } placement="left-end">
                            <InfoIcon className="absolute top-2 right-3 text-gray-400" />
                        </Tooltip>
                        <h1 className="text-2xl">Portfolio Volatility</h1>
                        <div className="flex md:flex-row flex-col">
                            <Stat title={"Nifty 50"} style={`${vsNifty <= 1 ? "text-green-400" : "text-red-400"}`} value={vsNifty + "x"} />
                            <Stat title={"Debt"} style={`${vsDebt <= 10 ? "text-green-400" : "text-red-400"}`} value={vsDebt + "x"} />
                        </div>
                    </div>
                </div>
                <div className="div5 md:col-span-4 col-span-full row-span-1">
                    <div className="box relative flex flex-col justify-center items-center w-full p-8 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <Tooltip content={
                            <div className="px-1 py-2 max-w-64">
                                <div className="text-small font-bold mb-1">How much money would I earn ?</div>
                                <div className="text-tiny">These metrics simply display the returns generated over your chosen period of time. This along with volatility gives an idea of how much reward you earned for taking a unit of risk.</div>
                            </div>
                        } placement="left-end">
                            <InfoIcon className="absolute top-2 right-3 text-gray-400" />
                        </Tooltip>
                        <h1 className="text-2xl">Absolute Returns</h1>
                        <div className="flex md:flex-row flex-col ">
                            <Stat title={"My Portfolio"} style={`${retPf > 6 * parseInt(selectedValue.split(" ")[0]) ? retPf > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retPf + "%"} />
                            <Stat title={"Nifty 50"} style={`${retNifty > 6 * parseInt(selectedValue.split(" ")[0]) ? retNifty > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retNifty + "%"} />
                            <Stat title={"Debt"} style={`${retDebt > 6 * parseInt(selectedValue.split(" ")[0]) ? retDebt > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retDebt + "%"} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-full flex justify-center">
                <Button variant="shadow" color="secondary" onClick={() => {
                    // Redirect to another page
                    window.location.href = '/dashboards/risk-assessment';
                }} className="p-5 flex md:hidden mb-20 font-semibold" startContent={<FileQuestionIcon />}>Retake Risk Assessment</Button>

            </div>

        </>
    )
}