import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ItemList from './ItemList';
import ItemOn from './ItemOn';
import Navbar from './Navbar';
import axios from 'axios';
import Dashboard from './Dashboard';

const Homepage = () => {
    const [data, setData] = useState([])
    const [rowItems, setRowItems] = useState(data);
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getPasswords();
        console.log("effect rendered");
    }, []);

    async function getPasswords() {
        await axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data)
                setRowItems(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }


    // if (rowItems.length < 1) {
    //     return <div></div>
    // }

    return <div className='flex w-full h-full'>

        <Sidebar data={data} curr={setRowItems} setRowItems={setRowItems} />
        <div className='bg-[#050414] w-full flex flex-row'>
            <ItemList curr={setSelected} list={rowItems} rowFunc={setRowItems} />

            <div className='flex flex-col w-full h-full overflow-clip '>
                <Navbar />
                {
                    selected == null ? <Dashboard data={data} /> :
                        <ItemOn curr={selected} setData={setData} setSelected={setSelected} setRowItems={setRowItems} data={data} />

                }
            </div>

        </div>
    </div>
}

const getIconClass = (item) => {
    switch (item) {
        case 'Amazon Prime': return 'fab fa-amazon';
        case 'Apple TV+': return 'fab fa-apple';
        case 'Disney+': return 'fab fa-disney';
        case 'HBO Max': return 'fas fa-tv';
        case 'Hulu': return 'fas fa-hulu';
        case 'NFL GamePass': return 'fas fa-football-ball';
        case 'Netflix': return 'fab fa-netflix';
        case 'Spotify': return 'fab fa-spotify';
        case 'Twitch': return 'fab fa-twitch';
        case 'YouTube': return 'fab fa-youtube';
        default: return 'fas fa-tv';
    }
};

export default Homepage;
