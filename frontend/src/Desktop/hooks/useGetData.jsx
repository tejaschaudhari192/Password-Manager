import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordItems, setStatus } from '../utils/passwordSlice';
import { API_URL } from '../../../config';
import { getPasswords } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
const useGetData = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
    async function bolav() {
        // console.log(id);
        await getPasswords(token, id).then((result) =>{
            const data = result.data;
            dispatch(setPasswordItems(data))
        }).catch((error)=>{
            alert(error)
            if (error.status == 401)
                navigate('/login')
        });
    }

    useEffect(() => {
        bolav()
    }, [id])

}

export default useGetData
