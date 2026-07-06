import { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../../api/api"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


const Register = () => {
    const navigate = useNavigate()
    const notify = () => toast.success('Registered !');
    const {
        register,
        reset,
        handleSubmit
    } = useForm()
    const [status, setStatus] = useState(null)

    const onSubmit = async (data) => {
        try {
            const login = await api.post(`api/auth/register`, data)

            navigate('/login')
        } catch (e) {
            setStatus(e.response.data.message)
            console.log("Error - " + e);
        }
        reset()
    }

    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 items-center justify-center'>
                <h1 className='text-6xl Outfit text-(--secondary)'>Hello There <span className='Adlery-pro'>Register Here!</span></h1>

                {status ? <p className='text-red-600'>{status}</p> : null}

                <div className='flex flex-col gap-8 w-full items-center'>
                    <input {...register('username')} type="name" placeholder='username' className='bg-(--text) focus:outline-0 text-2xl px-5 py-3 text-left text-(--secondary) w-[80%]' />
                    <input {...register('email')} type="email" placeholder='email-id' className='bg-(--text) focus:outline-0 text-2xl px-5 py-3 text-left text-(--secondary) w-[80%]' />
                    <input {...register('password')} type="password" placeholder='password' className='bg-(--text) focus:outline-0 text-2xl px-5 py-3 text-left text-(--secondary) w-[80%]' />
                </div>

                <button type="submit" className='px-12 py-2 bg-(--secondary) text-(--text) Adlery-pro text-3xl' onClick={notify}>Register</button>
                <p>Already have an account ? <Link to='/login'>Login</Link> </p>
            </form>
        </div>
    )
}

export default Register