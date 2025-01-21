import React, { useContext } from 'react';
import { GasContext } from '../Context/GasContext';
import { toast } from 'react-toastify';

const Cart = () => {

  const { gasOrder, checkoutCart, setGasOrder } = useContext(GasContext);

  const handleRemoveItem = (index) => 
  {

    setGasOrder((prevOrders) => {

      const updatedOrders = [...prevOrders];

      updatedOrders.splice(index, 1);

      return updatedOrders;

    });

    toast.info('Item removed from cart');

  };

  const handleCheckout = () => {

    if (gasOrder.length === 0) 
    {

      toast.error('Your cart is empty.');

      return;

    }

    checkoutCart();

  };

  return (

    <section className="max-w-full p-4">

      <div className="overflow-x-scroll max-w-full">

        <table className="min-w-full table-auto text-sm text-gray-700">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-2 text-left">Type</th>

              <th className="px-4 py-2 text-left">Price</th>

              <th className="px-4 py-2 text-left">Quantity</th>

              <th className="px-4 py-2 text-left">Total</th>

              <th className="px-4 py-2 text-left">Weight</th>

              <th className="px-4 py-2 text-left">Remove</th>

            </tr>

          </thead>

          <tbody>

            {gasOrder.map((order, index) => (

              <tr className="border-t" key={index}>

                <td className="px-4 py-2">{order.type}</td>

                <td className="px-4 py-2">{order.price}</td>

                <td className="px-4 py-2">{order.quantity}</td>

                <td className="px-4 py-2">{order.totalPrice}</td>

                <td className="px-4 py-2">{order.weightKG}</td>

                <td className="px-4 py-2 text-left">

                  <button className="text-primary hover:text-red-800" onClick={() => handleRemoveItem(index)} > x </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-4 justify-end flex ">

        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleCheckout} > Checkout </button>

      </div>

    </section>
    
  );
  
};

export default Cart;
