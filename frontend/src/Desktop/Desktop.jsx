import React from 'react'
import Homepage from './pages/Homepage';
import './App.css'
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  return user ? children : <Navigate to="/login" />;
};

const Desktop = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Provider store={appStore}>
                  <div className='relative bg-slate-700 font-sans h-screen w-screen text-white no-scrollbar flex justify-center items-center *:m-0 *:p-0 *:box-border'>
                    <Homepage />
                  </div>
                </Provider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default Desktop;