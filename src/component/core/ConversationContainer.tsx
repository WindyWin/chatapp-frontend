import styled from "@emotion/styled"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { borderColor, subBgColor, subColor } from "../../modules/constain/color"
import { headerHeight } from "../../modules/constain/itemSize"
import { AuthContext } from "../../modules/context/AuthProvider"
import { ConversationContext } from "../../modules/context/ConversationProvider"
import { conversation } from "../../modules/types"
import { getConversation } from "../../service/conversationService"
import CreateConversation from "../form/CreateConversation"
import ConversationSectionItem from "./ConversationSectionItem"



const ConversationContainerStyled = styled(Box)`
    height:100%;
    border-right: 1px solid ${borderColor};
`

function ConversationContainer() {
    const ref = useRef<Element>(null);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    // const { conversation, dispatchConversation } = useContext(ConversationContext);
    const [conversations, setConversations] = useState<conversation[]>([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // if (user) {
        //     dispatchConversation({ type: "INITIALIZE_CONVERSATION", uid: user.uid })
        //     console.log(conversation)
        //     setLoading(false)
        // }
        if (user)
            getConversation(user?.uid).then((res) => {
                setConversations(res.data)
                setLoading(false)
            })

    }, [user])

    return (<>
        <ConversationContainerStyled className="conversation-container" sx={{ height: 1, borderRight: `1px solid ${borderColor} ` }}>
            <Box sx={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${borderColor} ` }}>
                <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>Chat</Typography>

                <Tooltip onClick={() => { setShowCreateForm(true) }} title="New conversation">
                    <IconButton><i className="fa-solid fa-plus"></i></IconButton>
                </Tooltip>
            </Box>
            <Box ref={ref} sx={{
                overflowY: "scroll",
                // minHeight: "100%",
                // @ts-ignore
                height: `calc(100vh - ${Math.floor(ref.current?.getBoundingClientRect().y)}px)`
            }}>
                {loading ? <div>loading</div> : <>

                    {conversations.map((item, index) =>
                        <ConversationSectionItem
                            key={index} conversation={item}
                        />)}</>}
            </Box>
        </ConversationContainerStyled>
        <CreateConversation show={showCreateForm} setShow={() => { setShowCreateForm(false) }}></CreateConversation>
    </>
    )
}

export default ConversationContainer