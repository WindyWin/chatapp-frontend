import { faker } from "@faker-js/faker";
import { Box, Button, Typography } from "@mui/material";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../modules/hook/reduxHook";
import { userSlice } from "../../modules/redux/authSlice";
import { checkExistUser, register } from "../../service/userService";

function LoginWithThirdParty() {
    const auth = getAuth();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
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
            // const res = await login({ email, password: "123456" })

            // if (res.status === 200) {
            enqueueSnackbar("Login success", { variant: "success" })
            //     dispatch(userSlice.actions.setUsername(res.data.username))
            //     // navigate("/");
            // }
        }
        catch (err) {
            console.error(err)
            enqueueSnackbar("Fail to login with google", { variant: "error" })
        }
    }
    const handleLoginWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
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
            enqueueSnackbar("Fail to login with facebook", { variant: "error" })
        }
    }
    return (
        <>
            <Typography>Login with 3rd party</Typography>
            <Box>

                <Button onClick={handleLoginWithGoogle}><i className="fa-brands fa-google"></i></Button>
                <Button onClick={handleLoginWithFacebook}><i className="fa-brands fa-facebook"></i>
                </Button>
            </Box>
        </>
    )
}

export default LoginWithThirdParty