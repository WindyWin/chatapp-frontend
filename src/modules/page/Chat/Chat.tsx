import React from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import ConversationContainer from '../../../component/core/ConversationContainer'
function Chat() {
    const { conversationId } = useParams()
    const socket = io("http://localhost:8080");
    socket.emit("join", { conversation: conversationId, uid: "1" });
    socket.on("message", (data) => {
        console.log("received message: ", data)
    })
    socket.emit("sendMessage", { conversation: conversationId, uid: "1", message: "hello" })
    return (
        <ConversationContainer conversationId={conversationId} />
    )
}

export default Chat