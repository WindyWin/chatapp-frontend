import axios from 'axios';
const register = async ({ uid, email, username, password }:
    { uid: string, email: string, username: string, password: string }) => {
    return axios.post('/users/register', { uid, email, username, password });
}
const login = async ({ email, password }: { email: string, password: string }) => {
    return axios.post('/users/login', { email, password });
}
const searchUser = (keyword: string) => {
    return axios.get("users/search?keyword=" + keyword);
}
const checkExistUser = ({ email, username }: any) => {
    const query = !!email ? `email=${email}` : `username=${username}`;
    return axios.get(`users/checkExistUser?${query}`);
}
const getUserByUid = (uid: string) => {
    return axios.get(`users?uid=${uid}`)
}


export { register, login, searchUser, checkExistUser, getUserByUid };

