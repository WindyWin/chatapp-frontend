import { Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
const exampleNofitication = [
  {
    id: 1,
    title: "Notification 1",
    content: "Content 1",
    date: "2021-10-10",
  }

]



function Header() {

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">Logo</Link>

      </div>
      <div className="header__mid">
        <Autocomplete freeSolo
          id="free-solo-2-demo"
          disableClearable
          // options={top100Films.map((option) => option.title)}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )} />
      </div>
      <div className="header__right">
        <div className="btn-container"><i className="fa-sharp fa-solid fa-bell"></i></div>
        <div className="btn-container"><i className="fa-sharp fa-solid fa-gear"></i></div>
        <div className="btn-container"><i className="fa-solid fa-right-from-bracket"></i></div>
      </div>
    </header>
  );
}

export default Header;
