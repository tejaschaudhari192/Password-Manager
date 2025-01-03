import axios from 'axios'
import { useEffect, useState } from 'react'
import { APT_URL } from '../../../config';


export const Category = ({ item, func }) => {
    const [items, setItems] = useState([]);
    const passwords = useSelector(store => store.passwords.passwords)

    useEffect(() => {
        setItems(passwords);
    }, [passwords])

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


