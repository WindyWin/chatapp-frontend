import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { borderColor, subBgColor } from "../../modules/constain/color"
import { conversation } from "../../modules/types"
const StyledConveration = styled.div`
    padding: 10px;
    display:flex;
    height:90px;
    align-items:center;
    cursor: pointer;
    width: 100%;
    margin-bottom: 1px;
    border-bottom: 1px solid ${borderColor};
    
    &:hover{
        background-color: ${subBgColor};
    }
`

function ConversationSectionItem({ conversation }: { conversation: conversation }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const openOptionMenu = Boolean(anchorEl);
    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        // <Link to={`/conversation/${conversation._id}`}>
        <StyledConveration   >
            {/* @ts-ignore */}
            <Avatar sx={{ marginRight: "1rem" }} src={conversation.image || ""}>{conversation.name[0]}</Avatar>
            <Box className="conversation-info" sx={{ width: 1, marginRight: "1rem" }}>
                <Typography sx={{ fontWeight: 500 }} className="conversation-info__name">{conversation.name}</Typography>
                <Box sx={{ display: "flex", width: 1, alignItems: "baseline", justifyContent: "space-between" }}>
                    <Typography className="conversation-info__last-message" variant="caption">last message</Typography>
                    <Typography className="conversation-info__last-message-time" variant="caption">{moment(conversation.modifiedTime).fromNow()}</Typography>
                </Box>
            </Box>
            <IconButton onClick={handleOpen} >
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </IconButton>
            <Menu id="conversation-option__menu"
                anchorEl={anchorEl}
                open={openOptionMenu}
                onClose={handleClose}>
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>

            </Menu>
        </StyledConveration>
        // </Link>
    )
}

export default ConversationSectionItem