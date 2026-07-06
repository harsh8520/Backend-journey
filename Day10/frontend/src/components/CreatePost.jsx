import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/api'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const CreatePost = () => {
    const [status, setStatus] = useState('draft')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
        const notify = () => toast.success('Post Created');
    

    const {
        register,
        reset,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            status: 'draft'
        }
    })

    async function submitHandler(data) {
        try {
            const createPost = await api.post('api/posts/', data)
            console.log("Post created successfully" + createPost);
        } catch (e) {
            setError(e.response.data.message)
            console.log("Error - " + e);
        }

        reset()
        setStatus('draft')
        navigate('/')
    }

    return (
        <div className='px-8 flex flex-col gap-8'>
            <h1 className='text-5xl text-(--secondary) Outfit'>Create a post</h1>
            {error ? <p className='text-red-600'>{error}</p> : null}

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
                                setValue('status','draft')
                            }}
                            
                        >Draft</button>

                        <button type='button' className={status === 'published' ? "status-btn px-6 py-2 italic text-2xl" : ' px-6 py-2 Outfit text-2xl'}
                            onClick={() => {
                                setStatus('published')
                                setValue('status','published')

                            }}
                            

                        >Published</button>
                    </div>

                    <button type='submit'
                        className='text-2xl px-6 py-2 border-2 border-(--secondary) bg-(--secondary) text-(--text) rounded'
                        onClick={notify}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost