'use client'
import UploadForm from '@/components/UploadForm'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import DataGridWrapper from '@/components/DataGridWrapper'
import CustomTableToolbar from '@/components/CustomTableToolbar'


function page() {

    const { user } = useUser();
    const [transactions, setTransactions] = useState(null);
    const [isUserAvailable, setIsUserAvailable] = useState(false);

    useEffect(() => {
        if (user) {
            setIsUserAvailable(true);
        } else {
            setIsUserAvailable(false);
        }
    }, [user]);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (isUserAvailable && user?.id) {
                try {
                    const response = await fetch(`http://localhost:5000/transactions/${user.id}`);
                    const data = await response.json();
                    setTransactions(data);
                    console.log(data)
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            }
        };

        fetchTransactions();
    }, [isUserAvailable, user?.id]);


    const columns = [
        {
            field: 'transaction_id',
            headerName: 'ID',
            minWidth: 100,
            headerAlign: 'center',
            flex: 0.1
        },
        { field: 'Beneficiary', headerName: 'Title', minWidth: 50, flex:0.1 },
        { field: 'Category', headerName: 'Category', minWidth: 50 },
        { field: 'Mode', headerName: 'Mode', minWidth: 50 },
        { field: 'Date', headerName: 'Date', minWidth: 50 },
        { field: 'Deposit Amt.', headerName: 'Deposit Amt.', minWidth: 50 },
        { field: 'Withdrawal Amt.', headerName: 'Withdrawal Amt.', minWidth: 50 },
    ]


    return (
        <div className='flex flex-col'>
            <h1 className="w-full py-4 text-3xl font-bold">Expense Tracking</h1>
            <div className="flex flex-row p-6">
                <UploadForm />
            </div>

            {transactions && <DataGridWrapper columns={columns} rows={transactions['result']} slots={{ toolbar: CustomTableToolbar }} slotProps={{
                toolbar: {
                    buttons: [
                        // Need to go to a form kinda page to create a new manual transaction 
                        { title: "Add Transaction", link: "/transactions/new" },
                    ]
                }
            }}   ></DataGridWrapper>}

        </div>
    )
}

export default page