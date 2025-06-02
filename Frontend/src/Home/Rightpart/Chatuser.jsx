import React from 'react';
import useConversation from '../../zustand/useConversation.jsx';
import { useSocketContext } from '../../context/SocketContext.jsx';

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline"
  }
  const isOnline = onlineUsers.includes(selectedConversation._id);


  if (!selectedConversation) return null;

  const getUserAvatarNumber = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 100; // number between 0-99
  };

  const number = getUserAvatarNumber(selectedConversation.email);
  const gender = "women"; // or randomize based on user
  const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;

  return (
    <div className="flex items-center gap-4 bg-zinc-700 h-[8vh] px-4 py-2 border border-zinc-800 border-l-0">
      <div className="relative">
        <img
          className="w-10 h-10 rounded-full"
          src={avatarUrl}
          alt={selectedConversation.fullname}
        />
        {/* <span className="top-0 left-8 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}

        {
          isOnline
            ?
            <span className="top-0 left-8 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            :
            ""
        }
      </div>
      <div className="text-white">
        <h1 className="text-xl">{selectedConversation.fullname}</h1>
        <span className="text-[0.8em] flex items-start">{getOnlineUserStatus(selectedConversation._id)}</span>
      </div>
    </div>
  );
}

export default Chatuser;
