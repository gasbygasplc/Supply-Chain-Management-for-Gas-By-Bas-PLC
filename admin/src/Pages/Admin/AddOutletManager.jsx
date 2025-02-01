import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../Context/AdminContext';
import { OutletContext } from '../../Context/OutletContext';

const AddOutletManager = () => {
  const [name, setName] = useState("");
  const [outletName, setOutletName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userRole, setUserRole] = useState("Outlet Manager");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingOutlets, setLoadingOutlets] = useState(true);

  const { aToken, backendURL } = useContext(AdminContext);
  const { getOutletName, outletNames , getOutletNames, outletId } = useContext(OutletContext);

  useEffect(() => {
    const fetchOutlets = async () => {
      setLoadingOutlets(true);
      await getOutletName();
      setLoadingOutlets(false);
    };
    fetchOutlets();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !outletName || !email || !password || !phoneNumber || !userRole) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name,
        outletId: outletName,
        email,
        password,
        phoneNumber,
        userRole
      };

      const { data } = await axios.post(
        `${backendURL}/api/admin/add-outlet-manager`,
        payload,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        clearForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the outlet manager.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setName("");
    setOutletName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setUserRole("Outlet Manager");
  };

  return (
    <div className="bg-white border my-5 mx-auto sm:mx-10 px-5 sm:px-[5%] sm:py-7 w-[80%]">
      <form onSubmit={handleSubmit}>
        <p className="text-gray-800 text-lg pt-5 font-semibold pb-3">Add Outlet Manager</p>

        <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-6">

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="Outlet-manager-name">Outlet Manager Name</label>
            <input
              type="text"
              id="Outlet-manager-name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="Outlet-name">Outlet Name</label>
            {loadingOutlets ? (
              <p className="text-gray-500">Loading Outlets...</p>
            ) : (
              <select
                id="Outlet-name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
                value={outletName}
                onChange={(e) => setOutletName(e.target.value)}
              >
                <option value="" disabled>Select an Outlet</option>
                {outletNames.length > 0 ? (
                  outletNames.map((outlet) => (
                    <option key={outlet._id} value={outlet._id}>{outlet.outletName}</option>
                  ))
                ) : (
                  <option value="" disabled>No outlets available</option>
                )}
              </select>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="Phone-Number">Phone Number</label>
            <input
              type="text"
              id="Phone-Number"
              className="w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="User-Role">User Role</label>
            <select
              id="User-Role"
              className="w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="" disabled>Select Role</option>
              <option value="Outlet Manager">Outlet Manager</option>
            </select>
          </div>

          <div className="sm:col-span-3 mt-5">
            <button type="button" className="border border-gray-400 w-full text-black py-3 rounded" onClick={clearForm}>
              Clear
            </button>
          </div>

          <div className="sm:col-span-3 mt-5">
            <button type="submit" className="bg-[#FED500] w-full text-black py-3 rounded" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Outlet Manager"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOutletManager;
