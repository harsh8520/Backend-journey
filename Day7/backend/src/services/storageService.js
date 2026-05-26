import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFiles(file) {
    console.log("Uploading...Please wait");
    try {
        const response = await client.files.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname,
            folder: '/moody_player'
        })

        console.log("Done Uploading");
        console.log(response);
        return response
    }
    catch (e) {
        console.log("Error - " + e);
    }
}

export default uploadFiles