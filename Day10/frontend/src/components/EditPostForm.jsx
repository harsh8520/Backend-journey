import { useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/api"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router"

const EditPostForm = ({ status, setStatus, getPost, postId, setIsPostEditing, post }) => {
    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            title: post.title,
            content: post.content,
            status: 'draft'
        }
    })

    async function submitHandler(data) {
        try {
            await api.put(`api/posts/${postId}`, data)

            await getPost()
            reset()
            setIsPostEditing(false)
            setStatus('draft')
            navigate('/')
        } catch (e) {
            console.log("Error - " + e);
        }
    }


    return (
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4 w-full' >
            <input type="text" placeholder='Enter post title' className='focus:outline-2 focus:outline-(--primary) bg-(--text) rounded px-4 py-2 text-xl'
                {...register('title')}

            />

            <textarea name="" id="" rows={20} placeholder='Enter post content' className='resize-y focus:outline-2 focus:outline-(--primary) bg-(--text) rounded px-4 py-2 text-xl'
                {...register('content')}
            />


            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center justify-center gap-2'>
                    <button type='button' className={status === 'draft' ? "status-btn px-6 py-2 italic text-2xl" : ' px-6 py-2 Outfit text-2xl'}
                        onClick={() => {
                            setStatus('draft')
                            setValue('status', 'draft')
                        }}

                    >Draft</button>

                    <button type='button' className={status === 'published' ? "status-btn px-6 py-2 italic text-2xl" : ' px-6 py-2 Outfit text-2xl'}
                        onClick={() => {
                            setStatus('published')
                            setValue('status', 'published')
                        }}


                    >Published</button>
                    <IoCloseCircleOutline className='text-red-600 cursor-pointer text-4xl' onClick={() => { setIsPostEditing(false) }} />
                </div>

                <button type='submit'
                    className='text-2xl px-6 py-2 border-2 border-(--secondary) bg-(--secondary) text-(--text) rounded'
                >Save</button>
            </div>
        </form>
    )
}

export default EditPostForm