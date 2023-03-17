import { Avatar, Box, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import { useEffect } from "react"
import { subBgColor } from "../../modules/constain/color"
import { useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser } from "../../modules/redux/authSlice"
import { selectConversation } from "../../modules/redux/conversationSlice"
import { message } from "../../modules/types"
import StyledMessagesContainer from "./MessagesContainer.styled"
function MessagesContainer(
    { messages, loading }: { messages: message[], loading: boolean }
) {
    const curentUser = useAppSelector(selectUser)
    const length = messages.length;
    if (loading)
        return <div>Loading...</div>

    if (length === 0)
        return <Typography sx={{ padding: "10px" }}>No message</Typography>


    return (
        <StyledMessagesContainer>
            {messages.map((item, index) => {

                if (item.user.uid !== curentUser.uid)
                    return (
                        <Box sx={{ display: "flex", marginBottom: "10px" }} key={index} className="message-container">
                            <Tooltip title={item?.user.username} placement="top">
                                <Avatar src={item.user?.avatar}></Avatar>
                            </Tooltip>
                            <Tooltip title={moment(item.createdAt).format("LLL")} placement="top">
                                <Box sx={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: subBgColor, maxWidth: "50%", marginLeft: "5px", borderRadius: "5px" }}
                                ><Typography>{item.message}</Typography></Box>
                            </Tooltip>
                        </Box>
                    )
                else {
                    return (
                        <Box sx={{ display: "flex", marginBottom: "10px", justifyContent: "flex-end" }} key={index} className="message-container">
                            <Tooltip title={moment(item.createdAt).format("LLL")} placement="top">
                                <Box sx={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: subBgColor, maxWidth: "50%", marginLeft: "5px", borderRadius: "5px" }}
                                ><Typography>{item.message}</Typography></Box>
                            </Tooltip>
                        </Box>)
                }
            }).reverse()}
        </StyledMessagesContainer >
    )
}

export default MessagesContainer