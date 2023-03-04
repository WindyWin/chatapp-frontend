import { IconButton, Input, InputAdornment } from "@mui/material";
import { useState } from "react";


function PasswordInput(props: any) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Input {...props}
            type={showPassword ? "text" : "password"}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-sharp fa-solid fa-eye"></i>}
                    </IconButton>
                </InputAdornment>
            } />
    )

}

export default PasswordInput