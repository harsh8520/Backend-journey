import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { authContext } from './context/AuthContext'
import { AppRoutes } from './route/AppRoutes'

function App() {
    const { user } = useContext(authContext)

    return (
            <AppRoutes />
    )
}

export default App
