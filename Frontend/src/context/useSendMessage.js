import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation.jsx';
import axios from 'axios'

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        // console.log(token)
        // console.log(messages)
        // console.log(message)
        try {
            console.log(selectedConversation._id)
            const res = await axios.post(`http://localhost:3000/message/send/${selectedConversation._id}`,
                {message},
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log(res)
            console.log(res.data)
            setMessages([...messages, res.data.newMessage]);
            setLoading(false);
            // console.log(messages)
        }
        catch (error) {
            console.log("Error in sendMessage", error);
            setLoading(false);
        }
    }
    return { loading, sendMessage };
}

export default useSendMessage