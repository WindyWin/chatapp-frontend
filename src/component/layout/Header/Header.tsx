import { Autocomplete, Button, Menu, MenuItem, TextField } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderContainer } from "./HeaderStyles";
const exampleNofitication = [
  {
    id: 1,
    title: "Notification 1",
    content: "Content 1",
    date: "2021-10-10",
  }

]



function Header() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSettingMenu = Boolean(anchorEl?.id === "btn-setting");
  const openNofiMenu = Boolean(anchorEl?.id === "btn-nofi")
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
        <Autocomplete freeSolo
          id="search-result"
          disableClearable

          // options={top100Films.map((option) => option.title)}
          options={[]}
          renderInput={(params) => (

            <TextField
              {...params}
              label="Search user"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                endAdornment: (
                  <i className="fa-solid fa-magnifying-glass"></i>
                )
              }}
              size="small"
            // sx={{ p: '9px' }}
            />
          )} />
      </div>
      <div className="header__right">
        <div className="btn-container">
          <Button id="btn-nofi" onClick={handleClick}><i className="fa-sharp fa-solid fa-bell"></i></Button>
        </div>
        <Menu id="Nofi-menu"
          anchorEl={anchorEl}
          open={openNofiMenu}
          onClose={handleClose}>
          <MenuItem>Nofi</MenuItem>
        </Menu>
        <div className="btn-container">
          <Button id="btn-setting" onClick={handleClick}><i className="fa-sharp fa-solid fa-gear"></i></Button>
        </div>
        <Menu id="setting-menu"
          anchorEl={anchorEl}
          open={openSettingMenu}
          onClose={handleClose}>
          <MenuItem>Color theme</MenuItem>
          <MenuItem><i className="fa-solid fa-right-from-bracket"></i><span >log out</span></MenuItem>
        </Menu>
      </div>
    </HeaderContainer>
  );
}

export default Header;
