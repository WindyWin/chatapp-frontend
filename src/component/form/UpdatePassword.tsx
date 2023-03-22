import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material'
import React, { useRef } from 'react'
import PasswordInput from './PasswordInput'

function UpdatePassword() {
    const oldPasswordRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    return (
        <form>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "0 10px" }}>

                <FormControl sx={{ margin: "1rem 0", width: "300px" }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <PasswordInput inputRef={oldPasswordRef} />
                    <FormHelperText error
                        // hidden={!error.password}
                        id="password-helper-text">
                        Password must contain at least 8 characters, including uppercase, lowercase, number and special character
                    </FormHelperText>
                </FormControl>

                <FormControl sx={{ margin: "1rem 0", width: "300px" }}>
                    <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
                    <PasswordInput name="confirm-password"
                        inputRef={passwordRef}
                    />
                    <FormHelperText error
                        // hidden={!error.confirmPassword}
                        id="confirm-password-helper-text">confirm password not match</FormHelperText>
                </FormControl>
                <FormControl sx={{ margin: "1rem 0", width: "300px" }}>
                    <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
                    <PasswordInput name="confirm-password"
                        inputRef={confirmPasswordRef}
                    />
                    <FormHelperText error
                        // hidden={!error.confirmPassword}
                        id="confirm-password-helper-text">confirm password not match</FormHelperText>
                </FormControl>
                <button type='submit'>Save</button>
            </Box>
        </form>
    )
}

export default UpdatePassword