import React from 'react'
import { useParams } from 'react-router-dom'
import ConversationContainer from '../../../component/core/ConversationContainer'

function Chat() {
    const { conversationId } = useParams()
    return (
        <ConversationContainer conversationId={conversationId} />
    )
}

export default Chat