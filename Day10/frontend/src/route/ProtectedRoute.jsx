import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const ProtectedRoute = () => {
    const { user, loading } = useContext(authContext)

    if (loading) return <h1>Loading....</h1>
    if (!user) return <Navigate to='/login' />

    return <>
        <Navbar />
        <div className='pt-30 h-full'>
            <Outlet />
        </div>
    </>
}

export default ProtectedRoute