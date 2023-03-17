import { Box, Skeleton } from '@mui/material'
import { subBgColor } from '../../modules/constain/color'

function MessageLoadingFallback() {
    const side = Math.floor(Math.random() * 2) === 0
    return (
        <Box sx={{ display: "flex", marginBottom: "10px", justifyContent: side ? "flex-start" : "flex-end" }} >
            {side && (<Skeleton variant="circular" sx={{ height: "40px", width: "40px" }}></Skeleton>)}
            <Box sx={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: subBgColor, width: `${Math.floor(Math.random() * 100) + 100}px`, marginLeft: "5px", borderRadius: "5px" }}>
                <Skeleton sx={{ width: 1 }} animation="wave" variant="text"  ></Skeleton>
            </Box>
        </Box>
    )
}


export default MessageLoadingFallback