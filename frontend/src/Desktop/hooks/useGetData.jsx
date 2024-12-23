import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordItems, setStatus } from '../utils/passwordSlice';
import { API_URL } from '../../../config';
import { getPasswords } from '../services/api';
import { useAuth } from '../context/AuthContext';
const useGetData = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    async function bolav() {
        console.log(id);
        const result = await getPasswords(token, id);
        const data = result.data;
        console.log(data);
        dispatch(setPasswordItems(data))
    }

    useEffect(() => {
        bolav()
    }, [id])

}

export default useGetData
