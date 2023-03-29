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
    value: [],
    count: 0,
    isLoaded: false,
    page: 1
}
export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<notification[]>) => {
            return { ...state, value: action.payload, count: action.payload.length }
        },
        setNotificationLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoaded: action.payload }
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
        },
        readAllNotificationsAction: (state) => {
            const notifications = state.value.map((notification) => {
                return { ...notification, isRead: true }
            })
            return { ...state, value: notifications, count: 0 }
        }
    }
})

export const { setNotifications, addNewNotification, setNotificationLoading, updateNotification, readAllNotificationsAction } = notificationSlice.actions
export const selectNotifications = (state: RootState) => state.notifications
export default notificationSlice.reducer