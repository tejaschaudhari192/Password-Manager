import React, { useEffect, useState } from 'react'
// import { items } from './items';
import './homepage.css'
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from '../utils/passwordSlice';
// import tapp from '../assets/tap.wav'
// import useSound from 'use-sound';

const Item = ({ item, func }) => {
    const dispatch = useDispatch();
    // const [tap] = useSound(tapp);
    // console.log(item.name);
    return (
        <div className="my-scroll-container border-gray-400 dark:bg-inherit relative  mx-3 flex shrink-0 items-center gap-4 h-16 w-[400px] p-4 py-10 rounded-xl hover:bg-gray-300 dark:hover:bg-blue-500 transition-all duration-150 no-scrollbar cursor-pointer"
            onClick={() => {
                func(item)
                dispatch(setItem(item))
                // tap()
            }}>
            {item.isFavorite ? <div className='absolute right-1 text-xs'>⭐</div> : ''}

            <img className="w-[50px] h-[50px] rounded-xl bg-transparent object-cover" src={item.logo}></img>
            <div className="flex flex-col justify-center gap-1 overflow-hidden">
                <h3 className="text-base font-semibold text-black dark:text-white">{item.name}</h3>
                <div className="flex">
                    <p className="text-sm font-medium text-black dark:text-white text-nowrap opacity-55">{item.email ? item.email : item.username}</p>
                </div>
            </div>
        </div>
    )
}

function handleSearch(text, func, items) {
    return func(items.filter(item => item.name.toLowerCase().includes(text)))
}

const ItemList = ({ curr, rowFunc }) => {
    const [searchText, setSearchText] = useState("");
    const [items, setItems] = useState([])
    const passwords = useSelector(store => store.passwords.passwords)
    const selectedCategory = useSelector(store => store.passwords.selectedCategory)

    useEffect(() => {
        setItems(passwords)
    }, [passwords])

    useEffect(() => {
        const filterdata = passwords.filter(item => selectedCategory.includes(item.category));
        setItems(filterdata)
    }, [selectedCategory])

    return (
        <div className='flex flex-col'>
            <div className='flex items-center input-box m-5 border-2 dark:border-0 border-gray-200 bg-white text-black dark:text-white dark:bg-[#181b2c] rounded-xl px-2 gap-2'>
                <CiSearch color='#4384fc' />
                <input autoFocus
                    className='bg-inherit text-sm h-10' type='text' placeholder='Search...'
                    onChange={(e) => { handleSearch(e.target.value, rowFunc, items) }}>
                </input>
            </div>
            <div className='min-w-fit overflow-x-hidden hide-scrollbar'>

                {items.map((item, index) => {
                    return <Item key={index} item={item} func={curr} />
                })}
            </div>
        </div>

    )
}

export default ItemList;