import { faker } from "@faker-js/faker";
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { EmailAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PasswordInput from "../../../component/form/PasswordInput";
import { checkExistUser, login, register } from "../../../service/userService";
import { useAppDispatch } from "../../hook/reduxHook";
// import { AuthContext } from "../../context/AuthProvider";
import { useSnackbar } from "notistack";
import { userSlice } from "../../redux/authSlice";
import { LoginContainer } from "./Login.styled";


function Login() {

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/"></Navigate>
    }
    const dispatch = useAppDispatch();

    const { enqueueSnackbar } = useSnackbar();
    const auth = getAuth();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState({ email: false, password: false });


    const emailCheck = (e: BaseSyntheticEvent) => {
        const emailRGEX = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        setError({ ...error, email: !emailRGEX.test(e.target.value) })
        console.table(error)
    }
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {

            const {
                user: { uid, displayName, email, }
            } = await signInWithPopup(auth, provider);

            if (!email) {
                enqueueSnackbar("Fail to login with google", { variant: "error" })
                return;
            }

            const check = await checkExistUser({ email })

            // navigate("/");
            if (!check.data) {
                const res = await register({ uid, email, username: `gUser${faker.random.words(1)}${faker.random.numeric()}`, password: "123456" })
                if (res.status === 200) {
                    enqueueSnackbar("Login success", { variant: "success" })
                    dispatch(userSlice.actions.setUsername(res.data.username))
                }
            }
            //@ts-ignore
            const res = await login({ email, password: "123456" })

            if (res.status === 200) {
                enqueueSnackbar("Login success", { variant: "success" })
                dispatch(userSlice.actions.setUsername(res.data.username))
                // navigate("/");
            }
        }
        catch (err) {
            console.error(err)
            enqueueSnackbar("Fail to login with google", { variant: "error" })
        }
    }

    const handleLogin = async (e: BaseSyntheticEvent) => {
        try {

            const provider = new EmailAuthProvider();
            e.preventDefault();

            // @ts-ignore: 
            const account = { email: emailRef?.current.value || "", password: passwordRef?.current.value || "" };
            console.table(account);

            signInWithEmailAndPassword(auth, account.email, account.password).then(async (userCredential) => {
                const res = await login(account);
                if (res.status === 200) {
                    enqueueSnackbar("Login success", { variant: "success" })
                }
                dispatch(userSlice.actions.setUsername(res.data.username))


            }, (error) => {
                if (error.code === "auth/wrong-password")
                    setError({ ...error, password: true });
                else
                    throw (error)

            })
        }
        catch (err) {
            console.error(err)
            enqueueSnackbar("Fail to login", { variant: "error" })
        }
    }


    return (

        <LoginContainer onSubmit={handleLogin}>
            <Typography variant="h4">Login</Typography>
            <FormControl sx={{ padding: "0 1rem", width: 1, margin: "1rem 0" }}>
                <InputLabel htmlFor="email" >Email</InputLabel>
                <Input inputRef={emailRef} onChange={emailCheck} data-invalid={error.email} />
                <FormHelperText error hidden={!error.email} id="email-helper-text">Please type a valid email</FormHelperText>
            </FormControl>
            <FormControl sx={{ padding: "0 1rem", width: 1, margin: "1rem 0" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <PasswordInput inputRef={passwordRef} />
                <FormHelperText error hidden={!error.password} id="password-helper-text">Email or password is uncorrect</FormHelperText>
            </FormControl>
            {/* <Button type="" */}
            <Button disabled={error.email} type="submit">Login</Button>
            <Link to="/register">Create account</Link>
            <Typography>Login with 3rd party</Typography>
            <Button onClick={handleLoginWithGoogle}><i className="fa-brands fa-google"></i></Button>
        </LoginContainer>
    )
}

export default Login