import React from 'react'
import { FaRegEdit } from "react-icons/fa"
import { useState } from 'react';
import EditItem from './EditItem'; // Import the Modal component



const Items = ({ item, setFilteredItems, setItems }) => {

  const [showModal, setShowModal] = useState(false);


  return (
    <div className="my-scroll-container relative  border-b-2 flex gap-5 h-[70px]  px-3  font-bold   hover:bg-[#f2f3f4] transition-all 
    duration-150 no-scrollbar  w-full items-center bg-[#ffffff] " onClick={() => { }}>
      {/* {item.isFavorite ? <div className='absolute top-1  text-xs'>⭐</div> : ''} */}

      <img className="w-14 h-14 rounded-xl " src={item.logo } ></img>
      <div className="flex flex-col justify-center gap-1 overflow-hidden  ">
        <h3 className="text-base font-bold  text-[#323232] ">{item.name}</h3>
        <div className="flex">
          <p className="text-sm font-semibold  text-nowrap opacity-55">{item.email}</p>
        </div>
      </div>

      <div className="absolute right-3  ">

        <button
          onClick={() => setShowModal(true)}
        ><FaRegEdit size={18} color='#434343' />
        </button>

        <EditItem show={showModal} onClose={() => setShowModal(false)} item={item} setFilteredItems={setFilteredItems} setItems={setItems} />

      </div>
    </div>
  )
}

export default Items



