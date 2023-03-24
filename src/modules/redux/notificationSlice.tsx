import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notification } from '../types'
import type { RootState } from './store'

interface NotificationSlice {
    value: notification[],
    count: number,
    isLoaded: boolean,
    page: number
}

const initialState: NotificationSlice = {
    value: [{
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: true,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }, {
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: false,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }, {
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: false,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }, {
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: false,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }, {
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: false,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }, {
        _id: "1",
        sender: "1",
        receiver: "current user",
        type: "friend request",
        content: "You have a new friend request",
        isRead: false,
        action: "accept",
        createdAt: new Date(),
        modifiedAt: new Date()
    }],
    count: 1,
    isLoaded: true,
    page: 1
}
export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<notification[]>) => {
            return { ...state, value: action.payload }
        },
        initNotifications: (state) => {
            return { ...state, isLoaded: true }
        },
        addNewNotification: (state, action: PayloadAction<notification>) => {
            return { ...state, value: [action.payload, ...state.value], count: state.count + 1 }
        },
        updateNotification: (state, action: PayloadAction<notification>) => {
            const notifications = state.value.map((notification) => {
                if (notification._id === action.payload._id) {
                    return action.payload
                }
                return notification
            })
            return { ...state, value: notifications }
        }
    }
})

export const { setNotifications } = notificationSlice.actions
export const selectNotifications = (state: RootState) => state.notifications
export default notificationSlice.reducer