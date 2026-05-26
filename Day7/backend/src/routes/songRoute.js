import express from "express";
import multer from 'multer'
import {
    uploadSongs,
    getSongs
} from '../controllers/songController.js'

const router = express.Router();

const uploads = multer({
    storage: multer.memoryStorage()
});

router.post("/upload", uploads.single("audio"), uploadSongs);

router.get('/:mood', getSongs)

export default router;