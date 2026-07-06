import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import api from '../api/api'
import PostImage from '../assets/PostImage.png'
import { toast } from 'react-toastify'


const Profile = () => {
    const navigate = useNavigate()
    const { user } = useContext(authContext)
    const [posts, setPosts] = useState([])
    const notify = () => toast.success('Logged Out successfully !');


    useEffect(() => {
        async function fetchPosts() {
            const fetchPost = await api.patch(`api/posts/${user._id}`)

            setPosts(fetchPost.data.post)
        }
        fetchPosts()
    }, [])

    return (
        <>
            <div className='flex'>
                <div className='bg-(--text) h-fit w-fit p-6 mx-6 flex flex-col gap-6'>
                    <h1 className='text-6xl text-(--secondary)'>Profile </h1>

                    <div className='flex flex-col gap-4 text-2xl'>
                        <h3>Posts</h3>

                        <button className='bg-red-600 text-center py-2 text-(--text) rounded active:bg-red-900' onClick={async () => {
                            const logout = await api.delete(`api/auth/logout`)
                            navigate('/login')
                            notify()
                        }}>Logout</button>
                    </div>
                </div>

                <div>
                    <div className='flex gap-8 w-full h-fit flex-wrap justify-center'>
                        {posts.length === 0 ? <h1 className='text-5xl text-(--secondary)'>No Posts</h1> : (
                            posts.map((post) => {
                                const date = new Date(post.publishedAt).toLocaleString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })

                                const words = post.content.split(" ").slice(0, 15)

                                return (
                                    <div className=' flex items-center flex-col w-100 h-145 bg-(--text) p-6 gap-4 cursor-pointer' key={post._id}
                                        onClick={() => {
                                            const postId = post._id

                                            navigate(`/post/${postId}`)
                                        }}
                                    >
                                        <img src={PostImage} alt="Post Image" className='w-full object-cover' />

                                        <div className='flex flex-col justify-between h-full w-full'>
                                            <div className='flex flex-col gap-3'>
                                                <p className='text-(--primary) font-medium'>{date}</p>

                                                <div className='text-(--secondary) flex flex-col gap-1'>
                                                    <h3 className='text-(--secondary) font-bold text-xl'>{post.title}</h3>
                                                    <p className='text-lg font-medium leading-7'>{words.join(" ")} . . .</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <h3 className='text-(--primary) font-medium text-lg'>{post.user.username}</h3>

                                                <p className='px-4 bg-(--secondary) text-(--text) rounded text-lg'>Read Post</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile