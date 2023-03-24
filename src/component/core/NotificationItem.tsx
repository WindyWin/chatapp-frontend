import { Avatar, Box, Typography } from "@mui/material"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { mainBgColor, subBgColor } from "../../constain/color"
import { notification } from "../../modules/types"
import { notifacationImage } from "../../modules/utils"


const NotificationItemStyled = styled.div`
    display:flex;
    gap:10px;
    padding:8px;
    border-radius:5px;
    color: ${props => props.isRead ? 'black' : '#333'};
    font-weight: ${props => props.isRead ? "400" : "500"};
    `

function NotificationItem({ notification }: { notification: notification }) {
    const image = notifacationImage(notification.type)
    const navigate = useNavigate();
    const handleClick = () => {
        if (notification.redirect) {
            navigate(notification.redirect)
        }
    }
    return (
        <NotificationItemStyled isRead={notification.isRead} onClick={handleClick}>
            <Avatar src={image}></Avatar>
            <Box>
                <div dangerouslySetInnerHTML={{ __html: notification.content }}></div>
                <Typography variant="caption">{moment(notification.modifiedAt).fromNow()}</Typography>
            </Box>
        </NotificationItemStyled>
    )
}

export default NotificationItem