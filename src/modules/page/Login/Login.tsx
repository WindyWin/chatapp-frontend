import { Button, Input, Typography } from "@mui/material";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { firebaseApp } from "../../../firebase";
import { AuthContext } from "../../context/AuthProvider";
import { LoginContainer } from "./Login.styled";
function Login({ mode }: { mode: string }) {
    const auth = getAuth(firebaseApp);
    const user = useContext(AuthContext);

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName }
        } = await signInWithPopup(auth, provider);
        console.table({ uid, displayName });
    }
    const handleLogin = async () => {
        // const provider = new A();

        // const {
        //     user: { uid, displayName }

        // } = await signInWithPopup(auth, provider);
    }

    return (

        <LoginContainer >

            <Typography variant="h4">{mode}</Typography>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button onClick={handleLogin}>Login</Button>
            <Typography>Đăng nhập với bên thứ 3</Typography>
            <Button onClick={handleLoginWithGoogle}><i className="fa-brands fa-google"></i></Button>

        </LoginContainer>
    )
}

export default Login