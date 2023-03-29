import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../config/socket';
import { getUserByUid, searchUser } from '../../service/userService';
import { useAppDispatch, useAppSelector } from '../hook/reduxHook';
import { setUser, updateFriendStatus, userSlice } from '../redux/authSlice';
import { addNewNotification } from '../redux/notificationSlice';


export default function AuthProtecter({ children }: any) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();


    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
            if (user?.uid) {
                const { uid, email, refreshToken } = user;
                getUserByUid(uid).then((res) => {
                    dispatch(setUser({ uid, email, refreshToken, ...res.data }));
                    socket.emit("online", { uid: user.uid })

                    socket.on("new-notification", (data) => {
                        dispatch(addNewNotification(data))
                        console.log("new notification")
                        console.table(data)
                    })
                })
                    .catch((err) => {
                        console.error(err);
                        throw (err)

                    })
                // console.log('[From AuthProvider]', user);
                //@ts-ignore
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    //@ts-ignore
                    localStorage.setItem('accessToken', user.accessToken);
                    console.log('reload');
                    window.location.reload();
                }
                return;
            }

            // reset user info

            dispatch(userSlice.actions.logOut)
            localStorage.clear();
            navigate('/login');
        });

        return () => {
            unsubcribed();

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <>
            {children}
        </>
    );
}