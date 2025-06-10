import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from './AuthProvider.jsx'
import io from "socket.io-client";
const socketContext = createContext()

// it is a hook
export const useSocketContext=()=>{
     return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineusers] = useState([])
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser?.user?._id) {
            const socket = io("http://localhost:3000", {
                query: {
                    userId: authUser.user._id,
                },
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineusers(users);
            });
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
};