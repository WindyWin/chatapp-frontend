import { faker } from "@faker-js/faker";
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { EmailAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../../../component/form/PasswordInput";
import { checkExistUser, login, register } from "../../../service/userService";
import { AuthContext } from "../../context/AuthProvider";
import { LoginContainer } from "./Login.styled";


function Login() {

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/"></Navigate>
    }


    const auth = getAuth();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
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

        const {
            user: { uid, displayName, email, }
        } = await signInWithPopup(auth, provider);

        checkExistUser({ email }).then((res) => {
            if (!res.data) {
                //@ts-expect-error
                register({ uid, email, password: "123456", username: `gUser${faker.internet.userName()}${faker.random.numeric(2)}` })
            }
        })
            .catch(
                (err) => {
                    console.error(err)
                }
            )
        // navigate("/");
    }
    const handleLogin = async (e: BaseSyntheticEvent) => {
        const provider = new EmailAuthProvider();
        e.preventDefault();

        // @ts-ignore: 
        const account = { email: emailRef?.current.value || "", password: passwordRef?.current.value || "" };
        console.table(account);




        signInWithEmailAndPassword(auth, account.email, account.password).then(async (userCredential) => {
            login({ ...account }).then((res) => {
                console.log(res);
                setUser({ res })
            });
            // navigate("/");
        }, (error) => {
            if (error.code === "auth/wrong-password")
                setError({ ...error, password: true });
            else
                throw (error)

        })
    }

    return (

        <LoginContainer onSubmit={handleLogin}>
            <Typography variant="h4">Login</Typography>
            <FormControl sx={{ padding: "0 1rem", width: 1, margin: "1rem 0" }}>
                <InputLabel htmlFor="email" >Email</InputLabel>
                <Input inputRef={emailRef} onChange={emailCheck} />
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