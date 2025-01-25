import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';
import { OutletContext } from '../Context/OutletContext';


const Sidebar = () => {

  const {aToken} = useContext(AdminContext);

  const {Otoken} = useContext(OutletContext);

  return (

    <div className=' min-h-screen bg-white border-r '>
    
      {

        aToken && 

        <ul className='text-[#515151] mt-5'>

          
          <NavLink to={'/delivery-shedule'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.delivery_shedule} alt="" />

            <p className='hidden md:block'>Delivery Shedule</p>

          </NavLink>

          <NavLink to={'/add-outlet'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.outlet} alt="" />

            <p className='hidden md:block'>Add Outlet</p>

          </NavLink>

          <NavLink to={'/add-outlet-manager'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.person} alt="" />

            <p className='hidden md:block'>Add Manager</p>

          </NavLink>

          <NavLink to={'/manage-stock'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.stock} alt="" />

            <p className='hidden md:block'>Manage Stock</p>

          </NavLink>
          
        </ul>
      }

      {

        Otoken && 

        <ul className='text-[#515151] mt-5'>

          <NavLink to={'/gas-request'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.outlet} alt="" />

            <p className='hidden md:block'>Gas Request</p>

          </NavLink>

          <NavLink to={'/stock-request'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.person} alt="" />

            <p className='hidden md:block'>Stock Request</p>

          </NavLink>

          <NavLink to={'/delivery-status'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary-600' : ''}`}>

            <img src={assets.stock} alt="" />

            <p className='hidden md:block'>Delivery</p>

          </NavLink>
          
        </ul>
      }
    
    </div>
  )
}

export default Sidebar