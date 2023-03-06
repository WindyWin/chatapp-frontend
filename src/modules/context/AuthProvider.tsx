import { getAuth } from 'firebase/auth';
import { createContext, useEffect, useReducer, type Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/userService';
const INITIAL_USER = {
    user: null,
    dispatchUser: (() => { }) as Dispatch<any>,
};


const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            login({ email: action.email, password: action.password }).then((res) => {
                const username = res.data.username;
                return { ...state, username }
            }).catch((err) => {
                console.error(err);
            })
        case 'LOGOUT':

            return null;
        case 'SET_USERNAME':

            return { ...state, username: action.username }
        case "SET_USER":
            return { ...state, ...action.user }
        default:
            return state;
    }
};

export const AuthContext = createContext(INITIAL_USER);

export default function AuthProvider({ children }: any) {
    const [user, dispatchUser] = useReducer(userReducer, INITIAL_USER);
    const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
            console.log('[From AuthProvider]', { user });
            if (user?.uid) {
                dispatchUser({ type: "SET_USER", user: user });
                //@ts-ignore 
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    //@ts-ignore
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                return;
            }

            // reset user info

            console.log('reset');
            dispatchUser({ type: "SET_USER", user: null });
            localStorage.clear();
            navigate('/login');
        });

        return () => {
            unsubcribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, dispatchUser }}>
            {children}
        </AuthContext.Provider>
    );
}