import UploadForm from '@/components/UploadForm'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col'>
            <h1 className="w-full py-4 px-6 text-3xl font-bold">Expense Tracking</h1>
            <div className="flex flex-row p-6">
            <UploadForm />
            </div>
            
        </div>
    )
}

export default page