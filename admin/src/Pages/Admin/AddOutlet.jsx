import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddOutlet = () => {

  return (


    <form  className='w-full min-h-screen max-w-3xl mx-auto'>

      <div className="pt-10 mx-10">

          <h2 className="text-base/7 font-semibold text-gray-900">Create New Outlet</h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">

              <label htmlFor="outlet-name" className="block text-sm/6 font-medium text-gray-900">

                Outlet Name

              </label>

              <div className="mt-2">

                <input
                  id="outlet-name"               
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3">

              <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">

                Phone Number

              </label>

              <div className="mt-2">

                <input
                  id="phoneNumber"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3">

              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">

                email address

              </label>

              <div className="mt-2">

                <input
                  id="email"
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="col-span-3">

              <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">

                location

              </label>

              <div className="mt-2">

                <input
                  id="location"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3 sm:col-start-1">

              <label htmlFor="deliveryCapacity" className="block text-sm/6 font-medium text-gray-900">

                deliveryCapacity

              </label>

              <div className="mt-2">

                <input
                  id="deliveryCapacity"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3">

              <label htmlFor="currentStock" className="block text-sm/6 font-medium text-gray-900">

                currentStock

              </label>

              <div className="mt-2">

                <input
                  id="currentStock"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3">

              <label htmlFor="maxCapacity" className="block text-sm/6 font-medium text-gray-900">

                maxCapacity

              </label>

              <div className="mt-2">

                <input
                  id="maxCapacity"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <div className="sm:col-span-3">

              <label htmlFor="minimumRequestLevel" className="block text-sm/6 font-medium text-gray-900">

                minimumRequestLevel

              </label>

              <div className="mt-2">

                <input
                  id="minimumRequestLevel"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>

            </div>

            <button className='sm:col-span-full bg-primary-600 text-white rounded-lg py-2'>Create Outlet</button>

          </div>
          
      </div>

    </form>

  )

}

export default AddOutlet