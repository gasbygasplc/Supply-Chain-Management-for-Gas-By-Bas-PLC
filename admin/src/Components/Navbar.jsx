import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { assets } from '../assets/assets';


const Navbar = () => {
  const { aToken } = useContext(AdminContext);

  return (

    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

        <div>

            <img src={assets.admin_logo} alt="" />

            <p>{aToken ? "Admin" : "Outlet"}</p>

        </div>

        <button>Signout</button>

    </div>

  );

};

export default Navbar;
