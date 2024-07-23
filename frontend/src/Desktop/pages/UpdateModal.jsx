import axios from 'axios';
import React, { useState } from 'react'

const UpdateModal = ({ curr, handleModalClose, handleChildModalShow, setData, setRowItems }) => {
    const [itemName, setItemName] = useState(curr.name);
    const [itemPassword, setItemPassword] = useState(curr.password);
    const [itemEmail, setItemEmail] = useState(curr.email);
    const [itemUsername, setItemUsername] = useState(curr.username);
    const [itemUrl, setItemUrl] = useState(curr.site);
    const [itemCategory, setItemCategory] = useState(curr.category);


    const handelUpdate = async () => {
        const id = curr._id;

        await axios.put(`http://localhost:8080/${id}`, {
            name: itemName,
            site: itemUrl,
            email: itemEmail,
            username: itemUsername,
            password: itemPassword,
            category: itemCategory,
            lastModified: Date.now()

        })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })

        await axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data)
                setRowItems(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        handleModalClose();

    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 absolute inset-0 transition-opacity duration-300" onClick={handleModalClose}></div>
            <div className="bg-gray-800 text-white rounded p-10 z-10">
                <h2 className="text-xl mb-4">Update {curr.name} </h2>

                <form>
                    <div className='flex gap-5'>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Title</label>
                            <input value={itemName} onChange={(e) => { setItemName(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                            <input value={itemCategory} onChange={(e) => { setItemCategory(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category" />
                        </div>
                    </div>

                    <div className='flex gap-5'>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">URL</label>
                            <input value={itemUrl} onChange={(e) => { setItemUrl(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="URL" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Email/Username</label>
                            <input value={itemEmail} onChange={(e) => { setItemEmail(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email/Username" />
                        </div>
                    </div>

                    <div className='flex gap-5 items-center'>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                            <input value={itemPassword} onChange={(e) => { setItemPassword(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Password" />
                        </div>
                        <button type='button' className='bg-green-400 h-8 px-2 text-black mt-2 rounded-md' onClick={handleChildModalShow}>Generate</button>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handelUpdate}
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
    )
}

export default UpdateModal
