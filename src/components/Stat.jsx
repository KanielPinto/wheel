import React from 'react'

function Stat({ value, title, style}) {
  return (
        <div className="flex flex-col p-8 font-inter justify-center items-center">
            <p className={`${style} text-5xl`}>{value}</p>
            <p className='p-1'>{title}</p>
        </div>
  )
}

export default Stat