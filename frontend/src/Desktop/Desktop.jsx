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
import Spinner from './components/Loader';
const Desktop = () => {

  const [token, setToken] = useState(Cookies.getItem('token'));
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const saveToken = (userToken) => {
    Cookies.setItem('token', userToken)
    setToken(userToken);
  };

  const logout = () => {
    Cookies.removeItem('token')
    setIsAuthenticated(false);
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
            setIsAuthenticated(true)

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
    setLoading(false);
  }, [])

  if (loading)
    return <Spinner />

  return (

    <Routes>
      {/* if location / is then redirect to appropriate route but the routes children should be route only dont use navigae*/}
      {isAuthenticated && <Route path="/" element={<Navigate to="/home" />} />}
      {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}

      {!isAuthenticated && <><Route path="/login" element={<Login setToken={saveToken} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setToken={saveToken} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} /></>}

      {/* Protected route home*/}
      {isAuthenticated &&
        <Route
          path="/home"
          element={
            <Provider store={appStore}>
              <div className='relative bg-slate-700 font-sans h-screen w-screen text-white no-scrollbar flex justify-center items-center *:m-0 *:p-0 *:box-border'>
                <Homepage token={token} isAuthenticated={isAuthenticated} />
              </div>
            </Provider>
          }
        />}
    </Routes>

  )
}

export default Desktop;