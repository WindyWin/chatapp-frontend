import axios from "axios";
import { message } from "../modules/types";
const getMessage = async (conversationId: string | undefined, page: number, limit: number, userUid: string) => {
    try {
        return axios.get(`/messages?conversationID=${conversationId}&page=${page}&limit=${limit}`
            // ,
            // {
            //     params: {
            //         userUid: userUid
            //     }
            // }
        )
    }
    catch (err) {
        console.error(err)
        throw err
    }

}


const createMessage = async (message: message) => {
    try {
        return axios.post('/messages', message)
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export { getMessage, createMessage };

