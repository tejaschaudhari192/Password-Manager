import React, { useState } from 'react';
import icon from '../assets/icon.svg'
import './homepage.css'
import { items } from './items';
import PasswordGeneratorModal from './PasswordGenerator';
import axios from 'axios';

const getElementsOfCategories = (data, categories) => {
    return data.filter(item => categories.includes(item.category));
};

const getFavoriteElements = (data) => {
    return data.filter(item => item.isFavorite);
};

const getElementsOfType = (data, type) => {
    console.log('typee');
    return data.filter(item => item.type === type);
};

function getCategories(data) {
    const uniqueCategories = [...new Set(data.map(item => item.category))];

    // console.log(uniqueCategories);
    return uniqueCategories;
}

function SideItem({ data, icon, title, func, isf }) {
    // const Colors = ["#00FF00", "#FF7F00", "#0000FF", "#FF0000", "#8B00FF", "#FFFF00", "#4B0082"];
    return <div className='flex items-center gap-3 my-4 opacity-80 hover:opacity-100 hover:cursor-pointer'
        onClick={() => { isf ? func(getFavoriteElements(data)) : func(getElementsOfType(data, title)) }}>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
}

function SideCategory({ data, title, icon, cat, func }) {

    return <div className='flex items-center'>
        <div className='flex items-center gap-3 w-40 px-2 py-2 opacity-80 
    hover:opacity-100 hover:cursor-pointer 
    rounded-md hover:bg-[#272936]
    transition-all duration-200'
            onClick={() => { func(getElementsOfCategories(data, cat)) }}>
            <span>{icon}</span>
            <span>{title}</span>
        </div>
    </div>
}

const Sidebar = ({ data, curr, setRowItems }) => {
    const [modalShow, setModalShow] = useState(false);
    const [childModalShow, setChildModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const handleChildModalClose = () => setChildModalShow(false);
    const handleChildModalShow = () => setChildModalShow(true);

    const [itemName, setItemName] = useState();
    const [itemPassword, setItemPassword] = useState();
    const [itemEmail, setItemEmail] = useState();
    const [itemUsername, setItemUsername] = useState();
    const [itemUrl, setItemUrl] = useState();
    const [itemCategory, setItemCategory] = useState();

    const saveItem = async () => {
        const item = {
            name: itemName,
            site: itemUrl,
            email: itemEmail,
            username: itemUsername,
            password: itemPassword,
            category: itemCategory
        }
        console.log(item);
        await axios.post('http://localhost:8080/', item).then((response) => {
            console.log(response);
        })

        await axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data)
                setRowItems(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
        handleModalClose()

    }



    return (
        <aside className="sidebar-gradient h-full text-white w-96 p-8 flex flex-col transition-all duration-300">
            <div className="flex items-center mb-8">
                <img className='w-6 mr-3' src={icon}></img>
                <span className="text-2xl font-bold">Vault</span>
            </div>
            <nav className="flex-1 transition-all duration-200">
                <SideItem icon="🏠" title="Logins" isf={false} func={curr} />
                <SideItem icon="💳" title="Credit Cards" isf={false} func={curr} />
                <SideItem icon="📝" title="Notes" isf={false} func={curr} />
                <SideItem icon="⭐" title="Favorites" isf={true} func={curr} data={data} />

                {/*Categories*/}
                <div className="mt-9">
                    <p className=" m-3 p-2 font-semibold">Categories</p>

                    <div className='flex items-center'>
                        <div className='flex items-center gap-3 w-40 px-2 py-2 opacity-80 hover:opacity-100 hover:cursor-pointer rounded-md hover:bg-[#272936] transition-all duration-200'
                            onClick={() => setRowItems(data)}>
                            <span>•</span>
                            <span>All</span>
                        </div>
                    </div>

                    {getCategories(data).map((category, index) => {
                        return <SideCategory data={data} isCat={true} icon="•" title={category} key={index - 20} cat={category} func={curr} />
                    })}

                </div>
            </nav>

            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 mt-6 rounded"
                onClick={handleModalShow}
            >
                New item +
            </button>

            {/* Modal */}
            {modalShow && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0 transition-opacity duration-300" onClick={handleModalClose}></div>
                    <div className="bg-gray-800 text-white rounded p-10 z-10">
                        <h2 className="text-xl mb-4">Add New Item</h2>
                        <form>
                            <div className='flex gap-5'>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">Title</label>
                                    <input onChange={(e) => { setItemName(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                                    <input onChange={(e) => { setItemCategory(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category" />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">URL</label>
                                    <input onChange={(e) => { setItemUrl(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="URL" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">Email/Username</label>
                                    <input onChange={(e) => { setItemEmail(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email/Username" />
                                </div>
                            </div>

                            <div className='flex gap-5 items-center'>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                                    <input onChange={(e) => { setItemPassword(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Password" />
                                </div>
                                <button type='button' className='bg-green-400 h-8 px-2 text-black mt-2 rounded-md' onClick={handleChildModalShow}>Generate</button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={saveItem}
                                >
                                    Save
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleModalClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <PasswordGeneratorModal isOpen={childModalShow} onClose={handleChildModalClose} />
        </aside>
    );
};

export default Sidebar;
