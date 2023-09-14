import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='p-2 flex flex-col min-h-screen mx-auto'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout