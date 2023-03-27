export const fileToDataUri = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target?.result)
    };
    reader.readAsDataURL(file);
})

export const notifacationImage =
    (type: "friend request" |
        "friend request accepted" |
        "friend request rejected" |
        "message" |
        "conversation invite" |
        "conversation invite accepted" |
        "conversation invite rejected",
        senderAvatar: string): string => {
        switch (type) {
            case "friend request":
                return senderAvatar;
            case "friend request accepted":
                return senderAvatar;
            case "friend request rejected":
                return senderAvatar;
            // case "conversation invite":
            //     return "";
            // case "conversation invite accepted":
            //     return;
            // case "conversation invite rejected":
            //     return;
            default:
                return "error";
        }
    }