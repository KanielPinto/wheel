'use client'
import React, { useEffect, useState } from 'react'
import ExpenseTable from '@/components/expense-table/ExpenseTable'
import ExpenseCategoryChart from '@/components/expense-category-chart';
import { useUser } from "@clerk/nextjs"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa";
import ExpensesBarGraph from '@/components/expenses-bar-graph';
import CustomLegend from '@/components/CustomLegend';


function ExpenseTracker() {
    const data = [1200, 1500, 800, 900, 1100, 1400];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];


    const { user, isLoading } = useUser();


    const [categoryCount, setCategoryCount] = useState(null);
    const [modeCount, setModeCount] = useState(null);
    const [highestExpense, setHighestExpense] = useState(null);
    const [highestIncome, setHighestIncome] = useState(null);


    const [selectedKeys, setSelectedKeys] = useState(new Set(["Last Month"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const today = new Date();

    const currentDate = today.toISOString().substring(0, 23);


    const timePeriod = React.useMemo(() => {
        let priorDate;

        switch (selectedValue) {
            case 'Last Month':
                priorDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString().substring(0, 23);
                return priorDate;
            case 'Last 6 Months':
                priorDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()).toISOString().substring(0, 23);
                return priorDate;
            case 'Last Year':
                priorDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString().substring(0, 23);
                return priorDate;
            case 'All Time':
                return new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().substring(0, 23);
            default:
                return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString().substring(0, 23);
        }
    }, [selectedValue]);


    useEffect(() => {
        if (!isLoading && user) {

            const fetchData = async () => {

                try {
                    var categoryResponse = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/transactions/by/category", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "uid": user.id,
                            "start_date": timePeriod,
                            "end_date": currentDate,
                        })
                    });
                    var categoryData = await categoryResponse.json();
                    categoryData = categoryData.result;
                    setCategoryCount(categoryData);

                    var modeResponse = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/transactions/by/mode", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "uid": user.id,
                            "start_date": timePeriod,
                            "end_date": currentDate,
                        })
                    });
                    var modeData = await modeResponse.json();
                    modeData = modeData.result;
                    setModeCount(modeData);



                    var highestExpenseResponse = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/transactions/expense", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "uid": user.id,
                            "start_date": timePeriod,
                            "end_date": currentDate,
                            "count": 3,
                        })
                    });
                    var highestExpenseData = await highestExpenseResponse.json();
                    highestExpenseData = highestExpenseData.result;
                    setHighestExpense(highestExpenseData);


                    var highestIncomeResponse = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/transactions/income", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "uid": user.id,
                            "start_date": timePeriod,
                            "end_date": currentDate,
                            "count": 3,
                        })
                    });
                    var highestIncomeData = await highestIncomeResponse.json();
                    highestIncomeData = highestIncomeData.result;
                    setHighestIncome(highestIncomeData);




                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            fetchData();




        }
    }, [isLoading, user, selectedValue])

    return (


        <div className='flex flex-col gap-8 lg:gap-0 mb-16'>
            <div className="flex flex-col md:flex-row w-full md:justify-between items-center">
                <h1 className="w-full py-6 text-3xl font-bold">Expense Tracking</h1>
                <Dropdown size='md'>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            size='md'
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
                        <DropdownItem key="Last Month">Last Month</DropdownItem>
                        <DropdownItem key="Last 6 Months">Last 6 Months</DropdownItem>
                        <DropdownItem key="Last Year">Last Year</DropdownItem>
                        <DropdownItem key="All Time">All Time</DropdownItem>

                    </DropdownMenu>
                </Dropdown>
            </div>


            <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-8 lg:px-10'>
                    <div className="flex flex-col shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white p-6 transition-all duration-100 ease-in-out rounded-xl justify-center items-center self-center align-middle w-full h-full">
                        <h1 className="text-2xl">Expense Modes</h1>
                        <div className='flex flex-col lg:p-2 justify-center sm:flex-row p-0'>
                            <div className='lg:w-96 w-fit'>
                                <ExpenseCategoryChart data={modeCount?.map((data) => data['count'])} labels={modeCount?.map((data) => data['_id']['mode'])} title="" />

                            </div>
                            {/* {modeCount && <CustomLegend items={modeCount} label={"mode"} className={'w-[50%] font-sans self-center align-middle'} />} */}

                        </div>
                    </div>

                    <div className="flex flex-col shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white p-6 transition-all duration-100 ease-in-out rounded-xl justify-center items-center self-center align-middle w-full h-full">
                        <h1 className="text-2xl">Expense Categories</h1>
                        <div className='flex flex-col p-2 justify-center sm:flex-row '>
                            <div className='lg:w-96 w-fit'>
                                <ExpenseCategoryChart data={categoryCount?.map((data) => data['count'])} labels={categoryCount?.map((data) => data['_id']['category'])} title="" />

                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 lg:px-10 w-full'>
                    <div className='flex flex-col justify-center p-6 shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white transition-all duration-300 ease-in-out rounded-xl items-center self-center w-full h-full'>
                        <h1 className="text-2xl">Top Expenses</h1>

                        <div className='w-full p-2'>
                            <ExpensesBarGraph data={highestExpense?.map((data) => data['Amount'])} labels={highestExpense?.map((data) => data['Beneficiary'])} />
                        </div>


                    </div>
                    <div className='flex flex-col justify-center p-6 shadow-soft bg-[rgba(216,184,241,0.07)] border border-[rgba(244,235,248,0.22)] backdrop-blur-[20px] hover:border-white transition-all duration-300 ease-in-out rounded-xl items-center self-center w-full h-full'>
                        <h1 className="text-2xl">Top Incoming</h1>

                        <div className='w-full p-2'>
                            <ExpensesBarGraph data={highestIncome?.map((data) => data['Amount'])} labels={highestIncome?.map((data) => data['Beneficiary'])} />

                        </div>
                    </div>
                </div>

            </div>


            <div className='p-0 md:p-10'>
                <ExpenseTable></ExpenseTable>
            </div>



        </div>
    )
}

export default ExpenseTracker