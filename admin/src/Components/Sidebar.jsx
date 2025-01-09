import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';


const Sidebar = () => {

  const {aToken} = useContext(AdminContext);

  return (

    <div className='min-h-screen max-w-72  bg-white border-r '>
    
      {

        aToken && 

        <ul className='text-[#515151] mt-5'>
  
          <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFEEEF] border-r-4 border-[#ED1C24]' : ''}` }>

            <img src={assets.dashboard} alt="" />

            <p className='hidden md:block'>Dashboard</p>

          </NavLink>

          <NavLink to={'/add-outlet'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFEEEF] border-r-4 border-[#ED1C24]' : ''}`}>

            <img src={assets.outlet} alt="" />

            <p className='hidden md:block'>Add Outlet</p>

          </NavLink>

          <NavLink to={'/add-outlet-manager'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFEEEF] border-r-4 border-[#ED1C24]' : ''}`}>

            <img src={assets.person} alt="" />

            <p className='hidden md:block'>Add Manager</p>

          </NavLink>

          <NavLink to={'/manage-stock'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFEEEF] border-r-4 border-[#ED1C24]' : ''}`}>

            <img src={assets.stock} alt="" />

            <p className='hidden md:block'>Manage Stock</p>

          </NavLink>

          <NavLink to={'/outlet-stock-request'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFEEEF] border-r-4 border-[#ED1C24]' : ''}`}>

            <img src={assets.request} alt="" />

            <p className='hidden md:block'>Outlet Request</p>

          </NavLink>
          
        </ul>
      }
    
    </div>
  )
}

export default Sidebar