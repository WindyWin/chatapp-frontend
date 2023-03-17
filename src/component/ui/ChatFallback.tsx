import { Box, IconButton, Input, Skeleton } from '@mui/material';
import { useRef } from 'react';
import styled from 'styled-components';
import { borderColor } from '../../modules/constain/color';
import MessageLoadingFallback from './MessageLoadingFallback';
const footerHeight = 60;
const StyledFallback = styled.div`
        position: relative;
 
    height: 100%;
    & .chat-header-fallback{
        padding: 8px;
        border-bottom: 1px solid ${borderColor};
    }

    & .conversation-footer{
        position:absolute;
        padding:10px;
        border-top: 1px solid ${borderColor};
        width:100%;
        bottom:0;
    }
    & .conversation-footer form{
        display: flex;
    }
`

function ChatFallback() {
    const ref = useRef<Element>(null)
    return (
        <StyledFallback>
            <Box sx={{
                display: "flex", padding: "8px", gap: "10px",
                borderBottom: `1px solid ${borderColor}`
            }} className="chat-header-fallback">
                <Skeleton variant="circular" sx={{ height: "45px", width: "45px" }}></Skeleton>
                <Box sx={{ width: "150px" }}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: "1.1rem" }} ></Skeleton>
                    <Skeleton animation="wave" variant="text" sx={{ width: 0.8 }} ></Skeleton>
                </Box>
            </Box>
            <Box ref={ref} sx={{ padding: "10px" }}>
                <MessageLoadingFallback />
                <MessageLoadingFallback />
                <MessageLoadingFallback />
                <MessageLoadingFallback />
                <MessageLoadingFallback />

            </Box>

            <Box sx={{ height: footerHeight + "px" }} className="conversation-footer">
                <form onSubmit={(e) => { e.preventDefault }} >
                    <Box className="feature-container">
                        <IconButton><i className="fa-solid fa-paperclip"></i></IconButton>

                    </Box>
                    <Input name="content" sx={{ width: 0.8 }} placeholder='message' required />
                    <IconButton type="submit">
                        <i className="fa-regular fa-paper-plane"></i>
                    </IconButton>
                </form>
            </Box>
        </StyledFallback>
    )
}

export default ChatFallback