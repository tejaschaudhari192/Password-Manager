import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordItems, setStatus } from '../utils/passwordSlice';
import { getPasswords } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies'
const useGetData = () => {
    const token = Cookies.getItem('token')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const id = localStorage.getItem('id');
    function bolav() {
        getPasswords(token).then((result) => {
            const data = result.data;
            dispatch(setPasswordItems(data))
        }).catch((error) => {
            alert(error)
            if (error.status == 401)
                navigate('/login')
        });
    }

    useEffect(() => {
        bolav()
    }, [])

}

export default useGetData
