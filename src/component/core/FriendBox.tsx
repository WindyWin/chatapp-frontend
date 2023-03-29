import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import socket from '../../config/socket'
import { useAppDispatch, useAppSelector } from '../../modules/hook/reduxHook'
import { selectUser, updateFriendStatus } from '../../modules/redux/authSlice'
import { user } from '../../modules/types'
import FriendItem from './FriendItem'

const FriendBoxStyled = styled.div`
    position: fixed;
    width: 18.6666vw;
    bottom: 0;
    right:0;
`

function FriendBox() {
    const [expanded, setExpanded] = React.useState("");
    const user = useAppSelector(selectUser)
    const friendList: user[] = user?.friendList;
    const dispatch = useAppDispatch()
    const handleChange = (panel: string) => () => {
        setExpanded(panel === expanded ? '' : panel);
    };
    const navigate = useNavigate()
    const handleFriendClick = (uid: string) => () => {
        navigate(`/profile/${uid}`)
    }
    useEffect(() => {

    }, [user])
    useEffect(() => {
        socket.on("friend-status", ({ uid, status }) => {
            console.log("friend status", { uid, status })
            dispatch(updateFriendStatus({ uid, status }))
        })
    })
    return (
        <FriendBoxStyled>
            <Accordion expanded={expanded !== ''} onChange={handleChange('Online')}>
                <AccordionSummary
                    expandIcon={<i className="fa-solid fa-chevron-down"></i>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Friend</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {`online ${friendList.filter(item => item.status === "online").length}/${friendList.length}`}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: "400px", overflowY: "scroll" }}>
                    {

                        friendList.sort((a, b) => b.status.localeCompare(a.status)).map((item, index) => {
                            return (
                                <Box onClick={handleFriendClick(item.uid)} key={index} sx={{ padding: "5px" }}>
                                    <FriendItem user={item} />
                                    <Divider></Divider>
                                </Box>
                            )
                        })

                    }
                    {
                        friendList.length === 0 && <Typography sx={{ color: "text.secondary" }}>go and get some fking friend</Typography>
                    }
                </AccordionDetails>
            </Accordion>
        </FriendBoxStyled>

    )
}

export default FriendBox