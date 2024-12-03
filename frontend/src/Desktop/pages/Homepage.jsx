import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ItemList from './ItemList';
import ItemOn from './ItemOn';
import Navbar from './Navbar';
import axios from 'axios';
import Dashboard from './Dashboard';
import useGetData from '../hooks/useGetData';
import { APT_URL } from '../../../config';
import { useSelector } from 'react-redux';

const Homepage = () => {
    const [data, setData] = useState([])
    const [rowItems, setRowItems] = useState(data);
    const [selected, setSelected] = useState(null)
    const selectedItem = useSelector(store => store.passwords.selectedItem)

    useGetData();

    useEffect(() => {
        getPasswords();
        console.log("effect rendered");
    }, []);

    async function getPasswords() {
        await axios.get(APT_URL)
            .then((response) => {
                setData(response.data)
                setRowItems(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return <div className='flex w-full h-full '>

        <Sidebar data={data} curr={setRowItems} setRowItems={setRowItems} />
        <div className='bg-[#f7f7f7] dark:bg-[#050414] w-full flex flex-row'>
            <ItemList curr={setSelected} list={rowItems} rowFunc={setRowItems} />

            <div className='flex flex-col w-full h-full overflow-clip '>
                <Navbar />
                {
                    selectedItem == null ? <Dashboard data={data} /> :
                        <ItemOn setData={setData} setSelected={setSelected} setRowItems={setRowItems} />

                }
            </div>

        </div>
    </div>
}


export default Homepage;
