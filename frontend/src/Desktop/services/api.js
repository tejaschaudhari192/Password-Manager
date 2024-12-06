import axios from "axios";
import { API_URL } from "../../../config";
import useGetData from "../hooks/useGetData";

const API = axios.create({
    baseURL: API_URL,
});

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => {
    API.post("/auth/login", userData, { withCredentials: true })
}

export const getPasswords = (token) => {
    return API.get("/passwords", { headers: { Authorization: `Bearer ${token}` } })
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}
export const addPassword = async (passwordData, token) => {
    return API.post("/passwords", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
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
        console.log(result);
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
            params: { id }
        },
    ).then(result => {
        // console.log(result);
        return result
    }).catch((error) => {
        // console.log(error);
        return error
    })
}