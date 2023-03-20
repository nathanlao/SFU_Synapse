import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Home from './pages/Home/Home'
import ConnectionsLayout from './components/ConnectionsLayout/ConnectionsLayout'
import GroupsLayout from './components/GroupsLayout/GroupsLayout'
import Setting from './pages/Setting/Setting'
import LoginSignupWindow from './components/LoginSignupWindow/LoginSignupWindow'
import Chat from './pages/Chat/Chat'
import Discover from './pages/Discover/Discover'

import './App.css'

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
                        <Route path='setting' element={<Setting />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}
