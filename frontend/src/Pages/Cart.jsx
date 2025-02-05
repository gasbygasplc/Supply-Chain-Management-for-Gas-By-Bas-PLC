import React, { useContext, useEffect, useState } from "react";
import { GasContext } from "../Context/GasContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { gasOrder, setGasOrder, checkoutCart } = useContext(GasContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(gasOrder || []);
        console.log(gasOrder)
    }, [gasOrder]);

    const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

    const handleRemoveItem = (index) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);

        setCartItems(updatedItems);
        setGasOrder(updatedItems);
        localStorage.setItem("gasOrder", JSON.stringify(updatedItems));

        toast.info("Item removed from cart.");
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setLoading(true);

        try {
            await checkoutCart();

            setTimeout(() => {
                navigate("/my-gas-orders");
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Checkout failed. Please try again.");
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return <p className="text-center text-gray-500">Your cart is empty!</p>;
    }

    return (
        <section className="max-w-full min-h-fit p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="overflow-x-auto max-w-full">
                <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">District</th>
                            <th className="px-4 py-2 text-left">City</th>
                            <th className="px-4 py-2 text-left">Outlet Name</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Weight</th>
                            <th className="px-4 py-2 text-left">Total</th>
                            <th className="px-4 py-2 text-left">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr className="border-t" key={index}>
                                <td className="px-4 py-2">{item.district}</td>
                                <td className="px-4 py-2">{item.city}</td>
                                <td className="px-4 py-2">{item.outletName}</td>
                                <td className="px-4 py-2">{item.type}</td>
                                <td className="px-4 py-2">LKR {item.price.toFixed(2)}</td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2">{item.weightKG}</td>
                                <td className="px-4 py-2">LKR {Number(item.totalPrice || 0).toFixed(2)}</td>
                                <td className="px-4 py-2 text-left">
                                    <button
                                        className="text-primary hover:text-red-800"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        x
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-end text-lg font-semibold">
            <p>Total: <span className="text-blue-600">LKR {Number(totalAmount || 0).toFixed(2)}</span></p>
            </div>

            <div className="mt-4 justify-end flex">
                {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-500">Processing...</span>
                    </div>
                ) : (
                    <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                )}
            </div>
        </section>
    );
};

export default Cart;
