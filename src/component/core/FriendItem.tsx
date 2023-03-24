import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { user } from '../../modules/types'
import StatusDot from '../ui/StatusDot'
const FriendItemStyle = styled.div`
    --avatar-size: 40px;
    display: flex;
    padding: 5px;
    gap: 10px;
    cursor: pointer;
    &:hover{
        background-color: #f5f5f5;
    }
    & .avatar-wrapper{
        position:relative;
        width:var(--avatar-size);
        height:var(--avatar-size);
        .status-dot{
            position:absolute;
            bottom:0;
            right:0;
            z-index:2;
            /* transform:translate(50%,50%); */
        }
    }
`

function FriendItem({ user }: { user: user }) {
    return (
        <FriendItemStyle >
            <Box className="avatar-wrapper">
                <Avatar sx={{ width: 1, height: 1 }} src={user.avatar}></Avatar>
                {/* @ts-ignore */}
                <StatusDot size={9} className="status-dot" status={user.status ?? "offline"}></StatusDot>
            </Box>
            <Box>
                <Typography >{user.username}</Typography>
                {user.status === "offline" &&
                    <Typography variant="caption">{`Last active ${moment(user.lastActive).fromNow()}`}</Typography>
                }
            </Box>
        </FriendItemStyle>
    )
}

export default FriendItem