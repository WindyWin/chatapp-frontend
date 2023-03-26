import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import moment from "moment"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import socket from "../../config/socket"
import { borderColor, subBgColor } from "../../constain/color"
import { useAppDispatch, useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser } from "../../modules/redux/authSlice"
import { addNewMessage, removeConversation } from "../../modules/redux/conversationSlice"
import { conversation, message } from "../../modules/types"
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
    const [open, setOpen] = useState({ leave: false, remove: false })
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)
    const openOptionMenu = Boolean(anchorEl);
    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseDialog = () => {
        setOpen({ leave: false, remove: false })
    }



    useEffect(() => {

        socket.emit("join-conversation", { uid: user.uid, conversation: conversation._id })


        return () => {
            socket.emit("leave-conversation", { uid: user.uid, conversation: conversation._id })
        }
    }, [])

    // @ts-ignore
    const lastMessage = conversation?.messages[0]?.message || "No message"
    // console.log(lastMessage)
    const handleLeaveConversation = () => {
        //@ts-ignore
        dispatch(removeConversation(conversation._id))// conversation loading from api always have _id
        enqueueSnackbar("You have left the conversation", { variant: "success" })
        setOpen({ leave: false, remove: false })
    }
    const handleRemoveConversation = () => {
        //@ts-ignore
        dispatch(removeConversation(conversation._id)) // conversation loading from api always have _id
        enqueueSnackbar("You have remove the conversation", { variant: "success" })
        setOpen({ leave: false, remove: false })
    }

    return (
        // <Link to={`/conversation/${conversation._id}`}>
        <StyledConveration   >
            {/* @ts-ignore */}
            <Avatar sx={{ marginRight: "1rem" }} src={conversation.image || ""}>{conversation.name[0]}</Avatar>
            <Box className="conversation-info" sx={{ width: 1, marginRight: "1rem" }}>
                <Typography sx={{ fontWeight: 500 }} className="conversation-info__name">{conversation.name}</Typography>
                <Box sx={{ display: "flex", width: 1, alignItems: "baseline", justifyContent: "space-between" }}>
                    {/* @ts-ignore */}
                    <Typography className="conversation-info__last-message" variant="caption">{lastMessage}</Typography>
                    <Typography className="conversation-info__last-message-time" variant="caption">{moment(conversation.modifiedAt).fromNow()}</Typography>
                </Box>
            </Box>
            <IconButton onClick={handleOpen} >
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </IconButton>
            <Menu id="conversation-option__menu"
                anchorEl={anchorEl}
                open={openOptionMenu}
                onClose={handleClose}>
                <MenuItem onClick={() => { setOpen({ leave: true, remove: false }) }}>Leave</MenuItem>
                <MenuItem onClick={() => { setOpen({ leave: false, remove: true }) }}>Remove</MenuItem>

            </Menu>
            <Dialog
                open={open.remove}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to delete this conversation?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you delete this conversation, you can't get it back
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleRemoveConversation} autoFocus>
                        I am sure
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open.leave}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Just wanna confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to leave this conversation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleLeaveConversation} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledConveration>
        // </Link>
    )
}

export default ConversationSectionItem