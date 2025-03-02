import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { OutletContext } from "../Context/OutletContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { aToken } = useContext(AdminContext);
  const { Otoken } = useContext(OutletContext);

  return (
    <>
      <div
        className={`fixed md:relative h-screen w-64 md:w-72 bg-white border-r z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } `} 
      >
        <ul className="text-[#515151] mt-10 md:mt-4 space-y-2 visible">
          {aToken && (
            <ul>
              <SidebarItem to="/" img={assets.dashboard} label="Dashboard" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/delivery-schedule" img={assets.delivery_shedule} label="Delivery Schedule" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/add-outlet" img={assets.outlet} label="Add Outlets" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/add-outlet-manager" img={assets.person} label="Add Outlet Manager" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/manage-stock" img={assets.stock} label="Manage Stock" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/add-organization-gas" img={assets.LargeGas} label="Organization Gas" toggleSidebar={toggleSidebar} />
            </ul>
          )}
          {Otoken && (
            <>
              <SidebarItem to="/outlet-dashboard" img={assets.dashboard} label="Dashboard" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/gas-request" img={assets.outlet} label="Gas Request" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/stock-request" img={assets.person} label="Stock Request" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/consumers" img={assets.group} label="Consumers" toggleSidebar={toggleSidebar} />
              <SidebarItem to="/outlet-report" img={assets.summarize} label="Report" toggleSidebar={toggleSidebar} />
            </>
          )}
        </ul>
      </div>

      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"></div>
      )}
    </>
  );
};

const SidebarItem = ({ to, img, label, toggleSidebar }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-4 md:px-6 cursor-pointer ${
        isActive ? "bg-[#f2f3ff] border-r-4 border-primary-600" : ""
      }`
    }
    onClick={toggleSidebar} 
  >
    <img src={img} alt={label} className="w-6 h-6 text-black visible" />
    <p className="block text-black visible">{label}</p>
  </NavLink>
);

export default Sidebar;
