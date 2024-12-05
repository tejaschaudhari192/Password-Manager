import React, { useState } from 'react'
import { CiEdit, CiStar } from 'react-icons/ci'
import { FaEdit, FaEye, FaEyeSlash, FaRegClipboard, FaRegEdit, FaRegStar, FaStar } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'

import UpdateModal from './UpdateModal'
import { useDispatch, useSelector } from 'react-redux'
import { APT_URL } from '../../../config'
import { setItem, setPasswordItems, setStatus } from '../utils/passwordSlice'
import { deletePassword, getPasswords } from '../services/api'
import { useAuth } from '../context/AuthContext'
import useGetData from '../hooks/useGetData'


const formatDateAndCalculateDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    // Format date to DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Calculate the difference in days
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffDays = Math.round((today - date) / oneDay);

    // Determine how many days ago
    let daysAgoText;
    if (diffDays === 0) {
        daysAgoText = 'today';
    } else if (diffDays === 1) {
        daysAgoText = 'yesterday';
    } else if (diffDays > 30) {
        const monthsAgo = Math.floor(diffDays / 30);
        daysAgoText = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else {
        daysAgoText = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    return { formattedDate, daysAgoText };
};


const Field = ({ name, value }) => {
    return <div>
        <p className='text-base text-blue-400'>{name}</p>
        <p className='text-lg dark:text-white'>{value}</p>
    </div>
}

const PasswordItem = ({ password }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        <div className='flex flex-col'>
            <p className='text-base'>Password</p>
            <div className="relative flex w-4/5">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    readOnly
                    className=" w-full text-lg bg-inherit dark:text-white border-none rounded-md focus:outline-none"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-12 p-2 dark:text-white"
                >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
                <button
                    type="button"
                    onClick={copyToClipboard}
                    className="absolute right-2 p-2 dark:text-white"
                >
                    <FaRegClipboard size={20} />
                </button>
            </div>
        </div>
    );
};

const ItemOn = ({ setData, setSelected, setRowItems }) => {
    const currentItem = useSelector(store => store.passwords.selectedItem)
    const dispatch = useDispatch();
    const { user } = useAuth();

    const [favorite, setFavorite] = useState(currentItem.isFavorite);
    const [modalShow, setModalShow] = useState(false);
    const [childModalShow, setChildModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);


    const handleDelete = async () => {
        dispatch(setStatus("Updating"));

        const id = currentItem._id;
        console.log(id);
        await deletePassword(id, user.token)
        const result = await getPasswords(user.token);

        dispatch(setPasswordItems(await result.data));
        dispatch(setStatus("Connected"));
    }


    // const handleFavorite = async () => {
    //     setFavorite(!favorite)
    //     const id = currentItem._id;

    //     await axios.put(APT_URL + `/${id}`, {
    //         isFavorite: !favorite

    //     })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })



    //     await axios.get(APT_URL)
    //         .then((response) => {

    //             setData(response.data)
    //             setRowItems(response.data)

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    return (
        <div className='bg-orange-50 border-4 dark:border-0 my-auto text-black dark:bg-[#181b2c] w-full rounded-2xl p-10'>
            <button className="bg-red-500 text-white p-2 mt-4 rounded absolute right-5 top-16" onClick={() => { dispatch(setItem(null)) }}>Close</button>
            <div className='flex justify-end gap-2 w-full h-8 dark:text-white'>
                {/* <div onClick={() => handleFavorite()}>
                    {(currentItem.isFavorite == true) ?
                        <FaStar size={30} /> :
                        <FaRegStar size={30} />
                    }
                </div> */}
                <FaEdit className='cursor-pointer' size={30} onClick={handleModalShow} />
                <AiOutlineDelete className='cursor-pointer' size={30} onClick={() => { handleDelete(currentItem) }} />
            </div>


            <div className=" flex gap-4 h-16 w-[400px] p-2 rounded-xl">

                <img className="w-14 h-14 rounded-xl bg-transparent" src={currentItem.logo}></img>
                <div className="flex flex-col justify-center gap-1 overflow-hidden dark:text-white">
                    <h3 className="text-base font-bold">{currentItem.name}</h3>
                    <div className="flex">
                        <p className="text-sm font-semibold text-nowrap opacity-55">{currentItem.category}</p>
                    </div>
                </div>
            </div>

            <button className="bg-orange-500 text-white p-2 mt-4 rounded" onClick={handleModalShow}>Update now</button>
            <div className="mt-6 flex flex-col gap-10">

                <Field value={currentItem.site} name="Website" />
                <Field value={currentItem.username} name="Username" />
                <Field value={currentItem.email} name="Email" />
                <PasswordItem password={currentItem.password} />

            </div>
            <div className="mt-6 text-gray-500 text-sm">
                Last modified : {formatDateAndCalculateDaysAgo(currentItem.lastModified).daysAgoText}  {formatDateAndCalculateDaysAgo(currentItem.lastModified).formattedDate}
            </div>

            {/* Modal */}
            {modalShow && <UpdateModal currentItem={currentItem} handleModalClose={handleModalClose} setRowItems={setRowItems} setData={setData} />}

        </div>
    )
}

export default ItemOn
