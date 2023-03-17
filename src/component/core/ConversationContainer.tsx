import { Avatar, Box, IconButton, Input, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../modules/hook/reduxHook';
import { selectUser } from '../../modules/redux/authSlice';
import { addNewMessage, initMessages, selectConversation } from '../../modules/redux/conversationSlice';
import { createMessage, getMessage } from '../../service/messageService';
import ChatFallback from '../ui/ChatFallback';
import StyledConveration from './ConversationContainer.Styled';
import MessagesContainer from './MessagesContainer';
const footerHeight = 60;
function Conversation({ conversationId }: { conversationId: string | undefined }) {
    const ref = useRef<Element>(null)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const conversations = useAppSelector(selectConversation)
    const [loading, setLoading] = useState(true)


    const [conversation, setConversation] = useState(conversations.value.find(conversation => conversation._id === conversationId))


    const scrollToBottom = () => {
        if (ref.current instanceof HTMLElement)
            ref.current.scroll(0, ref.current.scrollHeight);
    }

    useEffect(() => {
        scrollToBottom()
    }, [])
    useEffect(() => {

        if (!conversations.loading) {
            getMessage(conversationId, 1, 10, user.uid).then(
                (res) => {
                    dispatch(initMessages({ conversationId: conversationId ?? "", messages: res.data }))
                    setLoading(false)
                }
            )
            setConversation(conversations.value.find(conversation => conversation._id === conversationId))
        }


    }, [conversations.loading, conversationId])


    useEffect(() => {
        if (!conversations.loading) {
            setConversation(conversations.value.find(conversation => conversation._id === conversationId))
        }

    }, [conversations])


    if (conversations.loading)
        return <ChatFallback />
    // else
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const message = {
                message: (e.target as HTMLFormElement).content.value,
                conversation: conversationId,
                uid: user.uid
            }

            const res = await createMessage(message);
            dispatch(addNewMessage({ conversationId: conversationId ?? "", message: res.data }))
            // @ts-ignore
            e.target.reset()
            scrollToBottom();

        }
        catch (err) {
            console.error(err)
        }
    }

    const handleScrollToTop = async (e: { currentTarget: { scrollTop: number; }; }) => {
        //if scroll to top load more message data
        if (e.currentTarget.scrollTop === 0) {
            console.log('scroll to top')
        }
    }
    return (
        <StyledConveration>
            <Box sx={{ display: "flex", alignItems: "center" }} className="conversation-header">
                {/* @ts-ignore */}
                <Avatar sx={{ marginRight: "10px" }} src={conversation?.image ?? ""} />
                <Box>
                    <Typography >{conversation?.name}</Typography>
                    <Typography variant='caption'>{moment(conversation?.modifiedAt).fromNow()}</Typography>
                </Box>

            </Box>
            <Box ref={ref} onScroll={handleScrollToTop}
                // @ts-ignore
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