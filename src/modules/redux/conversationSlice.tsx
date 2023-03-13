import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { conversation } from '../types'
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
            return { ...state, value: [...state.value, action.payload] }
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
        setLoading(state, action: PayloadAction<boolean>) {
            return { ...state, loading: action.payload }
        }
    }
})

export const { setConversations, addConversation, setLoading, updateConversation, removeConversation } = conversationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectConversation = (state: RootState) => state.user.value


export default conversationSlice.reducer