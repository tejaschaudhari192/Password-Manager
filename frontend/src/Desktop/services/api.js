import axios from "axios";
import { API_URL } from "../../../config";
import useGetData from "../hooks/useGetData";

const API = axios.create({
    baseURL: API_URL,
});

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) =>
    API.post("/auth/login", userData)


export const getPasswords = async (token) => {
    try {
        const result = await API.get("/passwords", { headers: { Authorization: `Bearer ${token}` } });
        return result;
    } catch (error) {
        return error;
    }
}

export const getPassword = async (token, id) => {
    try {
        const result = await API.get("/password", { headers: { Authorization: `Bearer ${token}` }, params: { id: id } });
        return result;
    } catch (error) {
        return error;
    }
}

export const setFavorite = async (token, id, isFavorite) => {
    const passwordData = { isFavorite };
    try {
        const result = await API.post("/password", passwordData, { headers: { Authorization: `Bearer ${token}` }, params: { id: id } });
        return result;
    } catch (error) {
        return error;
    }
}

export const addPassword = async (passwordData, token, id) => {
    return API.post("/passwords", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: id }
    }).then(result => {
        return result
    }).catch((error) => {
        return error
    })
}

export const updatePassword = async (passwordData, token) => {
    return API.put("/passwords", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(result => {
        // console.log(result);
    }).catch((error) => {
        console.log(error);
    })
}

export const deletePassword = async (id, token) => {
    // console.log(token);

    return API.delete(
        `/passwords`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: id }
        },
    ).then(result => {
        // console.log(result);
        return result
    }).catch((error) => {
        // console.log(error);
        return error
    })
}
