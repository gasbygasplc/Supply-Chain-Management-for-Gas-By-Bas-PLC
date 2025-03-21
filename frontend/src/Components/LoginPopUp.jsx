import React, { useContext, useState } from 'react';
import { asstets } from '../assets/Assets';
import { toast } from 'react-toastify';
import { GasContext } from '../Context/GasContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopUp = ({ setShowSignIn }) => { // show sign in form
  const [currentState, setCurrentState] = useState('Sign In'); // current state of the form
  const { setToken, setUserData } = useContext(GasContext); //to access setToken and setUserData for authentication
  const [formData, setFormData] = useState({ // form data to store user inputs 
    name: '',
    phone: '',
    nic: '',
    role: 'User',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // to navigate to different pages

  const handleChange = (e) => { // handle change in the form
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    const url =
      currentState === 'Sign In' // check the current state of the form
        ? 'https://mw.gasbygas.store/api/auth/login' // if sign in  Login API
        : 'https://mw.gasbygas.store/api/auth/register'; // if sign up Register API

    try {
      const response = await axios.post(url, formData);  // post the form data to the server

      if (response.status === 201 || response.status === 200) { // if the response is successful
        toast.success(
          currentState === 'Sign In' ? 'Login successful!' : 'Registration successful!'  // show success message
        );

        if (currentState === 'Sign In') {  // if sign in
          const { token, user } = response.data; // get token and user data from the response

          setToken(token);  // set token
          localStorage.setItem('token', token); // save token to local storage
          localStorage.setItem('userdata', JSON.stringify(user)); // save user data to local storage
          setShowSignIn(false); // close the sign in form
        } else {
          setShowSignIn(false); 
        }
      }
    } catch (error) {
      console.error('Error:', error); // log the error
      toast.error('Error connecting to the server.');
    }
  };

  return (
    <div className="absolute inset-0 z-10 bg-black bg-opacity-70 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-4 p-6 rounded-lg w-[95%] sm:w-[330px] md:w-[24vw] fadeIn"
      >
        {/* ============== close button ============ */}
        <div className="flex justify-between items-center text-black"> 
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <img
            onClick={() => setShowSignIn(false)}
            className="w-4 cursor-pointer"
            src={asstets.cross_icon}
            alt="closer"
          />
        </div>
        {/* ===== current state is Sign in these signup testboxes doent show */}
        <div className="flex flex-col gap-4">
          {currentState === 'Sign In' ? null : (
            <>
              <input
                name="name"
                type="text"
                placeholder="Mathumitha"
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
          {/* ==== forgot password=== */}
          {
            currentState === 'Sign In' ? (<p onClick={() => {
              setShowSignIn(false);
              navigate('/reset-password-request');
            }} className='text-[13px] text-gray-700 cursor-pointer text-right'>Forgot <span className='text-primary'>Password?</span></p>) : ("")
          }
        </div>
        {/* == sign in button === */}
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
        {/* ==== create Acoount navigatiin==== */}
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
