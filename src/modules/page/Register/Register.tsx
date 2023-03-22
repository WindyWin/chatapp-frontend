import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSnackbar } from "notistack";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PasswordInput from "../../../component/form/PasswordInput";
import { checkExistUser, register } from "../../../service/userService";
// import { AuthContext } from "../../context/AuthProvider";
import { faker } from "@faker-js/faker";
import LoginWithThirdParty from "../../../component/core/LoginWithThirdParty";
import { useAppDispatch } from "../../hook/reduxHook";
import useDebounce from "../../hook/useDebounce";
import { userSlice } from "../../redux/authSlice";
import { RegisterContainer } from "./RegisterStyle";



function Register() {
    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/"></Navigate>
    }

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const auth = getAuth();
    // const user = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");


    const debounced = useDebounce({ email, username }, 300);



    const [error, setError] = useState({ email: "", username: "", password: false, confirmPassword: false });
    const [existUser, setExistUser] = useState({ email: false, username: false });

    useEffect(() => {
        if (error.username === "")
            checkExistUser({ username: debounced.username }).then((res) => {
                const check: boolean = res.data;

                setError({ ...error, username: check ? `${username} already exist` : "" })
            })
        if (error.email == "")
            checkExistUser({ email: debounced.email }).then((res) => {
                const check: boolean = res.data;

                setError({ ...error, email: check ? `${email} already exist` : "" })
            })

    }, [debounced])

    const emailCheck = (e: BaseSyntheticEvent) => {
        setEmail(e.target.value)
        const emailRGEX = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        setError({ ...error, email: !emailRGEX.test(debounced.email) ? "Please type a valid email" : "" })
    }
    const usernameCheck = (e: BaseSyntheticEvent) => {
        setUsername(e.target.value)
        const usernameRGEX = new RegExp("^[A-Za-z0-9.]{6,}$");
        setError({ ...error, username: !usernameRGEX.test(username) ? "Username must contain at least 6 character and not contain special character" : "" })
    }
    const passwordCheck = (e: BaseSyntheticEvent) => {
        const passwordRGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        setError({ ...error, password: !passwordRGEX.test(e.target.value) })
    }
    const confirmPasswordCheck = (e: BaseSyntheticEvent) => {
        setError({ ...error, confirmPassword: e.target.value !== passwordRef.current?.value })
    }



    const handleRegister = async (e: BaseSyntheticEvent) => {
        // const provider = new EmailAuthProvider();
        e.preventDefault();


        const account = {
            email: emailRef.current?.value || "",
            username: usernameRef.current?.value || "",
            password: passwordRef.current?.value || "",

        };


        // console.table(account);
        createUserWithEmailAndPassword(auth, account.email, account.password).then((userCredential) => {
            register({
                ...account,
                uid: userCredential.user.uid,
            }).then((res) => {
                // console.log("register success")
                // console.log(res)
                enqueueSnackbar("register success!", { variant: 'success' });
            }).catch((err) => {
                throw (err);
            })
        })
            .catch((err) => {
                enqueueSnackbar("register fail!", { variant: 'error' });
                console.error(err)
            })


    }

    return (

        <RegisterContainer onSubmit={handleRegister}>
            <Typography variant="h4">Register</Typography>
            <FormControl sx={{ margin: "1rem 0", width: 1 }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input inputRef={emailRef} name="email" onChange={emailCheck} />
                <FormHelperText error hidden={error.email === ""} id="email-helper-text">{error.email}</FormHelperText>
            </FormControl>
            <FormControl sx={{ margin: "1rem 0", width: 1 }}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input inputRef={usernameRef} name="username" onChange={usernameCheck} />
                <FormHelperText error hidden={error.username === ""} id="email-helper-text">{error.username}</FormHelperText>
            </FormControl>
            <FormControl sx={{ margin: "1rem 0", width: 1 }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordInput onChange={passwordCheck} name="password" inputRef={passwordRef} />
                <FormHelperText error hidden={!error.password} id="password-helper-text">
                    Password must contain at least 8 characters, including uppercase, lowercase, number and special character
                </FormHelperText>
            </FormControl>

            <FormControl sx={{ margin: "1rem 0", width: 1 }}>
                <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
                <PasswordInput inputRef={confirmPasswordRef} name="confirm-password"
                    onChange={confirmPasswordCheck}
                />
                <FormHelperText error hidden={!error.confirmPassword} id="confirm-password-helper-text">confirm password not match</FormHelperText>
            </FormControl>
            {/* <Button type="" */}
            <Button
                disabled={
                    error.email !== "" || error.username !== "" || error.confirmPassword || error.password}
                type="submit">
                Register
            </Button>
            <Link to="/login">Already have account? Please sign in.</Link>
            <LoginWithThirdParty />
        </RegisterContainer>
    )
}

export default Register