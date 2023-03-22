import { Typography } from '@mui/material'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { borderColor, errorColor, focusColor, successColor } from '../../constain/color'
import { useAppDispatch, useAppSelector } from '../../modules/hook/reduxHook'
import useDebounce from '../../modules/hook/useDebounce'
import { selectUser, setUsername as setUsernameRedux } from '../../modules/redux/authSlice'
import { checkExistUser, updateUserUsername } from '../../service/userService'


const UpdateProfileStyled = styled.form`
    padding:20px;
    button[type="submit"]{
        padding:10px;
        background-color: #3f51b5;
        border:none;
        color:white;
        width:120px;
        cursor: pointer;
        &:hover{
            background-color: #303f9f;
        }
    }
`

const FormControl = styled.div`
        display:grid;
        grid-template-columns: 1fr 2fr;
        align-items:center;
        margin-bottom: 20px;
        input{
            padding:10px;
            border:1px solid ${borderColor};
            &:focus{
                outline: 1px solid ${focusColor}
            }
        }
        /* &:has(:placeholder-shown ) {

        } */
        &:has(:invalid )  {
            input{

                outline:1px solid ${errorColor};
            }
        }
        &:has(:valid )  {
            input{

                outline:1px solid ${successColor};
            }
        }
`

function UpdateProfile() {
    const user = useAppSelector(selectUser)
    const usernameRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState<string>("")
    const [viewHelper, setViewHelper] = useState<boolean>(true)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()



    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault()

        const data = { uid: user.uid, oldUsername: user.username, username: usernameRef.current?.value }
        const result = await updateUserUsername(data)
        if (result.status === 200) {
            dispatch(setUsernameRedux(result.data.username))
            return enqueueSnackbar("Update username successfully", { variant: "success" })
        }

        enqueueSnackbar("Update username fail", { variant: "error" })

    }
    const debounce = useDebounce(username, 500)

    useEffect(() => {
        //check the username field is valid and the username is not the same as the current username

        if (!!user && usernameRef.current?.checkValidity() && user.username !== username) {
            checkExistUser({ username: debounce }).then((res) => {
                const check: boolean = res.data;
                setViewHelper(!check)
                usernameRef?.current?.setCustomValidity(check ? "Username already exists" : "")
            })
        }
        else {
            setViewHelper(true)
        }
    }, [debounce])

    return (
        <UpdateProfileStyled onSubmit={handleSubmit} >
            <FormControl >
                <label htmlFor="input_update-username">
                    Username
                </label>
                <input ref={usernameRef} required type="text"
                    pattern="[A-Za-z0-9.]{6,}"
                    defaultValue={user.username ?? ""}
                    id="input_update-username"
                    onInvalid={(e) => {
                        e.currentTarget.setCustomValidity("Username must be 6-27 characters and only contain lowercase letters, numbers and dot")
                    }}

                    onChange={
                        (e) => {
                            e.currentTarget.setCustomValidity("")
                            setUsername(e.target.value)
                        }
                    }
                />
                <Typography variant="caption" color="error" hidden={viewHelper}>Username already exists</Typography>
            </FormControl>
            <FormControl >
                <label htmlFor="input_update-email">
                    Email
                </label>
                <input type="text" disabled defaultValue={user.email ?? ""} id="input_update-email"></input>
            </FormControl>
            <FormControl >
                <label htmlFor="input_update-created-date">
                    Created Date
                </label>
                <input type="text" disabled defaultValue={moment(user.createdAt ?? new Date).format("DD-MM-YYYY")} id="input_update-created-date"></input>
            </FormControl>
            <button type="submit">Save</button>
        </UpdateProfileStyled>
    )
}

export default UpdateProfile