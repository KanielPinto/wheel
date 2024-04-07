'use client'
import LineChart from "@/components/LineChart";
import MySunburstChart from "@/components/MySunburstChart";
import { useEffect, useState } from "react";
import mydata from "./portfolio";
import PriceSlider from "@/components/PriceSlider";
import { useUser } from "@clerk/nextjs"
import 'chartjs-adapter-moment';
import { Slider, SliderValue, Tooltip } from "@nextui-org/react";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";



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

    const [value, setValue] = React.useState(1);
    const [inputValue, setInputValue] = React.useState("1");

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;

        setValue(value);
        setInputValue(value.toString());

        console.log(value);
    };

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1Year"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    // Only fetch on load
    useEffect(() => {
        if (!isLoading && user) {
            // Fetch user.id or perform any other actions
            console.log(user.id);

            fetch(process.env.API_BASE_URL + "/portfolio/", {
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

            fetch(process.env.API_BASE_URL+"/portfolio/past", {
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


    let investmentValue = PriceSlider.value;


    return (
        <>
            <h1 className="w-full py-4 text-3xl font-bold">My Wheel</h1>

            <div className="parent grid grid-cols-5 grid-rows-3 gap-5">
                <div className="div1 col-span-2 row-span-2">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] hover:border-white backdrop-blur-[20px] rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        {chartData && <MySunburstChart data={chartData} amount={amount} />}
                    </div>
                </div>
                <div className="div2 col-span-3 row-span-2">
                    <div className="w-full h-full">
                        {pastPortfolio && <LineChart data={pastPortfolio} data2={pastNifty} data3={pastDebt} xKey={"date"} yKey={"nav"} dataSetTitle={"My Portfolio"} />}
                    </div>
                </div>
                <div className="div3 col-span-1 row-span-1">
                    <div className="box relative  self-center flex flex-col justify-between items-stretch w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <Slider
                            label="Investment"
                            size="sm"
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
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize"
                                >
                                    {selectedValue}
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
                                <DropdownItem key="1Year">1Year</DropdownItem>
                                <DropdownItem key="3Years">3Years</DropdownItem>
                                <DropdownItem key="5Years">5Years</DropdownItem>
                                
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </div>
                <div className="div4 col-span-2 row-span-1">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Volatility</h1>
                        <h1 className={`${vsNifty <= 1 ? "text-green-600" : "text-red-600"}`}>(vs Nifty) {vsNifty}</h1>
                        <h1 className={`${vsDebt <= 10 ? "text-green-600" : "text-red-600"}`}>(vs Debt) {vsDebt}</h1>
                    </div>
                </div>
                <div className="div5 col-span-2 row-span-1">
                    <div className="box relative flex flex-col justify-between w-full h-full p-20 bg-[rgba(216,184,241,0.07)] border border-[rgba(255,255,255,0.222)] backdrop-blur-[20px] hover:border-white rounded-[0.7rem] transition-all duration-300 ease-in-out">
                        <h1>Returns (Absolute)</h1>
                        <h1 className={`${vsNifty > 0 ? "text-green-600" : "text-red-600"}`}>(Portfolio) {retPf}</h1>
                        <h1 className={`${vsDebt > 0 ? "text-green-600" : "text-red-600"}`}>(Nifty) {retNifty}</h1>
                        <h1 className={`${vsDebt > 0 ? "text-green-600" : "text-red-600"}`}>(Debt) {retDebt}</h1>
                    </div>
                </div>

            </div>

        </>
    )
}