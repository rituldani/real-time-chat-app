import React, { useEffect, useState } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookie.get("jwt");
                // console.log("Token from cookies:", token);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/allUsers`, {
                    withCredentials: true, // ✅ correct
                    headers: {
                        Authorization: `Bearer ${token}` // ✅ send token in headers
                    }
                });
                setAllUsers(response.data);
            } catch(error){
                console.error("Error in getAllUsers:", error);
                setAllUsers([]); // Add this            
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return [allUsers, loading];
}

export default useGetAllUsers;
