import React from 'react'
import mockData from '../constant/mockData'
import { useState } from 'react'


export const Category = ({ item, func }) => {
    const [items, setItems] = useState([]);

    return (

        <div className="px-4 py-1 shadow-md   gap-3 rounded-2xl bg-[#ffffff] text-nowrap scrollbar-thin mb-1 font-bold text-[#899198] hover:bg-[#0571ecdd] 
        hover:text-white">

            <button onClick={() => {

                if (item == "All") {
                    func(items);
                } else {
                    const filterItem = items.filter(
                        (i) => i.category.toLowerCase().includes(item.toLowerCase())
                    )
                    func(filterItem);
                }

            }}>

                {item}
            </button>

        </div>
    )
}


