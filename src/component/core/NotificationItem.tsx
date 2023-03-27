//@ts-nocheck
import { Avatar, Box, Button, Typography } from "@mui/material"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import socket from "../../config/socket"
import { useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser } from "../../modules/redux/authSlice"
import { notification } from "../../modules/types"
import { notifacationImage } from "../../modules/utils"


const NotificationItemStyled = styled.div`
    display:flex;
    gap:10px;
    padding:8px;
    border-radius:5px;
    background: ${props => props.isRead ? "white" : "#dce5ff"};
    color: ${props => props.isRead ? 'black' : '#333'};
    font-weight: ${props => props.isRead ? "400" : "500"};
    `

function NotificationItem({ notification }: { notification: notification }) {
    const image = notifacationImage(notification.type, notification?.sender?.avatar)
    const navigate = useNavigate();
    const user = useAppSelector(selectUser)
    const handleClick = () => {
        if (notification.redirect) {
            navigate(notification.redirect)
        }
    }
    const actionAddFriendRequest = (action: string) => (event: any) => {
        event.stopPropagation();
        const sender = {
            uid: user.uid,
            avatar: user.avatar,
            username: user.username
        }
        socket.emit("action-friend-request", { sender, receiverUid: notification.sender, action, notification: notification._id })

    }
    return (
        <NotificationItemStyled isRead={notification.isRead} onClick={handleClick}>
            <Avatar src={image}></Avatar>
            <Box>
                <div dangerouslySetInnerHTML={{ __html: notification.content }}></div>
                {notification.type === "friend request" &&
                    <Box sx={{ margin: "5px", display: "flex", gap: "10px" }}>
                        <Button onClick={actionAddFriendRequest("accept")} variant="outlined" color="primary">Accept</Button>
                        <Button onClick={actionAddFriendRequest("reject")} color="error">Reject</Button>
                    </Box>}
                <Typography variant="caption">{moment(notification.modifiedAt).fromNow()}</Typography>
            </Box>
        </NotificationItemStyled>
    )
}

export default NotificationItem