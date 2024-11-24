import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPasswordItems } from '../utils/passwordSlice';
import { APT_URL } from '../../../config';
const useGetData = () => {
    const dispatch = useDispatch();
    const getPasswords = async () => {
        const data = await axios.get(APT_URL)
        // const json = await data.json()
        dispatch(setPasswordItems(data.data))
    }

    useEffect(() => {
        getPasswords()
    }, [])
}

export default useGetData
