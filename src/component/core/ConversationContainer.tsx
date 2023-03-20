import { Avatar, Box, IconButton, Input, Typography } from '@mui/material';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import socket from '../../config/socket';
import { useAppDispatch, useAppSelector } from '../../modules/hook/reduxHook';
import { selectUser } from '../../modules/redux/authSlice';
import { addNewMessage, addOldMessages, initMessages, selectConversation } from '../../modules/redux/conversationSlice';
import { createMessage, getMessage } from '../../service/messageService';
import ChatFallback from '../ui/ChatFallback';
import StyledConveration from './ConversationContainer.Styled';
import MessagesContainer from './MessagesContainer';
const footerHeight = 60;
function Conversation({ conversationId }: { conversationId: string | undefined }) {
    const { enqueueSnackbar } = useSnackbar();
    const ref = useRef<Element>(null)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const conversations = useAppSelector(selectConversation)
    const [loading, setLoading] = useState(true)

    const conversation = conversations.value.find(conversation => conversation._id === conversationId)


    // const scrollToBottom = () => {
    //     if (ref.current instanceof HTMLElement) {
    //         ref.current.scroll(0, ref.current.scrollHeight);
    //     }
    // }


    useEffect(() => {

        if (!conversations.loading) {

            // console.table({ param: conversationId, conversation: conversation._id })

            //first time load the conversation 
            if (!conversation?.messageInit) {
                // console.log("message init")
                getMessage(conversationId, 1, 10, user.uid).then(
                    (res) => {
                        dispatch(initMessages({ conversationId: conversationId ?? "", messages: res.data }))
                        setLoading(false)
                        // scrollToBottom()
                    }
                )

            }
        }


    }, [conversations, conversationId])




    // useEffect(() => {
    //     if (!conversations.loading) {
    //         setConversation(conversations.value.find(conversation => conversation._id === conversationId))
    //     }

    // }, [conversations])


    if (conversations.loading)
        return <ChatFallback />
    // else
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            /* old ocde use axios
            const message = {
                message: (e.target as HTMLFormElement).content.value,
                conversation: conversationId,
                uid: user.uid
            }

            const res = await createMessage(message);
            dispatch(addNewMessage({ conversationId: conversationId ?? "", message: res.data }))
            */

            //new code use socket
            const message = {
                message: (e.target as HTMLFormElement).content.value,
                conversation: conversationId,
                uid: user.uid
            }
            socket.emit('send-message', message)


            //rest form
            // @ts-ignore
            e.target.reset()
            // scrollToBottom();
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleScrollToTop = async (e: any) => {
        //if scroll to top load more message data
        let top = e.currentTarget.offsetHeight - e.currentTarget.scrollHeight;
        if (e.currentTarget.scrollTop <= top) {

            console.log('scroll to top')
            const length = conversation?.messages?.length || 0;
            const maxMessage = conversation?.messageCount || 0;
            if (length < maxMessage && !loading) {
                let page = conversation?.page;
                setLoading(true)
                if (!page) {
                    return enqueueSnackbar("Something went wrong", { variant: "error" })
                }
                getMessage(conversationId, page + 1, 10, user.uid).then(
                    (res) => {
                        dispatch(addOldMessages({ conversationId: conversationId ?? "", messages: res.data }))
                        setLoading(false)
                    }
                )
            }

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
            <Box ref={ref} onWheel={handleScrollToTop}
                sx={{
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                    // @ts-ignore
                    height: `calc(100vh - ${Math.floor(ref.current?.getBoundingClientRect().y)}px - ${footerHeight}px)`
                }}
                className="conversation-body">
                <MessagesContainer maxMessagesLength={conversation?.messageCount ?? 0} messages={conversation?.messages || []} loading={loading}></MessagesContainer>
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