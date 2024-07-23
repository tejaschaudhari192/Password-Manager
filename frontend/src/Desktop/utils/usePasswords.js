import axios from 'axios';
import React, { useEffect, useState } from 'react'

const usePasswords = () => {
    const [passwords, setPasswords] = useState()

    useEffect(() => {
        getPasswords();
        console.log("effect rendered");
    }, []);

    async function getPasswords() {
        await axios.get('http://localhost:8080/')
            .then((response) => {

                setPasswords(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }



    return passwords;
}

export default usePasswords
