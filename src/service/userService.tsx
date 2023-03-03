import axios from 'axios';

const register = ({ uid, email, username, password }:
    { uid: string, email: string, username: string, password: string }) => {
    return axios.post('/users/register', { uid, email, username, password });
}
const login = ({ email, password }: { email: string, password: string }) => {
    return axios.post('/users/login', { email, password });
}



export { register, login };
