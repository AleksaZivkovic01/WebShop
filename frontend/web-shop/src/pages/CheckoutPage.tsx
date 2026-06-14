import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { makeOrder } from "../services/productService";
import {useEffect} from "react";  


const CheckoutPage = () => {
    const {cartItems,clearCart} = useCart();
    const navigate = useNavigate(); 
    
    useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) {
              navigate("/login");
          }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await makeOrder({
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.cartQuantity
            }))
        });
        clearCart();
        alert(
            "Order placed successfully! Thank you for shopping with us."
        );
        navigate("/");
    };



  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-lg bg-white shadow-md mt-20">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Checkout</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Place Order
        </button>
      </form>
    </div>
    
  )
}

export default CheckoutPage