import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import api from '../../api/api'

const Login = () => {
    const { user, setUser } = useContext(authContext)
    const {
        register,
        reset,
        handleSubmit
    } = useForm()
    const navigate = useNavigate()
    const [status, setStatus] = useState(null)

    const onSubmit = async (data) => {
        try {
            const login = await api.post(`api/auth/login`, data)

            setUser(login.data.user)
            navigate('/')
        } catch (e) {
            setStatus(e.response.data.message)
            console.log("Error - " + e);
        }
        reset()
    }
    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 items-center justify-center'>
                <h1 className='text-6xl Outfit text-(--secondary)'>Welcome back <span className='Adlery-pro'>Amigo!</span></h1>

                {status? <p className='text-red-600'>{status}</p> : null}

                <div className='flex flex-col gap-8 w-full items-center'>
                    <input {...register('email')} type="email" placeholder='email-id' className='bg-(--text) focus:outline-0 text-2xl px-5 py-3 text-left text-(--secondary) w-[80%]' />
                    <input {...register('password')} type="password" placeholder='password' className='bg-(--text) focus:outline-0 text-2xl px-5 py-3 text-left text-(--secondary) w-[80%]' />
                </div>

                <button type="submit" className='px-12 py-2 bg-(--secondary) text-(--text) Adlery-pro text-3xl'>Login</button>
                
            </form>
        </div>
    )
}

export default Login