import { Autocomplete, Avatar, Badge, Box, Button, CircularProgress, List, ListItem, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../../../config/socket";
import { useAppDispatch, useAppSelector } from "../../../modules/hook/reduxHook";
import useDebounce from "../../../modules/hook/useDebounce";
import { userSlice } from "../../../modules/redux/authSlice";
import { selectNotifications } from "../../../modules/redux/notificationSlice";
import { user } from "../../../modules/types";
import { searchUser } from "../../../service/userService";
import NotificationItem from "../../core/NotificationItem";
import UserSearchItem from "../../core/UserItem";
import { HeaderContainer } from "./HeaderStyles";

function Header() {
  const user = useAppSelector(state => state.user.value)
  const notification = useAppSelector(selectNotifications)
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

  const debounced = useDebounce(searchValue, 700)
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
    <HeaderContainer>
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
            <Badge badgeContent={notification.count === 0 ? "" : notification.count}>
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
          {
            notification.isLoaded ? notification.value.map((noti, index) => (
              <MenuItem key={index}>
                <NotificationItem notification={noti}></NotificationItem>
              </MenuItem>
            )) : <MenuItem><CircularProgress size={20} /></MenuItem>
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
          <MenuItem>Color theme</MenuItem>
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
