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
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies'
import Spinner from '../components/Loader';
const Homepage = ({ token, isAuthenticated }) => {
    const [data, setData] = useState([])
    const passwords = useSelector(store => store.passwords.passwords)
    const selectedItem = useSelector(store => store.passwords.selectedItem)
    // console.log(selectedItem);
    const itemClose = useSelector(store => store.passwords.itemClose)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    useGetData();

    useEffect(() => {
        console.log(token);
        if (!isAuthenticated) {

            navigate("/login");
            // setLoading(false);
        }
        else setLoading(false);
        setData(passwords)
    }, [])

    if (loading)
        return <Spinner />
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
