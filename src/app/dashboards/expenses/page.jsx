'use client'
import React, {  } from 'react'
import ExpenseTable from '@/components/expense-table/ExpenseTable'

function ExpenseTracker() {
    return (


        <div className='flex flex-col'>
            <h1 className="w-full py-6 text-3xl font-bold">Expense Tracking</h1>
            
            <div className='p-0 md:p-10'>
                <ExpenseTable></ExpenseTable>
            </div>


        </div>
    )
}

export default ExpenseTracker