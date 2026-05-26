import React, { useState, useEffect } from 'react'
import Webcam from './components/Webcam'
import ShowMood from './components/ShowMood'
import RenderSongs from './components/RenderSongs'

const App = () => {
    const [mood, setMood] = useState('')
    const [songs, setSongs] = useState([])
    console.log(songs);
    return (
        <>
            <div className='p-6 flex flex-col gap-6'>
                <Webcam
                    setMood={setMood}
                    songs={songs} setSongs={setSongs}
                />

                <RenderSongs songs={songs} setSongs={setSongs} />
            </div>
        </>
    )
}

export default App