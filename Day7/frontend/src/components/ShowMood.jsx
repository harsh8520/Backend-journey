import React from 'react'

const ShowMood = ({ mood }) => {
    const currentMood = mood
    return (
        <div>
            <p>Current Mood - {currentMood}</p>
        </div>
    )
}

export default ShowMood