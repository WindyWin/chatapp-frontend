import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FriendItem from './FriendItem'
const fakeData = [
    {
        _id: {
            $oid: "64009eee936dc99b64752d46"
        },
        uid: "1",
        username: "wibuLord",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/conversations%2Fc%E1%BB%A9u%20t%C3%B4i.Fishers11?alt=media&token=a88d2896-8852-495e-a331-1b9375bdf581",
        email: "ddno@gmail.com",
        password: "$2a$10$1SOdk4sbRQO8YXKfYMcUs.I2HcaZKM5mL33z3kTDHC4XpOM28b9Lq",
        isAdmin: false,
        status: "online",
        lastActive: {
            $date: "2023-03-02T13:04:46.271Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-02T13:04:46.282Z"
        },
        updatedAt: {
            $date: "2023-03-22T03:54:46.683Z"
        },
        __v: 0,
        oldUsername: [
            {
                timestamp: {
                    $date: "2023-03-22T03:52:52.839Z"
                },
                _id: {
                    $oid: "641a7b9460490a3091b59428"
                }
            },
            {
                timestamp: {
                    $date: "2023-03-22T03:53:29.243Z"
                },
                _id: {
                    $oid: "641a7bb90b2203ec1ce2979b"
                }
            },
            {
                username: "testuser",
                timestamp: {
                    $date: "2023-03-22T03:54:46.680Z"
                },
                _id: {
                    $oid: "641a7c06c80e7ba43547c654"
                }
            }
        ]
    },
    {
        _id: {
            $oid: "64030203a28b615c50307cc2"
        },
        uid: "FKNoLD73KdO5fxm8uko0UvAka2I2",
        username: "dangdinhdno",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/profile.png?alt=media&token=2cbe5a84-ea68-49dc-b14f-a2dd5b99cbd3",
        email: "dangdinhdno@gmail.com",
        password: "$2a$10$CseJD37SjyvbrrYnGvpoiOAWV9b97Nh.dwFP/Kj7UOVUDTDoFU8JO",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-04T08:32:03.766Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-04T08:32:03.783Z"
        },
        updatedAt: {
            $date: "2023-03-04T08:32:03.783Z"
        },
        __v: 0
    },
    {
        _id: {
            $oid: "64030c57a28b615c50307d46"
        },
        uid: "6ckHIOf12cSsa77ODKcWyk8psBb2",
        username: "windywind",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/profile.png?alt=media&token=2cbe5a84-ea68-49dc-b14f-a2dd5b99cbd3",
        email: "dangdinhdno1@gmail.com",
        password: "$2a$10$7DrixOHdzP91keIM0K0x/eDi1fep4NSQ2Po3H1Y1hgnGYDNWTtdvm",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-04T09:16:07.084Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-04T09:16:07.087Z"
        },
        updatedAt: {
            $date: "2023-03-04T09:16:07.087Z"
        },
        __v: 0
    },
    {
        _id: {
            $oid: "64030ecaa28b615c50307f53"
        },
        uid: "bjjnT0KeUsgh8Wq4kWm1RxAtvYu1",
        username: "WindyWind",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/profile.png?alt=media&token=2cbe5a84-ea68-49dc-b14f-a2dd5b99cbd3",
        email: "dangdinhdn@gmail.com",
        password: "$2a$10$lW.H0wIShTA3xAmpT0qN4.gHytg2RyCcTWQDFYbcsNjU.I6cU/LT6",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-04T09:26:34.904Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-04T09:26:34.905Z"
        },
        updatedAt: {
            $date: "2023-03-04T09:26:34.905Z"
        },
        __v: 0
    },
    {
        _id: {
            $oid: "64034b191c0e785e243d9f50"
        },
        uid: "Mfdz6uESZtaDulDA2Vlb0KYJB2w2",
        username: "rrrrrrrrr",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/avatar%2FMfdz6uESZtaDulDA2Vlb0KYJB2w2?alt=media&token=8ac68548-df3e-4124-8a9e-4ca512998cb0",
        email: "senshopdottech@gmail.com",
        password: "$2a$10$W3BkAbPyeiRbBEuxU9bEn.J4ZtDSATd9RPZbn7u/IxZqScqlEZ7t.",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-04T13:43:53.163Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-04T13:43:53.189Z"
        },
        updatedAt: {
            $date: "2023-03-23T04:54:48.804Z"
        },
        __v: 0,
        oldUsername: [
            {
                username: "gUserDiamond.MacGyver1973",
                timestamp: {
                    $date: "2023-03-22T09:33:44.838Z"
                },
                _id: {
                    $oid: "641acb78c80e7ba43547c6c0"
                }
            },
            {
                username: "WindyWind123",
                timestamp: {
                    $date: "2023-03-22T09:37:52.314Z"
                },
                _id: {
                    $oid: "641acc70c80e7ba43547c6ce"
                }
            },
            {
                username: "WindyWind123",
                timestamp: {
                    $date: "2023-03-22T09:38:19.680Z"
                },
                _id: {
                    $oid: "641acc8bc80e7ba43547c6d4"
                }
            },
            {
                username: "dinhnguyendang",
                timestamp: {
                    $date: "2023-03-23T04:54:48.802Z"
                },
                _id: {
                    $oid: "641bdb98f8ccc1d258e007bb"
                }
            }
        ]
    },
    {
        _id: {
            $oid: "64042007048906a7602f75db"
        },
        uid: "jFly6cQw55f3aC8IJU9JqAP0FFO2",
        username: "Darknhantam",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/avatar%2FjFly6cQw55f3aC8IJU9JqAP0FFO2?alt=media&token=836f621b-55fe-4cd6-9e09-d799c3ed669e",
        email: "dinhnd.work@gmail.com",
        password: "$2a$10$psRbnpKTHdcIIvko2XbhpuRDFj.kramKrHmFlC3j4PAFPZ3C7dpmC",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-05T04:52:23.953Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-05T04:52:23.989Z"
        },
        updatedAt: {
            $date: "2023-03-22T09:57:22.241Z"
        },
        __v: 0,
        oldUsername: [
            {
                username: "gUserLynn730",
                timestamp: {
                    $date: "2023-03-22T09:57:22.240Z"
                },
                _id: {
                    $oid: "641ad102c80e7ba43547c739"
                }
            }
        ]
    },
    {
        _id: {
            $oid: "640c399a760dddcb99fbdd14"
        },
        uid: "Y8wdymsKTwOQfYwttbW8o1LeDBE3",
        username: "testuser123",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/profile.png?alt=media&token=2cbe5a84-ea68-49dc-b14f-a2dd5b99cbd3",
        email: "windywind@gmell.com",
        password: "$2a$10$TJG3FTtG/UNE1b65yE7HlerNqJTvvC574xNdXul3kLog.oJ1xIBHK",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-11T08:19:38.622Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-11T08:19:38.625Z"
        },
        updatedAt: {
            $date: "2023-03-11T08:19:38.625Z"
        },
        __v: 0
    },
    {
        _id: {
            $oid: "6416e7130052f454c50fbc86"
        },
        uid: "o9HWv9tzZhh4Rg19uZnyXzyGY5E2",
        username: "testuser1",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/avatar%2Fo9HWv9tzZhh4Rg19uZnyXzyGY5E2?alt=media&token=e1a38c74-ebdf-41a1-b6ba-062859ffbc6b",
        email: "windywind@gmail.com",
        password: "$2a$10$xFgUVzG53gGNQKYXmZPSYOGyZMeyuzq/KV2xDlJ5N.mELfAJZf8dq",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-19T10:42:27.931Z"
        },
        friendList: [],
        blockList: [],
        createdAt: {
            $date: "2023-03-19T10:42:27.938Z"
        },
        updatedAt: {
            $date: "2023-03-22T09:58:52.060Z"
        },
        __v: 0,
        oldUsername: [
            {
                username: "testuser1",
                timestamp: {
                    $date: "2023-03-22T09:58:52.060Z"
                },
                _id: {
                    $oid: "641ad15cc80e7ba43547c760"
                }
            }
        ]
    },
    {
        _id: {
            $oid: "641c05c57f95c576c7192831"
        },
        uid: "system",
        username: "system",
        avatar: "https://firebasestorage.googleapis.com/v0/b/elegant-skein-350903.appspot.com/o/profile.png?alt=media&token=2cbe5a84-ea68-49dc-b14f-a2dd5b99cbd3",
        email: "system",
        password: "$2a$10$Cdb5G.alVdn5XCrp.IXkX.EDz9Pftn2eJLZm9i.Ur.FV/bs3KBzj6",
        isAdmin: false,
        status: "offline",
        lastActive: {
            $date: "2023-03-23T07:54:45.189Z"
        },
        friendList: [],
        blockList: [],
        oldUsername: [],
        createdAt: {
            $date: "2023-03-23T07:54:45.194Z"
        },
        updatedAt: {
            $date: "2023-03-23T07:54:45.194Z"
        },
        __v: 0
    }
]

const FriendBoxStyled = styled.div`
    position: fixed;
    width: 18.6666vw;
    bottom: 0;
    right:0;
`

function FriendBox() {
    const [expanded, setExpanded] = React.useState("");
    const handleChange = (panel: string) => () => {
        setExpanded(panel === expanded ? '' : panel);
    };
    const navigate = useNavigate()
    const handleFriendClick = (uid: string) => () => {
        navigate(`/profile/${uid}`)
    }
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
                        {`${fakeData.filter(item => item.status === "online").length} online/ ${fakeData.length}`}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: "400px", overflowY: "scroll" }}>
                    {
                        fakeData.sort((a, b) => b.status.localeCompare(a.status)).map((item, index) => {
                            return <Box onClick={handleFriendClick(item.uid)} key={index} sx={{ padding: "5px" }}>
                                {/* @ts-ignore */}
                                <FriendItem user={item} />
                                <Divider></Divider>
                            </Box>
                        })
                    }
                </AccordionDetails>
            </Accordion>
        </FriendBoxStyled>

    )
}

export default FriendBox