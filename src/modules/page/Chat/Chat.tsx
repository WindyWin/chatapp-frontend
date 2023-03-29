import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import ConversationContainer from '../../../component/core/ConversationContainer'
import ConversationSideBox from '../../../component/core/ConversationSideBox'
import { headerHeight } from '../../../constain/itemSize'
function Chat() {
    const { conversationId } = useParams()
    return (
        <Grid container>
            <Grid item xs={9} sx={{ height: `calc(100vh - ${headerHeight}px)` }}>
                <ConversationContainer conversationId={conversationId} />
            </Grid>
            <Grid item xs={3}>
                <ConversationSideBox conversationId={conversationId} />
            </Grid>
        </Grid>
    )
}

export default Chat