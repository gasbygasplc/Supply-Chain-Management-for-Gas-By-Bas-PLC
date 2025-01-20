import React, { useContext } from 'react'
import { GasContext } from '../Context/GasContext'

const Cart = () => {

  const {gasOrder} = useContext(GasContext)

  return (

    <div className='max-w-full'>

      <div className='overflow-x-scroll max-w-full' >

        <table className='min-w-full table-auto text-sm text-gray-700'>

          <thead className='bg-gray-100'>

            <tr>
              
              <th className='px-4 py-2 text-left'>Type</th>
              <th className='px-4 py-2 text-left'>Price</th>
              <th className='px-4 py-2 text-left'>Quantity</th>
              <th className='px-4 py-2 text-left'>Total Price</th>
              <th className='px-4 py-2 text-left'>Weight</th>
              <th class="px-4 py-2 text-left">Remove</th>

            </tr>

          </thead>

          <tbody>

            {gasOrder.map((order , index) => (

              <tr className='border-t' key={index}>

                <td className='px-4 py-2'>{order.type}</td>
                <td className='px-4 py-2'>{order.price}</td>
                <td className='px-4 py-2'>{order.quantity}</td>
                <td className='px-4 py-2'>{order.totalPrice}</td>
                <td className='px-4 py-2'>{order.weightKG}</td>
                <td class="px-4 py-2 text-left">

                  <button class="text-primary hover:text-red-800 ">x</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Cart