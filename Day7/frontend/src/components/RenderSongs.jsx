import React, { useState } from 'react'
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { useRef } from 'react';

const RenderSongs = ({ songs, setSongs }) => {
    const audioRef = useRef({})
    console.log(songs);

    console.log(audioRef);
    return (
        <div className='flex flex-col gap-6'>
            {songs.map((song, i) => {
                return (
                    <div key={i} className='flex w-fit gap-92.5 bg-(--bg-light) px-6 py-3 rounded-xl text-xl'>
                        <div>
                            <h3 className='text-2xl'>{song.title}</h3>
                            <p className='opacity-60'>{song.author}</p>
                        </div>

                        <audio ref={(el) => {
                            audioRef.current[song.title] = el
                        }} hidden src={song.audio} controls>Play</audio>

                        <button className='cursor-pointer' onClick={() => {
                            setSongs((prev =>
                                prev.map((s) => {
                                    if (song.title === s.title) {

                                        return { ...s, isPlaying: !s.isPlaying }
                                    }
                                    else {

                                        return { ...s }
                                    }
                                })
                            ))

                            if (song.isPlaying) {
                                audioRef.current[song.title].pause()
                            }
                            else {
                                audioRef.current[song.title].play()
                                audioRef.current[song.title].currentTime = 45
                                    
                            }
                        }}>
                            {song.isPlaying ? <CiPause1 className='fill-white' /> : <CiPlay1 className='fill-white' />}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default RenderSongs