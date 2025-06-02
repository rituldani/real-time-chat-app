import React from 'react'
import useConversation from '../../zustand/useConversation.jsx'
import { useSocketContext } from '../../context/SocketContext.jsx';


function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const authUser = JSON.parse(localStorage.getItem("ChatApp"));
    // console.log(authUser)
    const {socket, onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    const getUserAvatarNumber = (input) => {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
          hash = input.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % 100; // Returns a number between 0-99
      };
      const number = getUserAvatarNumber(user.email); 
      const gender = "women"; // or "women" or randomize based on your data
      const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;

    return (
        <div 
        className={`${isSelected ? "bg-zinc-800" : ""}`} //hover:bg-zinc-700 hover:bg-zinc-800  duration-300 
        onClick={()=>setSelectedConversation(user)}
        >
            <div className="flex px-2 py-1 gap-2 items-center cursor-pointer">
                <div className="relative">
                    <img className="w-12 m-2 rounded-full" src={avatarUrl} alt="#" />
                    {
                        isOnline 
                        ? 
                        <span className="top-2 left-11 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        :
                        ""
                    }
                </div>
                <div className="flex items-start flex-col">
                    <h2 className="font-bold">{user.fullname}</h2>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>

    )
}

export default User