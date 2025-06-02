import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../zustand/useConversation.jsx';
import sound from "../assets/Frontend_src_assets_notification.mp3"

function useGetSocketMessage() {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation(); 

    useEffect(()=>{
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessages([...messages, newMessage]);
        });
        return () => {
            socket.off("newMessage");
        }
    },[socket, messages, setMessages])
}

export default useGetSocketMessage;