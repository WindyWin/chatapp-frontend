import { Avatar, Badge, Box, Button, CircularProgress, List, ListItem, Menu, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../../../config/socket";
import { useAppDispatch, useAppSelector } from "../../../modules/hook/reduxHook";
import useDebounce from "../../../modules/hook/useDebounce";
import { userSlice } from "../../../modules/redux/authSlice";
import { readAllNotificationsAction, selectNotifications, setNotificationLoading, setNotifications } from "../../../modules/redux/notificationSlice";
import { user } from "../../../modules/types";
import { getNotifications, readAllNotifications } from "../../../service/notificationService";
import { searchUser } from "../../../service/userService";
import NotificationItem from "../../core/NotificationItem";
import ThemeToggle from "../../core/ThemeToggle";
import UserSearchItem from "../../core/UserItem";
import { HeaderContainer } from "./HeaderStyles";

function Header() {
  const user = useAppSelector(state => state.user.value)
  const notification = useAppSelector(selectNotifications)
  const theme = useTheme();
  const dispatch = useAppDispatch()
  const auth = getAuth()
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<user[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState({ search: true })
  const openSettingMenu = Boolean(anchorEl?.id === "btn-setting");
  const openNofiMenu = Boolean(anchorEl?.id === "btn-nofi")
  const openSearchMenu = Boolean(anchorEl?.id === "input__search-user");
  const [notificationPage, setNotificationPage] = useState(1)

  const debounced = useDebounce(searchValue, 700)

  useEffect(() => {
    if (user?.uid) {
      dispatch(setNotificationLoading(true))

      getNotifications({ uid: user.uid, page: notificationPage, limit: 10 }).then(res => {
        console.log('res.data', res.data)
        dispatch(setNotifications(res.data))
        dispatch(setNotificationLoading(false))
      })
    }
  }, [user])


  useEffect(() => {
    if (debounced.trim() === '')
      setSearchResult([])
    else {
      setLoading({ search: true })

      searchUser(debounced).then(res => {
        setSearchResult(res.data)
        setLoading({ search: false })
      })
        .catch(err => {
          setLoading({ search: false })
          console.error(err)
        })
    }
  }, [debounced])

  const logoutHandler = () => {
    //@ts-ignore
    // user.auth.signOut()
    socket.emit("offline", { uid: user.uid })
    auth.signOut()
    dispatch(userSlice.actions.logOut)
  }




  const setAnchoEl = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReadAllNoti = () => {
    console.log("trigger mark all as read")
    readAllNotifications(user.uid).then(res => {
      console.log(res)
      readAllNotifications(user.uid).then(res => {
        dispatch(readAllNotificationsAction())
      })
    })
  }
  const SearchResultPopup = () => (
    <Box id="Search-menu"
      hidden={!openSearchMenu}
      onClick={handleClose}
    >
      <div className="overlay"></div>
      <List >
        {loading.search ? (
          <>
            <ListItem>
              <CircularProgress size={20} />
            </ListItem>
          </>)
          :
          <>
            {searchResult.length === 0 ? <ListItem ><Typography>No result match keyword</Typography></ListItem> :
              <>{
                searchResult.map((user, index) =>
                  <ListItem key={index} onClick={() => { navigate(`/profile/${user.uid}`) }}>
                    {/* <Link to={`/profile/${user.uid}`}> */}
                    <UserSearchItem
                      user={user}
                    />
                    {/* </Link> */}
                  </ListItem>
                )
              }
              </>
            }
          </>
        }
      </List>
    </Box>
  )

  return (
    <HeaderContainer theme={theme}>
      <div className="header__left">
        <Link to="/">
          Logo
        </Link>

      </div>
      <div className="header__mid"
      >
        <TextField
          id="input__search-user"
          onFocus={setAnchoEl}

          label="Search user"
          className="input__search-user"
          onChange={(e) => { setSearchValue(e.target.value) }}
          InputProps={{
            type: 'search',
            endAdornment: (
              <i className="fa-solid fa-magnifying-glass"></i>
            )
          }}
          size="small"
        // sx={{ p: '9px' }}
        />
        <SearchResultPopup />

      </div>
      <div className="header__right">
        <div className="btn-container" >


          <Button id="btn-nofi" onClick={setAnchoEl}>
            <Badge color="error" badgeContent={notification.count === 0 ? "" : notification.count}>
              <i className="fa-sharp fa-solid fa-bell"></i>
            </Badge>
          </Button>

        </div>
        <Menu id="Nofi-menu"
          anchorEl={anchorEl}
          open={openNofiMenu}
          onClose={handleClose}
          sx={{ maxHeight: "350px" }}
        >
          <Box sx={{ padding: "0 10px", display: "flex", justifyContent: "space-between" }}>
            <Button variant="text">
              <Link to="/notification">
                <Typography variant="caption">View all</Typography>
              </Link>
            </Button>
            <Button onClick={handleReadAllNoti} variant="text">
              <Typography onClick={() => { console.log("trigger mark all as read") }} variant="caption" sx={{ marginLeft: "auto" }}>Mark all as read</Typography>
            </Button>
          </Box>
          {
            // notification.isLoaded ?
            notification.value.map((noti, index) => (
              <MenuItem key={index}>
                <NotificationItem notification={noti}></NotificationItem>
              </MenuItem>
            ))
            // : <MenuItem><CircularProgress size={20} /></MenuItem>  
          }
          <MenuItem ><CircularProgress sx={{ margin: "0 auto" }} size={20} /></MenuItem>
        </Menu>
        <div className="btn-container">
          {/* @ts-ignore */}
          <Button id="btn-setting" onClick={setAnchoEl}><Avatar src={user?.avatar ?? ""} ></Avatar ></Button>
        </div>
        <Menu id="setting-menu"
          anchorEl={anchorEl}
          open={openSettingMenu}
          onClose={handleClose}>
          <MenuItem>
            <ThemeToggle />
          </MenuItem>
          <MenuItem><Link to="/profile">Profile</Link></MenuItem>
          <MenuItem onClick={logoutHandler}>
            <i style={{ marginRight: "1 rem" }} className="fa-solid fa-right-from-bracket"></i>
            <span >log out</span>
          </MenuItem>
        </Menu>
      </div>
    </HeaderContainer>
  );
}

export default Header
