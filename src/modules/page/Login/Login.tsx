import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { EmailAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LoginContainer } from "./Login.styled";

function Login({ mode }: { mode: string }) {
    const auth = getAuth();
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState({ email: false, password: false });


    const emailCheck = (e: BaseSyntheticEvent) => {
        const emailRGEX = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        setError({ ...error, email: !emailRGEX.test(e.target.value) })
        console.table(error)
    }
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName }
        } = await signInWithPopup(auth, provider);
        console.table({ uid, displayName });
        navigate(".");
    }
    const handleLogin = async (e: BaseSyntheticEvent) => {
        const provider = new EmailAuthProvider();
        e.preventDefault();


        // const account = { email: emailRef?.current?.value || "", password: passwordRef?.current?.value || "" };
        // console.table(account);




        // signInWithEmailAndPassword(auth, email, password)

        // const { email, password } = e.target.elements;

        // signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        //     login({ email, password }).then((res) => {
        //         console.log(res);
        //         user.setUser({ res })
        //     });
        //     navigate(".");
        // }, (error) => {
        //     if (error.code === "auth/wrong-password")
        //         setWrongPassword(true);
        //     else
        //         throw (error)

    }

    return (

        <LoginContainer onSubmit={handleLogin}>
            <Typography variant="h4">{mode}</Typography>
            <FormControl sx={{ margin: "1rem 0" }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input inputRef={emailRef} onChange={emailCheck} />
                <FormHelperText error hidden={!error.email} id="email-helper-text">Please type a valid email</FormHelperText>
            </FormControl>
            <FormControl sx={{ margin: "1rem 0" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input inputRef={passwordRef} type="password" />
                <FormHelperText error hidden={!error.password} id="password-helper-text">Email or password is uncorrect</FormHelperText>
            </FormControl>
            {/* <Button type="" */}
            <Button disabled={error.email} type="submit">Login</Button>
            <Typography>Login with 3rd party</Typography>
            <Button onClick={handleLoginWithGoogle}><i className="fa-brands fa-google"></i></Button>
        </LoginContainer>
    )
}

export default Login