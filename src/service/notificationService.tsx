import axios from "axios";

export const getNotifications = ({ uid, page, limit = 10 }: { uid: string, page: number, limit: number }) => {
    try {

        return axios.get(`notifications?uid=${uid}&page=${page}&limit=${limit}`)
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getUnreadNotifications = ({ uid, page, limit = 10 }: { uid: string, page: number, limit?: number }) => {
    try {
        return axios.get(`notifications/unRead?uid=${uid}&page=${page}&limit=${limit}`)
    } catch (err) {
        console.error(err)
        throw err
    }
}
export const readAllNotifications = ({ uid }: { uid: string }) => {
    try {
        return axios.put(`notifications/readAll`, { uid })
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const readNotifaication = ({ notificationId }: { uid: string, notificationId: string }) => {
    try {
        return axios.put(`notifications/read`, { notificationId })
    } catch (err) {
        console.error(err)
        throw err
    }
}
