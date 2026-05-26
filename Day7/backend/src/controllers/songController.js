import songModel from '../models/songModel.js'
import uploadFiles from '../services/storageService.js'

export const uploadSongs = async (req, res) => {
    try {
        const data = req.body
        const file = req.file
        if (!data && !file) return res.status(400).json({ messsage: "Content or file required" })

        const fileData = await uploadFiles(file);

        const song = await songModel.create({
            title: data.title,
            author: data.author,
            audio: fileData.url,
            mood: data.mood
        })

        return res.status(201).json({
            message: "Files uploaded Successfully",
            songs: song
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Upload failed"
        });
    }
}

export const getSongs = async (req, res) => {
    const { mood } = req.params
    const getSongsByMood = await songModel.find({
        mood: mood
    })
    console.log(getSongsByMood);
    if (getSongsByMood.length === 0) return res.status(404).json({ message: "Song Cannot be found" })

    return res.status(200).json({
        message: "Songs Fetched successfully",
        song: getSongsByMood
    })
}

