
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'

const App = () => {

  return (
    <div className='mx-4 sm:mx-[10%] w-[80%]'>

      <Navbar/>

      <Routes>

        <Route path='/' element ={<Home/>}/>

        <Route path='/' />

      </Routes>
    </div>
  )
}

export default App