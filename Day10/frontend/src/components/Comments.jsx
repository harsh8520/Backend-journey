import React, { useContext, useEffect, useState } from 'react'
import { FaArrowRight, FaRegEdit } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import api from '../api/api'
import { authContext } from '../context/AuthContext'

const Comments = ({ post, comments, isEditing, setIsEditing, updateComment, deleteComment }) => {
    const [editedComment, setEditedComment] = useState('')
    const { user } = useContext(authContext)

    if (comments.length === 0) return <h1 className='text-center mt-8 text-3xl'>No Comments</h1>
    return (
        <>
            {comments.map((comment) => {
                const date = new Date(comment?.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })

                const authComment = user._id === comment.createdBy._id

                return (
                    <div key={comment._id} className='comment border border-(--secondary) mt-8 p-5 text-(--secondary) h-fit'>
                        <div className='flex justify-between items-center text-2xl'>
                            <h3 className='text-(--primary) font-semibold'>{comment.createdBy.username} - <span className='text-(--bg)' >{date}</span></h3>
                            <div className="icons flex items-center gap-4 text-3xl">
                                {authComment && <>
                                    <FaRegEdit className='cursor-pointer' onClick={() => {
                                        setIsEditing(comment._id)
                                        setEditedComment(comment.content)
                                    }} />
                                    <IoCloseCircleOutline className='text-red-600 cursor-pointer' onClick={() => { deleteComment(comment._id) }} />
                                </>}

                            </div>
                        </div>

                        {isEditing === comment._id ?
                            <>
                                <div className='flex items-center relative'>
                                    <input type="text" placeholder='Type a comment' className=' rounded bg-(--bg) px-4 py-2 text-xl focus:outline-0 w-full'
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    />
                                    <button type="submit" className='py-2 bg-(--secondary) cursor-pointer w-12 h-full rounded grid place-items-center'>
                                        <FaArrowRight className='text-xl text-(--text)'
                                            onClick={() => {
                                                setIsEditing(null)
                                                updateComment(comment._id, editedComment)
                                                setEditedComment('')
                                            }}
                                        />
                                    </button>
                                    <IoCloseCircleOutline className='absolute right-15 text-red-600 cursor-pointer text-4xl' onClick={() => {
                                        setIsEditing(null)
                                        setEditedComment('')
                                    }} />
                                </div>
                            </>
                            :
                            <p className='text-xl mt-8'>{comment.content}</p>}
                    </div>)
            })}
        </>
    )
}

export default Comments