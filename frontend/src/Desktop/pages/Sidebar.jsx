// Sidebar.js
import React, { useEffect, useState } from 'react';
import icon from '../assets/icon.svg'
import './homepage.css'
import { items } from './items';
import axios from 'axios';
import generatePassword from './PasswordGenerator';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPasswordItems, setRowItems, setStatus } from '../utils/passwordSlice';
import { addPassword, getPasswords } from '../services/api';
import { IconButton, Snackbar } from '@mui/material';
import { IoClose } from "react-icons/io5";

import Cookies from 'js-cookies'
const getElementsOfCategories = (data, categories) => {
    return data.filter(item => categories.includes(item.category));
};

const getFavoriteElements = (data) => {
    return data.filter(item => item.isFavorite);
};

const getElementsOfType = (data, type) => {
    return data.filter(item => item.type === type);
};

function getCategories(passwords) {
    // console.log(passwords);
    const uniqueCategories = [...new Set(passwords.map(item => item.category))];
    return uniqueCategories;
}

function SideItem({ data, icon, title }) {
    return <div className='flex items-center gap-4 my-6 opacity-80 hover:opacity-100 hover:cursor-pointer'>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
}

function SideCategory({ data, category }) {
    const dispatch = useDispatch();

    return <div className='flex items-center'>
        <div className='flex items-center gap-4 my-2 w-40 px-2 py-2 opacity-80 hover:opacity-100 hover:cursor-pointer rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-slate-700 transition-all duration-200'
            onClick={() => {
                dispatch(setCategory(category))
            }}
        >
            <span>•</span>
            <span>{category}</span>
        </div>
    </div>
}

const Sidebar = () => {
    const passwords = useSelector(store => store.passwords.passwords)
    const dispatch = useDispatch();

    const token = Cookies.getItem('token')

    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const [itemName, setItemName] = useState('');
    const [itemPassword, setItemPassword] = useState('');
    const [itemEmail, setItemEmail] = useState('');
    const [itemUsername, setItemUsername] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [itemCategory, setItemCategory] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const action = (
        <React.Fragment>

            <IconButton
                size="medium"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <IoClose fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const saveItem = async () => {
        setOpen(true);
        dispatch(setStatus("Updating"));

        const id = localStorage.getItem('id')

        const item = {
            name: itemName,
            site: itemUrl,
            email: itemEmail,
            username: itemUsername,
            password: itemPassword,
            category: itemCategory
        };
        await addPassword(item, token, id);

        const result = await getPasswords(token);
        dispatch(setPasswordItems(await result.data));
        dispatch(setStatus("Connected"));
        handleModalClose();
    };

    const handleFavoriteFilter = async () => {
        console.log('fav');
        dispatch(setStatus("Updating"));
        const filteredList = await getFavoriteElements(passwords);
        // console.log(filteredList);

        dispatch(setRowItems(filteredList))
        dispatch(setStatus("Connected"));
    }


    return (
        <aside className="border-r-2 dark:border-0 border-gray-300 bg-[#262835] h-full text-white w-[450px] p-8 flex flex-col transition-all duration-300">
            <div className="flex items-center mb-8">
                <img className='w-6 mr-3' src={icon} alt="Icon" />
                <span className="text-2xl font-bold">Vault</span>
            </div>
            <nav className="flex-1 transition-all duration-200">
                <SideItem icon="🏠" title="Logins" />
                <SideItem icon="💳" title="Credit Cards" />
                <SideItem icon="📝" title="Notes" />
                <div onClick={() => { handleFavoriteFilter() }}>
                    <SideItem icon="⭐" title="Favorites" />
                </div>

                {/* Categories */}
                <div className="mt-9">
                    <p className="m-3 p-2 text-lg font-semibold">Categories</p>
                    <div className='flex items-center' >
                        <div
                            className='flex items-center gap-3 w-40 px-2 py-2 opacity-80 hover:opacity-100 hover:cursor-pointer rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-slate-700 transition-all duration-200'
                            onClick={() => {
                                dispatch(setCategory(null))
                                setRowItems(passwords)
                            }}
                        >
                            <span>•</span><span>All</span>
                        </div>
                    </div>

                    {passwords ? getCategories(passwords).map((category, index) => {
                        return <SideCategory icon="•" key={index} category={category} />
                    }) : ('')}
                </div>
            </nav>

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 mt-6 rounded" onClick={handleModalShow}>New item +</button>

            <Modal
                show={modalShow}
                handleClose={handleModalClose}
                handleSave={saveItem}
                setItemName={setItemName}
                setItemCategory={setItemCategory}
                setItemUrl={setItemUrl}
                setItemEmail={setItemEmail}
                setItemUsername={setItemUsername}
                itemPassword={itemPassword}
                setItemPassword={setItemPassword}
                generatePassword={generatePassword}
            />

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Item Saved"
                action={action}
            />

        </aside>
    );
};

export default Sidebar;
