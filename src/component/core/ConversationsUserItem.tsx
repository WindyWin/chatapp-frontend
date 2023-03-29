import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { user } from '../../modules/types'

const UserItemStyle = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    gap:10px;
    padding:10px;
    cursor:pointer;
    &:hover{
        background-color: #f0f0f0;
    }
    width:100%;
`
function ConversationsUserItem({ admin = false, user }: { admin?: boolean, user: user }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openOptionMenu = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setAnchorEl(null);
    }
    const handleClick = () => {
    }
    return (
        <UserItemStyle onClick={handleClick} className="user-item" >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Avatar src={user.avatar} ></Avatar>
                <div className="item-info">
                    <div className="item-info__username">{user.username}</div>
                </div>
            </Box>
            {
                admin &&
                <>
                    <IconButton onClick={handleOpen}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </IconButton>
                    <Menu id="conversation-option__menu"
                        anchorEl={anchorEl}
                        open={openOptionMenu}
                        onClose={handleClose}>
                        <MenuItem >
                            <Typography>Set As Admin</Typography>
                        </MenuItem>
                        <MenuItem  >
                            <Typography color="red">Kick</Typography>
                        </MenuItem>
                    </Menu>
                </>
            }
        </UserItemStyle>
    )
}

export default ConversationsUserItem