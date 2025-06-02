import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import useSendMessage from '../../context/useSendMessage.js'
import useConversation from '../../zustand/useConversation.jsx';

function Typesend() {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()
  const { selectedConversation } = useConversation();

  if (!selectedConversation) {
        return;
  }
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message)
    setMessage("")
  }
  
  return (
    <form onSubmit={HandleSubmit}>
      <div className="flex space-x-2 h-[8vh] text-center bg-zinc-700 text-white justify-between pr-4 border border-zinc-800 border-l-0">
        <div className="w-[95%] flex items-center px-4 py-1">
          <input
            type='text'
            placeholder='Type here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" w-full h-[70%] shadow-2xl outline-none m-2"
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  )
}

export default Typesend