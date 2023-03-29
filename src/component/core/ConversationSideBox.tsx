import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser } from "../../modules/redux/authSlice"
import { selectConversation } from "../../modules/redux/conversationSlice"
import UserItemLoadingFallback from "../ui/UserItemLoadingFallback"
import ConversationsUserItem from "./ConversationsUserItem"
import UserSearchItem from "./UserItem"

function ConversationSideBox({ conversationId }: { conversationId: string | undefined }) {
    const user = useAppSelector(selectUser)
    const conversations = useAppSelector(selectConversation)
    const conversation = conversations.value.find(conversation => conversation._id === conversationId)
    const [isConversationAdmin, setIsConversationAdmin] = useState<boolean>(false)
    useEffect(() => {
        // console.log(conversations.value.find(conversation => conversation._id === conversationId))
        if (!conversations.loading && conversation?.users) {
            setIsConversationAdmin(conversation.users.find((item) => item.uid === user.uid)?.isConversationadmin ?? false)
        }
    }, [conversations, conversationId])

    return (
        <Box sx={{ width: 1, padding: "10px 20px" }}>
            <Box sx={{ height: "80px" }} className="conversation-side-box__action">
                <Tooltip title="Invite">
                    <IconButton><i className="fa-solid fa-user-plus"></i></IconButton>
                </Tooltip>
                <Tooltip title="Leave">
                    <IconButton><i className="fa-solid fa-right-from-bracket"></i></IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton><i className="fa-solid fa-trash"></i></IconButton>
                </Tooltip>
            </Box>
            <Box className="conversation-side-box__user-list">
                <Typography variant="subtitle2" >
                    Conversation member
                </Typography>
                <Box>
                    {conversations.loading || !conversation ?
                        <>
                            <UserItemLoadingFallback />
                            <UserItemLoadingFallback />
                            <UserItemLoadingFallback />
                            <UserItemLoadingFallback />
                        </> :
                        <>
                            {
                                conversation?.users.map((user, index) => {
                                    return (
                                        <ConversationsUserItem key={index} admin={isConversationAdmin} user={user} />
                                    )
                                })
                            }</>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ConversationSideBox