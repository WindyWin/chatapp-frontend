import { faker } from "@faker-js/faker";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { conversation, user } from "../modules/types";
const createConversation = async (conversation: conversation) => {
    try {
        if (conversation.image) {
            const storage = getStorage();
            //random name for image
            const storageRef =
                ref(storage, `conversations/${conversation.name}.${faker.random.word()}${faker.datatype.number({ min: 1, max: 123 })}}`);

            const snapsot = await uploadString(storageRef, `${conversation.image}`, 'data_url')
            const dowloadURL = await getDownloadURL(snapsot.ref);
            conversation.image = dowloadURL;
            return axios.post('/conversations/create', conversation)
        }
        else {
            return axios.post('/conversations/create', conversation)
        }
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

const getConversation = async (uid: string) => {
    try {
        return axios.get(`/conversations?uid=${uid}`)
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export { createConversation, getConversation };

