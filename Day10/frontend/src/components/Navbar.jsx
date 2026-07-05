import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex gap-20 h-20 items-center justify-center w-full text-2xl bg-(--text-opacity) fixed top-0 backdrop-blur-2xl'>
        <Link to='/'>Home</Link>
        <Link to='/post' >Post</Link>
        <Link to='/profile'>User</Link>
    </div>
  )
}

export default Navbar