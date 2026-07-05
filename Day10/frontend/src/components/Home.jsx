import { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext'
import axios from 'axios';
import PostImage from '../assets/PostImage.png'
import api from '../api/api';
import { useNavigate } from 'react-router';

const Home = () => {
    const { user } = useContext(authContext)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPosts() {
            const fetchPost = await api.get(`api/posts/`)

            setPosts(fetchPost.data.posts)
        }
        fetchPosts()
    }, [])

    return (
        <div className='flex flex-col h-fit w-full items-center px-10 pb-8 gap-18'>
            <div className="title flex flex-col gap-4">
                <h1 className='Inter text-6xl text-center leading-18'>Discover <span className='Adlery-pro'>Ideas,</span> <br />
                    <span className='italic'>Stories</span> <span className='Outfit'>&</span> <span>Insights</span>
                </h1>

                <p className='text-(--primary) text-3xl tracking-tight font-medium text-center'>Read articles from developers, creators, and professionals around the world.</p>
            </div>

            <div className='flex gap-8 w-full h-fit flex-wrap justify-center'>
                {posts.map((post) => {
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
                })}
            </div>
        </div>
    )
}

export default Home

