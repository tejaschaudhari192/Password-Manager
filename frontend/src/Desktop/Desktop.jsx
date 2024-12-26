import React, { useState } from 'react'
import Homepage from './pages/Homepage';
import './App.css'
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';


const Desktop = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={saveToken} />} />
        <Route path="/register" element={<Register setToken={saveToken} />} />
        <Route
          path="/home"
          element={
            <Provider store={appStore}>
              <div className='relative bg-slate-700 font-sans h-screen w-screen text-white no-scrollbar flex justify-center items-center *:m-0 *:p-0 *:box-border'>
                <Homepage />
              </div>
            </Provider>
          }
        />
      </Routes>
    </Router>
  )
}

export default Desktop;