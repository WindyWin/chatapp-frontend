import styled from "@emotion/styled"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { borderColor } from "../../constain/color"
// import { AuthContext } from "../../modules/context/AuthProvider"
// import { ConversationContext } from "../../modules/context/ConversationProvider"
import { useAppDispatch, useAppSelector } from "../../modules/hook/reduxHook"
import conversationSlice, { setConversations, setLoading } from "../../modules/redux/conversationSlice"
import { getConversation } from "../../service/conversationService"
import CreateConversation from "../form/CreateConversation"
import ConversationLoadingFallback from "../ui/ConversationLoadingFallback"
// import CreateConversation from "../form/CreateConversation"
import socket from "../../config/socket"
import { selectUser } from "../../modules/redux/authSlice"
import { addNewMessage } from "../../modules/redux/conversationSlice"
import { message } from "../../modules/types"
import ConversationSectionItem from "./ConversationSectionItem"
const ConversationContainerStyled = styled(Box)`
    height:100%;
    border-right: 1px solid ${borderColor};
`

function ConversationsContainer() {
    const ref = useRef<Element>(null);
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const user = useAppSelector(selectUser)
    const conversations = useAppSelector(state => state.conversations)
    // const [conversations, setConversations] = useState<conversation[]>([]);
    // const { user } = useContext(AuthContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            getConversation(user.uid).then(
                (res) => {
                    console.log(res.data)
                    dispatch(setConversations(res.data))
                    dispatch(setLoading(false))

                }
            )

        }
    }, [user])
    useEffect(() => {
        socket.on("new-message", (data: message) => {
            console.log(data)

            // @ts-ignore
            dispatch(addNewMessage({ conversationId: data.conversation, message: data }))
        })
    }, [])
    return (
        <>
            <ConversationContainerStyled
                className="conversation-container"
                sx={{ height: 1, borderRight: `1px solid ${borderColor} ` }}>
                <Box sx={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${borderColor} ` }}>
                    <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>Chat</Typography>

                    <Tooltip onClick={() => { setShowCreateForm(true) }} title="New conversation">
                        <IconButton><i className="fa-solid fa-plus"></i></IconButton>
                    </Tooltip>
                </Box>
                <Box ref={ref} sx={{
                    overflowY: "scroll",
                    // minHeight: "100%",
                    // @ts-ignore
                    height: `calc(100vh - ${Math.floor(ref.current?.getBoundingClientRect().y)}px)`
                }}>
                    {
                        conversations.loading ? (
                            <>
                                <ConversationLoadingFallback />
                                <ConversationLoadingFallback />
                                <ConversationLoadingFallback />
                                <ConversationLoadingFallback />
                                <ConversationLoadingFallback />

                            </>
                        ) :
                            <>
                                {
                                    conversations.value.length === 0 ? (<Typography>Click on plus button to create conversation </Typography>) :
                                        <>
                                            {conversations.value.map((item, index) =>
                                                <Box key={index} onClick={() => { navigate(`chat/${item._id}`) }}>
                                                    <ConversationSectionItem
                                                        conversation={item}
                                                    />
                                                </Box>)}
                                        </>
                                }
                            </>
                    }
                </Box>
            </ConversationContainerStyled>
            <CreateConversation show={showCreateForm} setShow={() => { setShowCreateForm(false) }}></CreateConversation>
        </>
    )
}

export default ConversationsContainer