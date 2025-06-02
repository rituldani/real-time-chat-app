import React, { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx'
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx"
function Messages() {
    const { loading, messages } = useGetMessage();
    // console.log(messages);
    useGetSocketMessage();
    const lastMsgRef = useRef()
    useEffect(() => {
        if (lastMsgRef.current) {
            lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: "calc(92vh - 8vh)" }}>
            {messages?.length > 0 ? (
                messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                        <div key={msg._id} ref={isLast ? lastMsgRef : null}>
                            <Message message={msg} />
                        </div>
                    );
                })
            ) : (
                <p className="text-center pt-[20%] text-zinc-900">Say! Hi to start the conversation</p>
            )}

        </div>
    );
}

export default Messages;
