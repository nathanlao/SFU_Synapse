import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Home from './pages/Home/Home'
import ConnectionsLayout from './components/ConnectionsLayout/ConnectionsLayout'
import GroupsLayout from './components/GroupsLayout/GroupsLayout'
import SettingsLayout from './components/SettingsLayout/SettingsLayout'
import LoginSignupWindow from './components/LoginSignupWindow/LoginSignupWindow'
import AdminLogin from './pages/Login/AdminLogin'
import Chat from './pages/Chat/Chat'
import Discover from './pages/Discover/Discover'
import EditProfile from './pages/EditProfile/EditProfile'
import ChangePassword from './pages/ChangePassword/ChangePassword'

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
                        <Route path='connections' element={<ConnectionsLayout />} >
                            {/* Nested route relative to "/connection" */}
                            <Route path=':id' element={<Chat />} />
                        </Route>
                        <Route path='groups' element={<GroupsLayout />} >
                            {/* Nested route relative to "/groups" */}
                            <Route path='chat' element={<Chat />} />
                            <Route path='discover' element={<Discover />} />
                        </Route>
                        <Route path='setting' element={<SettingsLayout />} >
                            {/* Nested route relative to "/setting" */}
                            <Route path='edit-profile' element={<EditProfile />} />
                            <Route path='change-password' element={<ChangePassword />} />
                        </Route>
                    </Route>

                    {/* Admin pages */}
                    <Route path='/admin/login' element={<AdminLogin />} />
                    <Route path='/admin' element={<Admin />} />
                </Routes>
            </main>
        </div>
    )
}
