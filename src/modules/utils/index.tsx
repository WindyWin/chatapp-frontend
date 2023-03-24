export const fileToDataUri = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target?.result)
    };
    reader.readAsDataURL(file);
})

export const notifacationImage = (type: "friend request" | "friend request accepted" | "friend request rejected" | "message" | "conversation invite" | "conversation invite accepted" | "conversation invite rejected"): string => {
    switch (type) {
        case "friend request":
            return "https://img.icons8.com/external-sbts2018-solid-sbts2018/58/null/external-add-friend-social-media-sbts2018-solid-sbts2018-2.png";
        case "friend request accepted":
            return "https://img.icons8.com/fluency/48/null/checked.png";
        case "friend request rejected":
            return "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/null/external-rejected-approved-and-rejected-tanah-basah-glyph-tanah-basah-16.png";
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