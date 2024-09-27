import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import Chat2 from './components/Chat2'

function App() {
 

  return (
    <>
     <div className='app'>
    
      <Routes>

      
      <Route path='/' element={<Home/>}/>
      <Route path='/chat' element={<Chat2/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
