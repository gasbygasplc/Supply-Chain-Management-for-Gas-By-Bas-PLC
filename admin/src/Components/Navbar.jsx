import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { IoMenu, IoClose } from "react-icons/io5"; // Import icons
import { OutletContext } from "../Context/OutletContext";
import { AdminContext } from "../Context/AdminContext";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {

  const {Otoken , setOtoken} = useContext(OutletContext);
  const {aToken , SetAToken} = useContext(AdminContext);

  const handleLogout = () => {

    setOtoken('');
    localStorage.removeItem('Otoken');
    SetAToken('');
    localStorage.removeItem('aToken');
  }
  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">

      <div className="flex items-center gap-4">


        <button 
          onClick={toggleSidebar} 
          className="md:hidden bg-primary-600 text-white p-2 rounded-md border"
        >
          {isSidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>

        {/* Logo */}
        <img className="w-28 sm:w-36 cursor-pointer" src={assets.admin_logo} alt="Logo" />
      </div>

      {/* Signout Button */}
      <button onClick={handleLogout}
        className="bg-primary-600 text-white font-medium text-sm px-6 sm:px-10 py-2 sm:py-3 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
