import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserID } from "../utils/passwordSlice";
import Cookies from 'js-cookies';
import Spinner from "../components/Loader";
const Login = ({ setToken, setIsAuthenticated, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log(res.data);
      const id = await res.data._id;
      // dispatch(setUserID(await res.data._id))
      console.log(id);


      setToken(await res.data.token);
      setIsAuthenticated(true);
      alert("Login Successful");
      await navigate('/')

    } catch (error) {
      if (error.status == 404) {
        alert("User not exist")
      }
      else if (error.status == 401) {
        alert("Wrong Password")
      }

    }
  };
  useEffect(() => {
    //check token if present then navigate to home from cookies
    if (isAuthenticated) {

      navigate('/home')
    }
    else {
      console.log('loading is false in login')
      setLoading(false);
    }


  }, [isAuthenticated])
  if (loading && isAuthenticated)
    return <Spinner />
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login to Vault</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-green-600 rounded-lg hover:bg-green-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
