import * as faceapi from 'face-api.js'
import { useEffect, useRef } from 'react'
import axios from 'axios'

const Webcam = ({ setMood, songs, setSongs }) => {
    const videoRef = useRef();
    useEffect(() => {

        const loadModels = async () => {
            const MODEL_URL = '/models';
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

            console.log("models loaded");
        };

        const startVideo = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                })
                .catch((err) => console.error("Error accessing webcam: ", err));
        };

        loadModels().then(startVideo);
    }, []);

    const getSongs = async (mood) => {
        setSongs([])
        const getsong = await (await axios.get(`http://localhost:3000/songs/${mood}`)).data
        const songdata = getsong.song[0]
        setSongs([...songs, songdata])
    }

    const getMood = async () => {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detections[0]?.expressions) {
            const expressions = detections[0].expressions

            const mood = Object.keys(expressions).reduce((a, b) =>
                expressions[a] > expressions[b] ? a : b
            )
            setMood(mood)
            getSongs(mood)
        }
    };



    return (
        <div className='flex items-center gap-6'>
            <video
                ref={videoRef}
                autoPlay
                muted
                style={{ width: '500px' }}
                className='rounded-xl -scale-x-100'
            />
            <button onClick={getMood} className='bg-(--accent) text-(--bg) text-2xl px-6 py-3 font-medium border border-(--bg-light) cursor-pointer hover:scale-[0.98] active:scale-[0.9] transition-all'
            >Click here</button>
        </div>
    )
}

export default Webcam