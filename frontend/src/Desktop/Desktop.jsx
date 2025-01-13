import React, { useState, useEffect } from 'react'
import Homepage from './pages/Homepage';
import './App.css'
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Cookies from 'js-cookies';
import { API_URL } from '../../config';

const Desktop = () => {

  const [token, setToken] = useState(Cookies.getItem('token'));
  const navigate = useNavigate();
  const saveToken = (userToken) => {
    Cookies.setItem('token', userToken)
    setToken(userToken);
  };

  const logout = () => {
    Cookies.removeItem('token')
    setToken(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {

          const response = await fetch(API_URL + 'auth/verifyToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("the data is:", data)
          if (data.success === true) {
            navigate("/home")

          }
          else {
            logout();
            Navigate("/login")

          }
        }
      }
      catch (error) {
        console.error(error);
      }

    }
    fetchData();
  }, [token, navigate])



  return (

    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setToken={saveToken} />} />
      <Route path="/register" element={<Register setToken={saveToken} />} />
      {/* Protected route home*/}

      <Route
        path="/home"
        element={
          <Provider store={appStore}>
            <div className='relative bg-slate-700 font-sans h-screen w-screen text-white no-scrollbar flex justify-center items-center *:m-0 *:p-0 *:box-border'>
              <Homepage token={token} />
            </div>
          </Provider>
        }
      />
    </Routes>

  )
}

export default Desktop;