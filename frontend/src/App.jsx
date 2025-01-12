
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import PriceingCart from './Components/PriceingCart'

const App = () => {

  return (

    <div className='mx-4 sm:mx-[10%]'>

      <Navbar/>

      <Routes>

        <Route path='/' element ={<Home/>}/>

        <Route path='/Pricing-Cart' element={<PriceingCart/>} />

      </Routes>

    </div>

  )

}

export default App