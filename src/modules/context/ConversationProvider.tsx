import { createContext, Dispatch, useContext, useEffect, useReducer } from "react";
import { getConversation } from "../../service/conversationService";
import { conversation } from "../types";
import { AuthContext } from "./AuthProvider";


const INITIAL_CONVERSATION = {
    conversation: [],
    dispatchConversation: (() => { }) as Dispatch<any>,
}

//socket context and provider

const conversationReducer = (state: any, action: any) => {
    switch (action.type) {
        case "INITIALIZE_CONVERSATION":
            getConversation(action.uid).then((res) => {
                console.log(res.data);
                return [...res.data];
            }).catch((err) => {
                console.error(err);
            })
            break;
        case "CREATE_CONVERSATION":
            break;
        case "UPDATE_CONVERSATION":
            break;
        case "LEAVE_CONVERSATION":
            break;
        case "DELETE_CONVERSATION":
            break;
        case "SEND_MESSAGE":
            break;

        default:
            return state;

    }
}


export const ConversationContext = createContext(INITIAL_CONVERSATION);

export const ConversationProvider = ({ children }: any) => {
    const [conversation, dispatchConversation] = useReducer(conversationReducer, INITIAL_CONVERSATION);

    // useEffect(() => {
    //     //@ts-ignore
    //     dispatchConversation({ type: "INITIALIZE_CONVERSATION", uid: user.uid });
    // }, [])
    return (
        <ConversationContext.Provider value={{ conversation, dispatchConversation }}>
            {children}
        </ConversationContext.Provider>
    );
};


