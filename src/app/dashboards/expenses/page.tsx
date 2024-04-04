'use client'
import UploadForm from '@/components/UploadForm'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

function page() {

    const {user} = useUser();

    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        () => {
            fetch(`http://localhost:5000/transactions/${user?.id}`).then(async transactions => console.log(await transactions.json()))
        }
        console.log(transactions)
    }, []);


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 50,
            headerAlign: 'center',
        },
        { field: 'transactions_name', headerName: 'Name', minWidth: 50 },
    ]


    return (
        <div className='flex flex-col'>
            <h1 className="w-full py-4 text-3xl font-bold">Expense Tracking</h1>
            <div className="flex flex-row p-6">
                <UploadForm />
            </div>



        </div>
    )
}

export default page