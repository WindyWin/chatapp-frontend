import { CircularProgress } from '@mui/material';
import { getAuth, User } from 'firebase/auth';
import { createContext, useEffect, useState, type Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from '../types';
const INITIAL_USER = {
    user: {},
    setUser: ((user: any) => { }) as Dispatch<any>,
};

export const AuthContext = createContext(INITIAL_USER);

export default function AuthProvider({ children }: any) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
            console.log('[From AuthProvider]', { user });
            if (user?.uid) {
                setUser(
                    {
                        ...user
                    });
                //@ts-ignore 
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                return;
            }

            // reset user info

            console.log('reset');
            setUser({});
            localStorage.clear();
            navigate('/login');
        });

        return () => {
            unsubcribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}