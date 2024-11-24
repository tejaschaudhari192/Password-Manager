import React from 'react'
import Homepage from './pages/Homepage';
import './App.css'
import appStore from './utils/appStore';
import { Provider } from 'react-redux';

const Desktop = () => {
  return (
    <Provider store={appStore}>

      <div className='relative bg-slate-700 font-sans h-screen w-screen text-white no-scrollbar flex justify-center items-center *:m-0 *:p-0 *:box-border'>
        <Homepage />
      </div>
    </Provider>
  )
}

export default Desktop;