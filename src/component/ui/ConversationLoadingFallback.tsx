import styled from "@emotion/styled"
import { Box, Skeleton } from "@mui/material"
import { borderColor } from "../../constain/color"

const BoxStyled = styled(Box)`
    display:flex;
    gap:10px;
    height:90px;
    align-items:center;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    margin-bottom: 1px;
    border-bottom: 1px solid ${borderColor};
`

function ConversationLoadingFallback() {
    return (
        <BoxStyled >
            <Skeleton variant="circular" sx={{ height: "40px", width: "40px" }}></Skeleton>
            <Box sx={{ width: 0.6 }}>
                <Skeleton animation="wave" variant="text" ></Skeleton>
                <Skeleton animation="wave" variant="text" ></Skeleton>
            </Box>
        </BoxStyled>
    )
}

export default ConversationLoadingFallback