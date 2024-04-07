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
            // Fetch user.id or perform any other actions
            console.log(user.id);

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

            console.log(selectedValue)

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
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>

            <div className="parent grid grid-cols-7 grid-rows-3 gap-5 font-inter">
                <div className="div1 md:col-span-3 col-span-full row-span-2">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] hover:border-white backdrop-blur-[20px] rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        {chartData && <MySunburstChart data={chartData} amount={parseInt(inputValue)} />}
                        <div className="pb-0 p-4 flex self-center items-center justify-center w-full">
                            <Slider
                                label="Investment Amount"
                                size="md"
                                step={1000}
                                maxValue={150000}
                                minValue={0}
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
                <div className="div2 md:col-span-4 col-span-full row-span-2">
                    <div className="w-full h-full">
                        <div className='flex flex-col justify-center shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white transition-all duration-300 ease-in-out rounded-xl items-center self-center w-full h-full'>
                            {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"My Portfolio"} />}
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize"
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
                <div className="div4 md:col-span-3 col-span-full row-span-1">
                    <div className="box relative flex flex-col justify-center items-center w-full p-8 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1 className="text-lg">Portfolio Volatility</h1>
                        <div className="flex flex-row">
                            <Stat title={"Nifty 50"} style={`${vsNifty <= 1 ? "text-green-400" : "text-red-400"}`} value={vsNifty + "x"} />
                            <Stat title={"Debt"} style={`${vsDebt <= 10 ? "text-green-400" : "text-red-400"}`} value={vsDebt + "x"} />
                        </div>
                    </div>
                </div>
                <div className="div5 md:col-span-4 col-span-full row-span-1">
                    <div className="box relative flex flex-col justify-center items-center w-full p-8 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1 className="text-lg">Absolute Returns</h1>
                        <div className="flex md:flex-row flex-col ">
                            <Stat title={"My Portfolio"} style={`${retPf > 6 * parseInt(selectedValue.split(" ")[0]) ? retPf > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retPf + "%"} />
                            <Stat title={"Nifty 50"} style={`${retNifty > 6 * parseInt(selectedValue.split(" ")[0]) ? retNifty > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retNifty + "%"} />
                            <Stat title={"Debt"} style={`${retDebt > 6 * parseInt(selectedValue.split(" ")[0]) ? retDebt > 12 * parseInt(selectedValue.split(" ")[0]) ? "text-green-400" : "text-yellow-400" : "text-red-400"}`} value={retDebt + "%"} />
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}