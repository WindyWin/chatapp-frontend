import { Box, Skeleton } from '@mui/material'

function ChatHeaderLoadingFallback() {
    return (
        <Box sx={{ display: "flex", padding: "8px", gap: "10px" }} className="chat-header-fallback">
            <Skeleton variant='circular'></Skeleton>
            <Skeleton variant='text' width={100}></Skeleton>
        </Box>
    )
}

export default ChatHeaderLoadingFallback