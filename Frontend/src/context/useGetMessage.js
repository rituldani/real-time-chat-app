import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation.jsx';
import axios from 'axios'

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessage = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            console.log("Token received", token);
            if (selectedConversation && selectedConversation._id && token) {
                try {
                    // console.log(selectedConversation._id)
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/get/${selectedConversation._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    // console.log(res)
                    console.log(res.data)
                    setMessages(res.data);
                    setLoading(false);
                    // console.log(messages)
                }
                catch (error) {
                    console.log("Error in getMessage", error);
                    setMessages([]);
                    setLoading(false);
                }
            }
        }
        getMessage();
    }, [selectedConversation, setMessages])

    useEffect(() => {
        if (Array.isArray(messages) && messages.length > 0) {
            // console.log("Updated messages:", messages);
        }
    }, [messages]);

    return { loading, messages };
}

export default useGetMessage;
