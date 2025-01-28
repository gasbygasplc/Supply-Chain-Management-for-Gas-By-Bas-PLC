import React, { useContext, useState } from 'react';
import { asstets } from '../assets/Assets';
import { toast } from 'react-toastify';
import { GasContext } from '../Context/GasContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopUp = ({ setShowSignIn }) => {
  const [currentState, setCurrentState] = useState('Sign In');
  const { setToken, setUserData } = useContext(GasContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nic: '',
    role: 'User',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      currentState === 'Sign In'
        ? 'http://localhost:4000/api/auth/login'
        : 'http://localhost:4000/api/auth/register';

    try {
      const response = await axios.post(url, formData);

      if (response.status === 201 || response.status === 200) {
        toast.success(
          currentState === 'Sign In' ? 'Login successful!' : 'Registration successful!'
        );

        if (currentState === 'Sign In') {
          const { token, user } = response.data;

          setToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('userdata', JSON.stringify(user));
          setShowSignIn(false);
        } else {
          setShowSignIn(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error connecting to the server.');
    }
  };

  return (
    <div className="absolute inset-0 z-10 bg-black bg-opacity-70 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-4 p-6 rounded-lg w-[95%] sm:w-[330px] md:w-[24vw] fadeIn"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <img
            onClick={() => setShowSignIn((previous) => !previous)}
            className="w-4 cursor-pointer"
            src={asstets.cross_icon}
            alt="closer"
          />
        </div>

        <div className="flex flex-col gap-4">
          {currentState === 'Sign In' ? null : (
            <>
              <input
                name="name"
                type="text"
                placeholder="Gayathri Varatharajan"
                className="outline-none border border-primary p-2 rounded-md"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="phone"
                type="text"
                placeholder="0094771234567"
                className="outline-none border border-primary p-2 rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                name="nic"
                type="text"
                placeholder="200118706543V"
                className="outline-none border border-primary p-2 rounded-md"
                value={formData.nic}
                onChange={handleChange}
              />

              <select
                name="role"
                className="outline-none border border-primary p-2 rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Organization">Organization</option>
              </select>
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Gasbygas@gmail.com"
            className="outline-none border border-primary p-2 rounded-md"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="**********"
            className="outline-none border border-primary p-2 rounded-md"
            value={formData.password}
            onChange={handleChange}
          />

          {
            currentState === 'Sign In' ? (<p onClick={() => {
              setShowSignIn(false);
              navigate('/reset-password-request');
            }} className='text-[13px] text-gray-700 cursor-pointer text-right'>Forgot <span className='text-primary'>Password?</span></p>) : ("")
          }
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-[10px] rounded-md text-sm font-medium cursor-pointer"
        >
          {currentState}
        </button>

        {currentState === 'Sign Up' ? (
          <div className="flex items-center gap-2">
            <input type="checkbox" required />
            <p className="text-sm">
              By Continuing, I agree to the terms of use & Privacy Policy
            </p>
          </div>
        ) : (
          ''
        )}

        {currentState === 'Sign In' ? (
          <>
            {/* <p className="text-sm">
              Forgot your password?{' '}
              <span
                onClick={() => {
                  setShowSignIn(false);
                  navigate('/reset-password-request');
                }}
                className="text-sm font-semibold cursor-pointer text-primary"
              >
                Reset Password
              </span>
            </p> */}
            <p className="text-sm">
              Create a new account?{' '}
              <span
                onClick={() => setCurrentState('Sign Up')}
                className="text-sm font-semibold cursor-pointer text-primary"
              >
                Click Here
              </span>
            </p>
          </>
        ) : (
          <p className="text-sm">
            Sign In to your Account?{' '}
            <span
              onClick={() => setCurrentState('Sign In')}
              className="text-sm font-semibold cursor-pointer text-primary"
            >
              Click Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
