import { Avatar, Box, CircularProgress, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import { memo, useMemo } from "react"
import { Link } from "react-router-dom"
import { subBgColor } from "../../constain/color"
import { useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser } from "../../modules/redux/authSlice"
import { message } from "../../modules/types"
import MessageLoadingFallback from "../ui/MessageLoadingFallback"
import StyledMessagesContainer from "./MessagesContainer.styled"
function MessagesContainer(
    { messages, loading, maxMessagesLength }: { messages: message[], loading: boolean, maxMessagesLength: number }
) {
    const curentUser = useAppSelector(selectUser)
    const length = messages.length;
    if (loading)
        return <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
            <MessageLoadingFallback />
        </Box>

    if (length === 0)
        return <Typography sx={{ padding: "10px" }}>No message</Typography>


    return (
        <StyledMessagesContainer>
            {length < maxMessagesLength ? <>
                <MessageLoadingFallback />
                <MessageLoadingFallback />
            </> : null
            }

            {messages.map((item, index) => {

                if (item.user?.uid !== curentUser.uid)
                    return (
                        // avatar + message on the left side if it is not current user
                        <Box sx={{ display: "flex", marginBottom: "10px" }} key={index} className="message-container">
                            <Tooltip title={item.user?.username} placement="top">
                                <Link to={`/profile/${item.user?.uid}`}><Avatar src={item.user?.avatar}></Avatar></Link>
                            </Tooltip>
                            <Tooltip title={moment(item.createdAt).format("LLL")} placement="top">
                                <Box sx={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: subBgColor, maxWidth: "50%", marginLeft: "5px", borderRadius: "5px" }}
                                ><Typography>{item.message}</Typography></Box>
                            </Tooltip>
                        </Box>
                    )
                else {
                    // message on the right side if it is current user
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

export default memo(MessagesContainer) 