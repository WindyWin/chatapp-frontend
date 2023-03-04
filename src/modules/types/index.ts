export interface user {
    uid: String | null;
    avatar: string | undefined;
    username: String | null;
    email: String | undefined | null;
    password: String | undefined | null;
    status: String | undefined | null;
    lastActive: Date | undefined | null;
    // refreshToken: String | undefined | null;
    friendList: user[];
    blockList: user[]
}

export interface message {
    _id: String;
    username: String;
    createTime: Date;
    modifiedTime: Date;
    message: String;
    conversation: String;
}
export interface conversation {
    _id: String;
    users: user[];
    name: String;
    image: String;
    createTime: Date;
    modifiedTime: Date;
}

