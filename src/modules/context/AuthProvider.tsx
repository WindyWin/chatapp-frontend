import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUid, searchUser } from '../../service/userService';
import { useAppDispatch, useAppSelector } from '../hook/reduxHook';
import { setUser, userSlice } from '../redux/authSlice';



export default function AuthProtecter({ children }: any) {
    const user = useAppSelector(state => state.user);
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

            console.log('reset');
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
        <div>
            {children}
        </div>
    );
}