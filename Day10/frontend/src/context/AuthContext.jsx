import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import api from '../api/api'

export const authContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const userInfo = await api.get(`api/auth/user`)
                setUser(userInfo.data.user)
                setLoading(false)
            } catch (e) {
                setUser(null)
                console.log("Error - " + e);
            } finally { setLoading(false) }
        }
        fetchData()

    }, [])

    console.log("Auth context User - " + user);

    return (
        <authContext.Provider value={{ user, setUser, loading }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider