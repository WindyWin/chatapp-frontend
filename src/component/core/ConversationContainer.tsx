import styled from "@emotion/styled"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { borderColor, subBgColor, subColor } from "../../modules/constain/color"
import { headerHeight } from "../../modules/constain/itemSize"
import { conversation } from "../../modules/types"
import ConversationSectionItem from "./ConversationSectionItem"


const exampleConverations: conversation[] = [

    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
    {
        _id: "2",
        users: [],
        name: "conversation 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        createTime: new Date,
        modifiedTime: new Date,
        // {
        //   _id:"1",
        //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
        //   username:"user1",
        // }
    },
]

const ConversationContainerStyled = styled(Box)`
    height:100%;
    border-right: 1px solid ${borderColor};

`

function ConversationContainer() {
    const ref = useRef<Element>(null);
    // const conversationListHeight = useRef<string>("600px");


    return (
        <ConversationContainerStyled className="conversation-container" sx={{ height: 1, borderRight: `1px solid ${borderColor} ` }}>
            <Box sx={{ padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${borderColor} ` }}>
                <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>Chat</Typography>

                <Tooltip title="New conversation">
                    <IconButton><i className="fa-solid fa-plus"></i></IconButton>
                </Tooltip>
            </Box>
            <Box ref={ref} sx={{
                overflowY: "scroll",
                // minHeight: "100%",
                // @ts-ignore
                height: `calc(100vh - ${Math.floor(ref.current?.getBoundingClientRect().y)}px)`
            }}>
                {exampleConverations.map((item, index) =>
                    <ConversationSectionItem
                        key={index} conversation={item}
                    />)}
            </Box>
        </ConversationContainerStyled>
    )
}

export default ConversationContainer