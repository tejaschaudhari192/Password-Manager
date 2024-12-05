import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ItemList from './ItemList';
import ItemOn from './ItemOn';
import Navbar from './Navbar';
import axios from 'axios';
import Dashboard from './Dashboard';
import useGetData from '../hooks/useGetData';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';

const Homepage = () => {
    const [data, setData] = useState([])
    const passwords = useSelector(store => store.passwords.passwords)
    const selectedItem = useSelector(store => store.passwords.selectedItem)
    // console.log(selectedItem);
    const itemClose = useSelector(store => store.passwords.itemClose)

    useGetData();

    useEffect(() => {
        setData(passwords)
    }, [passwords, selectedItem])


    return <div className='flex w-full h-full '>

        <Sidebar />
        <div className='bg-[#f7f7f7] dark:bg-[#050414] w-full flex flex-row'>
            <ItemList />

            <div className='flex flex-col w-full h-full overflow-clip '>
                <Navbar />
                {
                    selectedItem == null || itemClose ? <Dashboard data={data} /> :
                        <ItemOn />

                }
            </div>

        </div>
    </div>
}


export default Homepage;
