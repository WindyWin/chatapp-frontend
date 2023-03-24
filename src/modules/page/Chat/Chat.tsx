import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import ConversationContainer from '../../../component/core/ConversationContainer'
import { headerHeight } from '../../../constain/itemSize'
function Chat() {
    const { conversationId } = useParams()
    return (
        <Grid >
            <Grid item xs={9} sx={{ height: `calc(100vh - ${headerHeight}px)` }}>
                <ConversationContainer conversationId={conversationId} />
            </Grid>
            <Grid item xs={3}>

            </Grid>
        </Grid>
    )
}

export default Chat