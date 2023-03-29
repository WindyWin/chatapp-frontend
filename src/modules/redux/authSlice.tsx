import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { user } from "../types"
import type { RootState } from './store'



// Define a type for the slice state
interface AuthSlice {
    value: any
}

// Define the initial state using that type
const initialState: AuthSlice = {
    value: {
        uid: null,
        username: "loading",
        email: "loading",
        avatar: undefined,
        friendList: [],
        status: "offline",
        blockList: [],
        oldUsername: [],
        friendRequest: []


    }
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            return { value: action.payload }
        },
        logOut: (state) => {
            return { value: null }
        },
        setUsername: (state, action: PayloadAction<string>) => {
            return { value: { ...state.value, username: action.payload } }
        },
        updateFriendStatus: (state, action: PayloadAction<{ uid: string, status: string }>) => {
            const { uid, status } = action.payload;
            const friendList = state.value.friendList.map((user: user): user => {
                return {
                    ...user,
                    status: user.uid === uid ? status : user.status
                }
            })
            const lastactive = new Date().toJSON()
            return { value: { ...state.value, friendList, lastactive } }
        }

    },
})

export const { setUser, logOut, setUsername, updateFriendStatus } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value


export default userSlice.reducer