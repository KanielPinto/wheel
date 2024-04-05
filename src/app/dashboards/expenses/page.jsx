'use client'
import UploadForm from '@/components/UploadForm'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import DataGridWrapper from '@/components/DataGridWrapper'
import CustomTableToolbar from '@/components/CustomTableToolbar'
import ExpenseTable from '@/components/expense-table/ExpenseTable'

function ExpenseTracker() {
    return (


        <div className='flex flex-col'>
            <h1 className="w-full py-4 text-3xl font-bold">Expense Tracking</h1>
            <div className="flex flex-row p-6">
                <UploadForm />
            </div>
            <div className='p-0 md:p-10'>
                <ExpenseTable></ExpenseTable>
            </div>


        </div>
    )
}

export default ExpenseTracker