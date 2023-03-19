import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Home from './pages/Home/Home'
import ConnectionsLayout from './components/ConnectionsLayout/ConnectionsLayout'
import GroupsLayout from './components/GroupsLayout/GroupsLayout'
import Setting from './pages/Setting/Setting'
import LoginSignupWindow from './components/LoginSignupWindow/LoginSignupWindow'
import ChatSubtab from './pages/ChatSubtab/ChatSubtab'
import DiscoverSubtab from './pages/DiscoverSubtab/DiscoverSubtab'

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
                            <Route path=':id' element={<ChatSubtab />} />
                        </Route>
                        <Route path='groups' element={<GroupsLayout />} >
                            {/* Nested route relative to "/groups" */}
                            <Route path='chat' element={<ChatSubtab />} />
                            <Route path='discover' element={<DiscoverSubtab />} />
                        </Route>
                        <Route path='setting' element={<Setting />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}
