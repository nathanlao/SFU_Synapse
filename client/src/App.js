import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import Home from './pages/Home/Home'
import Connections from './pages/Connections/Connections'
import Groups from './pages/Groups/Groups'
import Setting from './pages/Setting/Setting'

import './App.css'

export default function App() {
    return (
        <div>
            <main className='main'>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path='connections' element={<Connections />} />
                        <Route path='groups' element={<Groups />} />
                        <Route path='setting' element={<Setting />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}
