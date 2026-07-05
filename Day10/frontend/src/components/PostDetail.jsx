import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../api/api'
import { FaArrowRight, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Comments from './Comments';
import PostImage from '../assets/PostImage.png'
import { authContext } from '../context/AuthContext';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import EditPostForm from './EditPostForm';
import PostContent from './PostContent';


const PostDetail = () => {
    const params = useParams()
    const postId = params.id
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [isEditing, setIsEditing] = useState(null)
    const [isPostEditing, setIsPostEditing] = useState(false)
    const { user } = useContext(authContext)
    const [status, setStatus] = useState('draft')
    const navigate = useNavigate()

    const owner = user?._id === post?.user?._id
    const date = new Date(post?.publishedAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    useEffect(() => {
        getPost()
    }, [postId])

    async function getPost() {
        try {
            const post = await api.get(`api/posts/${postId}`)

            setPost(post.data.post)
            await getComments()
        }
        catch (e) {
            console.log("Error - " + e.response.data.message);
        }
        finally {
            setLoading(false)
        }
    }

    async function deletePost(postId) {
        try {
            await api.delete(`api/posts/${user._id}/${postId}`)
            navigate('/')
        } catch (e) {
            console.log("Error - " + e);
        }
    }

    async function getComments() {
        try {
            const fetchComments = await api.get(`api/comments/post/${postId}`)

            setComments(fetchComments.data.comments)
        } catch (e) {
            console.log("Error - " + e);
        }
    }

    const createComment = async (content) => {
        try {
            await api.post(`api/comments/post/${postId}`, { content })

            setComment('')
            await getComments()
        } catch (e) {
            console.log("Error - " + e);
        }
    }

    const updateComment = async (commentId, editedComment) => {
        try {
            await api.patch(`api/comments/${postId}/${commentId}`, { content: editedComment })
            await getComments()
        } catch (e) {
            console.log("Error - " + e);
        }

    }

    const deleteComment = async (commentId) => {
        try {
            await api.delete(`api/comments/${postId}/${commentId}`)
            await getComments()
        } catch (e) {
            console.log("Error - " + e);
        }

    }

    if (loading) return <h1>Loading</h1>

    if (!post) return <h1>Post not Found</h1>

    return (
        <>
            <div className='h-fit w-full flex flex-col justify-between'>
                <div className='md:px-40 px-12 pb-4 h-full w-full'>
                    <div className="post-title-container border-b-2 border-b-(--secondary) pb-4 px-4">
                        <p className='text-(--primary) font-medium pb-4 text-xl'>{date}</p>
                        <h1 className='text-(--secondary) font-medium text-5xl pb-2'>{post.title}</h1>
                        <p className='text-(--secondary) opacity-75'>{post.user.email}</p>
                    </div>

                    <div className='pt-6'>
                        <img src={PostImage} className='w-full object-cover' />
                    </div>

                    <div className="px-40 sm:px-12 py-6">
                        {isPostEditing ?
                            <EditPostForm status={status} setStatus={setStatus} getPost={getPost} postId={postId} setIsPostEditing={setIsPostEditing} post={post} />
                            :
                            <PostContent post={post} />
                        }

                    </div>
                    {owner && <>
                        <div className='flex gap-10 text-3xl'>
                            <FaRegEdit className='cursor-pointer' onClick={() => {
                                setIsPostEditing(true)
                            }} />
                            <FaRegTrashAlt className='text-red-600 cursor-pointer' onClick={() => {
                                setIsPostEditing(false)
                                deletePost(postId)
                            }} />
                        </div>
                    </>}
                </div>

                <div className='comment-container bg-(--text) md:px-40 px-15 py-6 '>
                    <h1 className='text-(--secondary) text-4xl font-medium'>Comments</h1>

                    <div className='relative flex items-center mt-8'>
                        <input type="text" placeholder='Type a comment' className='rounded bg-(--bg) px-4 py-2 text-xl focus:outline-0 w-full'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <button type="submit" className='absolute bg-(--secondary) right-0 bottom-[50%] translate-y-[50%] cursor-pointer w-12 h-full rounded grid place-items-center' onClick={() => {
                            createComment(comment)
                        }}>
                            <FaArrowRight className='text-xl text-(--text)'
                            />
                        </button>
                    </div>

                    <div className='comments'>
                        <Comments post={post} comments={comments} isEditing={isEditing} setIsEditing={setIsEditing} updateComment={updateComment} deleteComment={deleteComment} />
                    </div>
                </div>


            </div>

        </>
    )
}

export default PostDetail