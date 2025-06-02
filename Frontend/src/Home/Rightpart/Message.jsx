import React from 'react'

function Message({message}) {
    // console.log(message)
    const authUser = JSON.parse(localStorage.getItem("ChatApp"));
    // console.log(authUser.user._id)
    const isMe = message.senderId===authUser.user._id;
    const chatName = isMe ? "justify-end" : "justify-items-start";
    const roundBorder = isMe ? "rounded-xl rounded-tr-none" : "rounded-e-xl rounded-es-xl";

    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })
    return (
    <div>
        <div className={`flex ${chatName} gap-2.5 p-2`}>
            <div className={`flex flex-col max-w-[320px] leading-1.5 px-4 py-1 border-gray-200 bg-gray-100 dark:bg-gray-700 ${roundBorder}`}>
                <p className="text-sm font-normal py-1 text-gray-900 dark:text-white">{message.message}</p>
                <div className="flex items-center justify-end space-x-2">
                    <span className="text-[0.5em] font-normal text-gray-500 dark:text-gray-400">{formattedTime}</span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Message