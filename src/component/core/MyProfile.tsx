import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useSnackbar } from "notistack"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../modules/hook/reduxHook"
import { selectUser, setUser } from "../../modules/redux/authSlice"
import { fileToDataUri } from "../../modules/utils"
import { getUserByUid, updateUserAvatar } from "../../service/userService"
import UpdatePassword from "../form/UpdatePassword"
import UpdateProfile from "../form/UpdateProfile"
import StatusDot from "../ui/StatusDot"
import MyProfileStyled from "./MyProfile.styled"
import Tab from "./Tab"
import UserSearchItem from "./UserSearchItem"



const tabsItem = [{
    name: "Update Profile",
    component: <UpdateProfile />
},
{
    name: "Update Password",
    component: <UpdatePassword />
}
]


function MyProfile({ uid }: { uid: string | undefined }) {
    const [user, setUser] = useState<any>(useAppSelector(selectUser))
    const [avatar, setAvatar] = useState<string>("")
    const [viewOverlay, setViewOverlay] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const handleAddFriend = () => {
        enqueueSnackbar("Add friend success", { variant: "success" })
        enqueueSnackbar("Add friend fail", { variant: "error" })
    }
    const handleBlock = () => {
        enqueueSnackbar("Block success", { variant: "success" })
        enqueueSnackbar("Block fail", { variant: "error" })
    }

    useEffect(() => {
        if (user) setAvatar(user.avatar)
        if (!!uid) {
            getUserByUid(uid).then(res => {
                if (res.status === 200) {
                    setUser(res.data)
                }

            })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [uid])

    useEffect(() => {
        if (user) setAvatar(user.avatar)
    }, [user])
    const handleCancelUpdateAvatar = () => {
        setViewOverlay(false)
        setAvatar(user?.avatar || "")
    }
    const handleUpdateAvatar = async () => {
        const result = await updateUserAvatar({ uid: user?.uid ?? "", avatar })
        if (result.status === 200) {
            enqueueSnackbar("Update avatar success", { variant: "success" })
            setViewOverlay(false)
            //@ts-ignore
            dispatch(setUser({ ...user, avatar: result.data.avatar }))
        }
        else {
            enqueueSnackbar("Update avatar fail", { variant: "error" })
        }

    }
    if (!user) return <div>loading</div>
    return (
        <MyProfileStyled>
            <Box className="profile-top">
                <form className="profile_avatar-container">
                    <Avatar src={user.avatar} sx={{ width: 1, height: 1 }}></Avatar>
                    {uid ||
                        <>
                            <label htmlFor="upload-avatar">
                                <Typography color="white" fontSize={14}>Change avatar</Typography>
                            </label>
                            <input hidden type="file" id="upload-avatar" accept='.jpg, .png, .jpeg' onChange={(e) => {
                                const file = e.currentTarget.files?.[0]
                                if (!file) return;
                                fileToDataUri(file)
                                    //@ts-ignore
                                    .then(uri => setAvatar(uri))
                                setViewOverlay(true)
                            }}
                            />
                            {/* <Box hidden={!viewOverlay} className="profile_avatar-overlay">
                        <Box className="main-content">
                            <Typography variant="h6">Change avatar</Typography>
                            
                        </Box>
                    </Box> */}
                            <Dialog open={viewOverlay}>
                                <DialogTitle>Change Avatar</DialogTitle>
                                <DialogContent>
                                    <Typography>Are you sure to use this avatar?</Typography>
                                    <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>

                                        <Avatar src={avatar} sx={{ margin: " 10px auto", width: "120px", height: "120px" }}></Avatar>
                                        <Box className="profile-info">
                                            <Typography variant="h6">{user.username}</Typography>
                                            <Box sx={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
                                                <StatusDot status={user.status} />
                                                <Typography variant="caption">{user.status}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCancelUpdateAvatar}>Cancel</Button>
                                    <Button onClick={handleUpdateAvatar}>Ok</Button>

                                </DialogActions>
                            </Dialog>
                        </>
                    }
                </form>
                <Box className="profile-info">
                    <Typography variant="h6">{user.username}</Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
                        <StatusDot status={user.status} />
                        <Typography variant="caption">{user.status}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="profile-body">

                {!uid ?
                    // case login user is viewing his own profile

                    <Tab tabItems={tabsItem} />
                    :
                    // case login user is viewing other user's profile or wanna see his own profile by orther user's view
                    <Box>
                        <Button onClick={handleAddFriend}>Add Friend</Button>
                        <Button onClick={handleBlock}>Block</Button>
                        <Box sx={{ margin: "10px 0 " }}>
                            <Typography >{`Create Date: ${moment(user.createdAt).format("DD/MM/YYYY")}`}</Typography>
                            <Typography >{`Last Active: ${moment(user.lastActive).fromNow()}`}</Typography>
                        </Box>
                        <Typography variant="h6">Old Username</Typography>
                        {/* i will update the tab later */}
                        <TableContainer>
                            <Table sx={{ width: "300" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>date remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.oldUsername.length === 0 && <Typography>Empty</Typography>}
                                    {user.oldUsername.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.username}
                                            </TableCell>
                                            <TableCell >{moment(row.timestamp).format("LLL")}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="h6">Friend List</Typography>
                        <List>
                            {user.friendList.length === 0 && <Typography>Empty</Typography>}
                            {user.friendList.map((friend: any, index: number) => (
                                <ListItem key={index}>
                                    <UserSearchItem user={friend} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>}
            </Box>
        </MyProfileStyled>
    )
}

export default MyProfile