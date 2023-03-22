export interface user {
    uid?: String;
    avatar?: string;
    username?: String;
    email?: String;
    password?: String;
    status?: String;
    oldUsername?: [{ username: String, timestamp: Date }];
    lastActive?: Date;
    // refreshToken: String | undefined | null;
    friendList?: user[];
    blockList?: user[];
    isConversationadmin?: boolean;
}


export interface message {
    _id?: String;
    user?: user;
    createdAt?: Date;
    modifiedAt?: Date;
    message?: String;
    conversation?: String;
}
export interface conversation {
    _id?: String;
    users: user[];
    name: String;
    image: String;
    createdAt?: Date;
    modifiedAt?: Date;
    messageCount?: number;
    messages?: message[];
    page?: number;

    // àter the conversations are loaded, then message 
    messageInit?: boolean;
}

