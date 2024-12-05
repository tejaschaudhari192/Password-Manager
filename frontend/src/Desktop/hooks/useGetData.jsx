import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPasswordItems, setStatus } from '../utils/passwordSlice';
import { API_URL } from '../../../config';
import { getPasswords } from '../services/api';
import { useAuth } from '../context/AuthContext';
const useGetData = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    async function bolav() {
        const result = await getPasswords(user.token);
        const data = result.data;
        console.log(data);
        dispatch(setPasswordItems(data))
    }

    useEffect(() => {
        bolav()
    })

}

export default useGetData
