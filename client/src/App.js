import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Home from './pages/Home/Home'
import Connections from './pages/Connections/Connections'
import Groups from './pages/Groups/Groups'
import Setting from './pages/Setting/Setting'
import LoginSignupWindow from './components/LoginSignupWindow/LoginSignupWindow'
import AdminLogin from './pages/Login/AdminLogin'

import './App.css'
import Admin from './pages/Admin/Admin'

export default function App() {
    return (
        <div>
            <main className='main'>
                <Routes>
                    <Route path='/login' element={<LoginSignupWindow />} />
                    <Route path='/signup' element={<LoginSignupWindow />} />
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path='connections' element={<Connections />} />
                        <Route path='groups' element={<Groups />} />
                        <Route path='setting' element={<Setting />} />
                    </Route>

                    {/* Admin pages */}
                    <Route path='/admin/login' element={<AdminLogin />} />
                    <Route path='/admin' element={<Admin />} />
                </Routes>
            </main>
        </div>
    )
}
