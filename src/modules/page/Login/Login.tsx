import { Button, Input, Typography } from "@mui/material";
import { EmailAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BaseSyntheticEvent, useContext } from "react";
import { FormContainer } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { LoginContainer } from "./Login.styled";
function Login({ mode }: { mode: string }) {
    const auth = getAuth();
    const user = useContext(AuthContext);
    const navigate = useNavigate();


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

        // signInWithEmailAndPassword(auth, email, password)

    }

    return (

        <LoginContainer >
            <FormContainer handleSubmit={handleLogin}>
                <Typography variant="h4">{mode}</Typography>
                <Input name="email" placeholder="Email" required />

                {mode === "register" &&
                    (<Input placeholder="username"></Input>

                    )
                }

                <Input name="password" placeholder="Password" required />
                {mode === "register" &&
                    (<Input placeholder="Confirm password"></Input>
                    )
                }


                <Button type="submit" onClick={handleLogin}>{mode}</Button>
                <Typography>Đăng nhập với bên thứ 3</Typography>
                <Button onClick={handleLoginWithGoogle}><i className="fa-brands fa-google"></i></Button>
            </FormContainer>
        </LoginContainer>
    )
}

export default Login