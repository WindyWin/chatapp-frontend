export const fileToDataUri = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target?.result)
    };
    reader.readAsDataURL(file);
})