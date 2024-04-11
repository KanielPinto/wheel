import React from 'react'


const CustomLegend = ({ items, className, label }) => {
    return (
        <div className={`bg-transparent ` + className}>
            <div className="flex max-h-[35vh] w-full flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {
                    items.map((item, index) => (
                        <button key={index} className="group flex items-center gap-x-3 bg-transparent rounded-md px-2 py-2 transition-all duration-75">
                            <div className={"flex h-6 w-6 items-center rounded-lg text-white " + (
                                (index) % 7 == 6 ? "bg-[#c8cbce]"
                                    : (index) % 7 == 5 ? "bg-[#9867ff]"
                                        : (index) % 7 == 4 ? "bg-[#4ac0c1]"
                                            : (index) % 7 == 3 ? "bg-[#fecc56]"
                                                : (index) % 7 == 2 ? "bg-[#fe9f41]"
                                                    : (index) % 7 == 1 ? "bg-[#ff6285]" : "bg-[#37a3eb]")}>
                                {/* <span className="tag w-full text-center text-xs font-extralight text-gray-700 group-hover:text-green-900"> H3 </span> */}
                            </div>
                            <div className="flex flex-col items-start justify-between font-light text-white">
                                <p className="text-md break-all">{item['_id'][label]}</p>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default CustomLegend