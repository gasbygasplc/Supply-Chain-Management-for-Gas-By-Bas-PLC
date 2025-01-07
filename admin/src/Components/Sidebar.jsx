import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext';
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';

const Sidebar = () => {

    const {aToken} = useContext(AdminContext);

  return (

    <div className='min-h-screen bg-white border-r'>
        
        {

            aToken &&

            <ul className='text-[#515151] mt-5'>

                <NavLink className = {({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary-600' : ''}` } to={'/admin-dashboard'}>

                    <img src={assets.home_icon}/>

                    <p>Dashboard</p>

                </NavLink>  

                <NavLink className = {({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary-600' : ''}` } to={'/add-outlet'}>

                    <img src={assets.add_outlet}/>

                    <p>Add Outlet</p>

                </NavLink>  

                <NavLink className = {({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary-600' : ''}` } to={'/add-outlet-manager'}>

                    <img src={assets.add_outlet_manager}/>

                    <p>Add Outlet Manager</p>

                </NavLink>  

                <NavLink className = {({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary-600' : ''}` } to={'/gasStock'}>

                    <img src={assets.add_stock}/>

                    <p>Stock</p>

                </NavLink>  

                <NavLink className = {({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary-600' : ''}` } to={'/outlet-stock-request'}>

                    <img src={assets.stock_request}/>

                    <p>Manage Stock</p>

                </NavLink>  

            </ul>

        }

    </div>

  )

}

export default Sidebar