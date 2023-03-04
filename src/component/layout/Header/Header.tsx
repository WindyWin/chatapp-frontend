import { Autocomplete, Avatar, Box, Button, CircularProgress, List, ListItem, Menu, MenuItem, TextField } from "@mui/material";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../modules/context/AuthProvider";
import useDebounce from "../../../modules/hook/useDebounce";
import { user } from "../../../modules/types";
import { searchUser } from "../../../service/userService";
import UserSearchItem from "../../core/UserSearchItem";
import { HeaderContainer } from "./HeaderStyles";



function Header() {
  const { user, setUser } = useContext(AuthContext);
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
    user.auth.signOut()
  }


  const setAnchoEl = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <HeaderContainer>
      <div className="header__left">
        <Link to="/">
          Logo
        </Link>

      </div>
      <div className="header__mid">
        <TextField
          id="input__search-user"
          onFocus={setAnchoEl}
          onBlur={handleClose}
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
        <Box id="Search-menu"
          hidden={!openSearchMenu}
        >
          <List>
            {loading.search ? (
              <>
                <ListItem>
                  <CircularProgress size={20} />
                </ListItem>
              </>)
              :
              <>{searchResult.map((user, index) => <ListItem key={index}><UserSearchItem user={user} /></ListItem>)}</>
            }
          </List>
        </Box>
      </div>
      <div className="header__right">
        <div className="btn-container" >
          <Button id="btn-nofi" onClick={setAnchoEl}><i className="fa-sharp fa-solid fa-bell"></i></Button>
        </div>
        <Menu id="Nofi-menu"
          anchorEl={anchorEl}
          open={openNofiMenu}
          onClose={handleClose}>
          <MenuItem>Nofi</MenuItem>
        </Menu>
        <div className="btn-container">
          {/* @ts-ignore */}
          <Button id="btn-setting" onClick={setAnchoEl}><Avatar src={user.avatar} ></Avatar></Button>
        </div>
        <Menu id="setting-menu"
          anchorEl={anchorEl}
          open={openSettingMenu}
          onClose={handleClose}>
          <MenuItem>Color theme</MenuItem>
          <MenuItem onClick={logoutHandler}><i style={{ marginRight: "1 rem" }} className="fa-solid fa-right-from-bracket"></i><span >log out</span></MenuItem>
        </Menu>
      </div>
    </HeaderContainer>
  );
}

export default Header;
