import { Avatar, Box, Button, CircularProgress, IconButton, Input, InputLabel, List, ListItem, Typography } from '@mui/material'
import { useSnackbar } from "notistack"
import { SyntheticEvent, useEffect, useState } from 'react'
// import { AuthContext } from '../../modules/context/AuthProvider'
import useDebounce from '../../modules/hook/useDebounce'
import { selectUser } from '../../modules/redux/authSlice'
// import { user } from '../../modules/types'
import { useAppDispatch, useAppSelector } from '../../modules/hook/reduxHook'
import { addConversation } from '../../modules/redux/conversationSlice'
import { fileToDataUri } from '../../modules/utils'
import { createConversation } from '../../service/conversationService'
import { searchUser } from '../../service/userService'
import { FormContainer } from './CreateConversation.style'

interface user {
    uid?: String;
    avatar?: string;
    username?: String;
    email?: String;
    password?: String;
    status?: String;
    lastActive?: Date;
    // refreshToken: String | undefined | null;
    friendList?: user[];
    blockList?: user[];
    isConversationadmin?: boolean;
}

function CreateConversation({ show, setShow }: { show: boolean, setShow: () => void }) {
    // const { user, dispatchUser } = useContext(AuthContext);
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [image, setImage] = useState<string>("")
    const [users, setUsers] = useState<user[]>([])
    const [searchResult, setSearchResult] = useState<user[]>([])
    const [name, setName] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState<{ search: boolean }>({ search: false })
    const [showSearchResult, setShowSearchResult] = useState(false)
    const debounced = useDebounce(searchValue, 500);
    const { enqueueSnackbar } = useSnackbar();


    const handleAddUser = (userToAdd: user) => {
        //@ts-ignore
        if (userToAdd.uid === state.user.value.uid) return;
        if (users.some(u => u.uid === userToAdd.uid)) return;
        setUsers([...users, userToAdd])
        setSearchResult([])
        setSearchValue("")
    }


    useEffect(() => {
        if (debounced.trim() === '') {
            setSearchResult([])
            setShowSearchResult(false)
        }
        else {
            setLoading({ search: true })
            setShowSearchResult(true)
            searchUser(debounced)
                .then(res => {
                    setSearchResult(res.data)
                    setLoading({ search: false })
                })
                .catch(err => {
                    setLoading({ search: false })
                    console.error(err)

                })
        }
    }, [debounced])

    const removeHandler = (user: user) => {
        setUsers(users.filter(u => u.uid !== user.uid))
    }
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (users.length === 0) return;


        //@ts-ignore
        const currentUser = { uid: state.user.value.uid, isConversationAdmin: true }

        const conversation = {
            name,
            image,
            users: [...users.map((u): user => { return { uid: u.uid } }), currentUser],
        }
        console.log(conversation)
        const res = await createConversation(conversation)

        if (res.status === 201) {
            enqueueSnackbar("Create conversation successfully", { variant: "success" })
            setUsers([])
            setName("")
            setImage("")
            setShow()
            dispatch(addConversation({ ...res.data.conversation, messages: [] }))
        }
        else {
            enqueueSnackbar("Create conversation failed", { variant: "error" })
        }
    }

    return (
        // @ts-ignore
        <FormContainer show={show}>
            <div className="background" onClick={setShow}></div>
            <form onSubmit={handleSubmit}>
                <h2>Create conversation</h2>

                <Box sx={{ display: "flex", alignContent: "center", justifyContent: "space-between" }} className="upload-container">
                    <InputLabel className='upload-label' htmlFor="upload-conversation-image">Browse image...</InputLabel>
                    <input type="file" name="file" accept='.jpg, .png, .jpeg'
                        id="upload-conversation-image"
                        onChange={(e) => {
                            const file = e.currentTarget.files?.[0]
                            if (!file) return;
                            fileToDataUri(file)
                                //@ts-ignore
                                .then(uri => setImage(uri))
                        }}
                    />
                    <Box className="image-previewer">
                        <Avatar sx={{ width: "70px", height: "70px" }} src={image}></Avatar>
                    </Box>
                </Box>

                <Input required name="name" value={name} onChange={(e) => { setName(e.currentTarget.value) }} placeholder="Conversation name"></Input>
                <Box className="search-user">
                    <Input sx={{ width: 1 }} value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.currentTarget.value)
                        }}
                        placeholder="People to add" />
                    <Box hidden={!showSearchResult} >
                        <List className='search-user-result' >

                            {loading.search ? (
                                <>
                                    <ListItem>
                                        <CircularProgress size={20} />
                                    </ListItem>
                                </>) :
                                <>
                                    {searchResult.map((user, index) => (
                                        <ListItem key={index} >
                                            <Box className="user-search-item" onClick={() => {
                                                handleAddUser(user)
                                            }
                                            }
                                            >
                                                <Avatar src={user.avatar} ></Avatar>
                                                <div className="item-info">
                                                    <div className="item-info__username">{user.username}</div>
                                                    <div className="item-info__email">{user.email}</div>
                                                </div>
                                            </Box>
                                        </ListItem>))
                                    }
                                </>}
                        </List>
                    </Box>
                </Box>
                <List sx={{ maxHeight: "200px", overflowY: "scroll" }} >
                    {users.map((user, index) => (
                        <ListItem key={index} sx={{ display: "flex", width: 1, justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex" }}>
                                <Avatar sx={{ marginRight: "10px" }} src={user.avatar}></Avatar>
                                <Typography variant='subtitle1'>{user.username}</Typography>
                            </Box>
                            <IconButton onClick={() => removeHandler(user)}><i className="fa-solid fa-xmark"></i></IconButton>
                        </ListItem>
                    ))}
                </List>

                <Button type="submit">Create</Button>
            </form>
        </FormContainer >
    )
}

export default CreateConversation