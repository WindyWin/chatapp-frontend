import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { conversation, message } from '../types'
import type { RootState } from './store'

// Define a type for the slice state
interface ConversationSlice {
    value: conversation[],
    loading: boolean
}

// Define the initial state using that type
const initialState: ConversationSlice = {
    value: [],
    loading: true
}

export const conversationSlice = createSlice({
    name: 'conversations',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<conversation[]>) => {
            return { ...state, value: action.payload }
        },
        addConversation: (state, action: PayloadAction<conversation>) => {
            return { ...state, value: [action.payload, ...state.value] }
        },
        updateConversation: (state, action: PayloadAction<conversation>) => {
            const conversations = state.value.map((conversation) => {
                if (conversation._id === action.payload._id) {
                    return action.payload
                }
                return conversation
            })
            return {
                ...state,
                value: conversations
            }
        },
        removeConversation: (state, action: PayloadAction<string>) => {
            const conversations = state.value.filter((conversation) => conversation._id !== action.payload)
            return {
                ...state,
                value: conversations
            }
        },
        addNewMessage: (state, action: PayloadAction<{ conversationId: string, message: message }>) => {
            const conversations = state.value.map((conversation) => {
                if (conversation._id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        messages: [action.payload.message, ...conversation.messages],
                        modifiedAt: action.payload.message.createdAt
                    }
                }
                return conversation
            })
            conversations.sort((a, b) => {
                if (a.modifiedAt && b.modifiedAt) {
                    return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
                }
                return 0
            })

            return {
                ...state,
                value: conversations
            }
        },
        initMessages: (state, action: PayloadAction<{ conversationId: string, messages: message[] }>) => {
            const conversations = state.value.map((conversation) => {
                if (conversation._id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        messages: action.payload.messages
                    }
                }
                return conversation
            })

            return {
                ...state,
                value: conversations
            }
        },
        addOldMessages: (state, action: PayloadAction<{ conversationId: string | undefined, messages: message[] }>) => {
            const conversations = state.value.map((conversation) => {
                if (conversation._id === action.payload.conversationId) {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, ...action.payload.messages,]
                    }
                }
                return conversation
            })
            return {
                ...state,
                value: conversations
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            return { ...state, loading: action.payload }
        }
    }
})

export const { setConversations, addConversation, setLoading, updateConversation, removeConversation, addNewMessage, addOldMessages, initMessages } = conversationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectConversation = (state: RootState) => state.conversations


export default conversationSlice.reducer