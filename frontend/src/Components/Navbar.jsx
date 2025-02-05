import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { asstets } from "../assets/Assets";
import { GasContext } from "../Context/GasContext";

const Navbar = ({ setShowSignIn }) => {
  const { token, setToken, setUserData, setGasQuantity, gasOrder } = useContext(GasContext);
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null); // Store user role

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userdata"));
    if (storedUserData && storedUserData.role) {
      setUserRole(storedUserData.role)
    }
    console.log(userRole)
  }, []);

  useEffect(() => {
    console.log("Updated userRole:", userRole);
  }, [userRole]);

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;

    if (path === "/") {
      const section = hash ? hash.replace("#", "") : "home";
      setMenu(section.charAt(0).toUpperCase() + section.slice(1));
    } else {
      const activePage = path.replace("/", "");
      setMenu(activePage.charAt(0).toUpperCase() + activePage.slice(1));
    }
  }, [location]);

  const handleNavigateToSection = (route, section) => {
    if (route === "/") {
      navigate(route);

      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(route);
    }
  };

  return (
    <div className="bg-white py-5 px-0 flex justify-between items-center">
      <Link to={"/"}>
        <img className="w-28 md:w-[150px] cursor-pointer" src={asstets.logo} alt="Logo" />
      </Link>

      <ul className="hidden md:flex list-none gap-6 text-[#49577e] text-lg">
        <a
          onClick={() => handleNavigateToSection("/", null)}
          className={menu === "Home" ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""}
        >
          Home
        </a>
        <a
          onClick={() => handleNavigateToSection("/", "pricing-cart")}
          className={menu === "Pricing-cart" ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""}
        >
          Price
        </a>
        <a
          onClick={() => handleNavigateToSection("/", "gas-request")}
          className={menu === "Gas-request" ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""}
        >
          Gas Request
        </a>
        <a
          onClick={() => handleNavigateToSection("/", "about-us")}
          className={menu === "About-us" ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""}
        >
          About Us
        </a>
        <a
          onClick={() => handleNavigateToSection("/", "contact-us")}
          className={menu === "Contact-us" ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="flex items-center justify-center gap-4 sm:gap-8">
        <div onClick={() => navigate("/gas-cart")} className="relative cursor-pointer">
          <img className="w-6 sm:w-8" src={asstets.bucket_icon} alt="Cart" />
          {gasOrder.length > 0 && <div className="absolute min-w-[8px] min-h-[8px] bg-primary top-[-3px] right-[-3px] rounded-full"></div>}
        </div>

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-12 rounded-full" src={asstets.user_icon} alt="User Icon" />
            <img className="w-3" src={asstets.drop_Down_Icon} alt="Dropdown Icon" />

            <div className="absolute top-0 right-0 pt-14 z-50 text-base font-normal text-[#49577e] hidden group-hover:block">
              <div className="min-w-48 bg-[#ffffff] border shadow-md flex flex-col gap-3 p-4 rounded-md">
                <Link to="/my-profile" className="hover:text-primary">
                  My Profile
                </Link>
                {userRole === "Organization" && (
                  <Link to="/br-approval" className="hover:text-primary">
                    BR Approval
                  </Link>
                )}
                <Link to="/my-gas-orders" className="hover:text-primary">
                  My Gas Orders
                </Link>
                <Link to="/notifications" className="hover:text-primary">
                  Notifications
                </Link>
                <Link to="/change-password" className="hover:text-primary">
                  Reset Password
                </Link>
                <p
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userdata");
                    setToken(null);
                    setUserData(null);
                    setGasQuantity(1);
                    navigate("/");
                  }}
                  className="hover:text-red-700"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowSignIn(true)}
            className="text-white bg-primary text-base font-medium border-2 hover:bg-transparent hover:border-primary hover:text-gray-800 transition duration-300 px-8 py-2.5 rounded-full cursor-pointer text-center"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
