import { Avatar, Box, IconButton, Input, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagesContainer from '../../../component/core/MessagesContainer';
import ChatHeaderLoadingFallback from '../../../component/ui/ChatHeaderLoadingFallback';
import { getConversation } from '../../../service/conversationService';
import { createMessage, getMessage } from '../../../service/messageService';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { selectUser } from '../../redux/authSlice';
import { addNewMessage, initMessages, selectConversation } from '../../redux/conversationSlice';
import { message } from '../../types';
import StyledConveration from './Conversation.Styled';
const footerHeight = 60;
function Conversation() {
    const ref = useRef<Element>(null)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const conversations = useAppSelector(selectConversation)
    const [loading, setLoading] = useState(true)
    const param = useParams<{ conversationId: string }>()
    const [conversation, setConversation] = useState(conversations.value.find(conversation => conversation._id === param.conversationId))

    useEffect(() => {

        if (!conversations.loading) {
            getMessage(param.conversationId, 1, 10, user.uid).then(
                (res) => {
                    dispatch(initMessages({ conversationId: param.conversationId, messages: res.data }))
                    setLoading(false)
                }
            )
            setConversation(conversations.value.find(conversation => conversation._id === param.conversationId))
        }
        // if (!conversation && user) {
        //     getConversation(user.uid).then(
        //         (res) => {
        //             dispatch(setConversations(res.data))
        //             dispatch(setLoading(false))
        //         }
        //     )

        // }

    }, [conversations.loading, param])


    useEffect(() => {
        if (!conversations.loading) {
            setConversation(conversations.value.find(conversation => conversation._id === param.conversationId))
        }

    }, [conversations])
    useEffect(() => {
        if (!conversations.loading) {
            setConversation(conversations.value.find(conversation => conversation._id === param.conversationId))
        }


    }, [param])

    if (conversations.loading)
        return <ChatHeaderLoadingFallback />
    // else
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const message = {
                message: (e.target as HTMLFormElement).content.value,
                conversation: param.conversationId,
                uid: user.uid
            }

            const res = await createMessage(message);
            dispatch(addNewMessage({ conversationId: param.conversationId, message: res.data }))
            e.target.reset()

        }
        catch (err) {
            console.error(err)
        }


    }
    return (
        <StyledConveration>
            <Box sx={{ display: "flex", alignItems: "center" }} className="conversation-header">
                <Avatar sx={{ marginRight: "10px" }} src={conversation?.image} />
                <Box>
                    <Typography >{conversation?.name}</Typography>
                    <Typography variant='caption'>{moment(conversation?.modifiedAt).fromNow()}</Typography>
                </Box>

            </Box>
            <Box ref={ref}
                sx={{ overflowY: "scroll", height: `calc(100vh - ${Math.floor(ref.current?.getBoundingClientRect().y)}px - ${footerHeight}px)` }}
                className="conversation-body">
                <MessagesContainer messages={conversation?.messages || []} loading={loading}></MessagesContainer>
            </Box>
            <Box sx={{ height: footerHeight + "px" }} className="conversation-footer">
                <form onSubmit={handleSendMessage} >
                    <Box className="feature-container">
                        <IconButton><i className="fa-solid fa-paperclip"></i></IconButton>

                    </Box>
                    <Input name="content" sx={{ width: 0.8 }} placeholder='message' required />
                    <IconButton type="submit">
                        <i className="fa-regular fa-paper-plane"></i>
                    </IconButton>
                </form>
            </Box>
        </StyledConveration >
    )
}

export default Conversation