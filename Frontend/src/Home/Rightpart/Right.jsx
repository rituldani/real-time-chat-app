import React, { useEffect } from 'react'
import Chatuser from './Chatuser.jsx'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation'

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation()
  useEffect(() => {
    return setSelectedConversation(null)
  }, [setSelectedConversation]);
  return (
    <div className="bg-zinc-600 w-[100%] text-white">
        {!selectedConversation ? (
            <NoChatSelected />
        )  :  (
        <>
          <Chatuser />
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(92vh - 8vh)" }}>
            <Messages />
          </div>
          <Typesend />
        </>
        )}
    </div>
  )
}
export default Right;

const NoChatSelected = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center item-center mx-auto">
        <h1 className='text-center'>Welcome</h1>
        <div>No chat selected, please  start conversation by selecting anyone to your contacts</div>
      </div>
    </>
  )
}