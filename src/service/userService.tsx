import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
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
const updateUserAvatar = async ({ uid, avatar }: { uid: string, avatar: string }) => {
    const storage = getStorage();
    //random name for image
    const storageRef =
        ref(storage, `avatar/${uid}`);

    const snapsot = await uploadString(storageRef, `${avatar}`, 'data_url')
    const dowloadURL = await getDownloadURL(snapsot.ref);
    avatar = dowloadURL;
    return axios.put(`users/avatar`, { uid, avatar });
}
const updateUserUsername = ({ uid, oldUsername, username }: { uid: string, oldUsername: string, username: string }) => {
    return axios.put(`users/username`, { uid, oldUsername, username })
}

export { register, login, searchUser, checkExistUser, getUserByUid, updateUserAvatar, updateUserUsername };

