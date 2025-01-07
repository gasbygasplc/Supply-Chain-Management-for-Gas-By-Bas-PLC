import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../Context/AdminContext';
import {useNavigate} from 'react-router-dom'


const Navbar = () => {

  const { aToken ,SetAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => 
  {
    navigate('/');

    aToken && SetAToken("");

    aToken && localStorage.removeItem('aToken')

  }

  return (

    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

        <div className='flex items-center gap-2 text-xs'>

            <img className='w-36 cursor-pointer' src={assets.admin_logo} alt="" />

            <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? "Admin" : "Outlet"}</p>

        </div>

        <button onClick={logout} className='bg-primary-700 text-white text-sm px-10 py-3 rounded-lg'>Signout</button>

    </div>

  );

};

export default Navbar;
