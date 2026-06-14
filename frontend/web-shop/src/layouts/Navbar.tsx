import { Link } from "react-router-dom"
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";


const Navbar = () => {
  const { cartItems  } = useCart();
  const {isAuthenticated,logout} = useAuth();

  return (
    <nav className="bg-gray-100 shadow-md fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          WebShop
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
            Products
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 ">
            Cart 🛒  
            <span className="text-red-500 font-bold">
                ({cartItems.reduce((total, item) => total + item.cartQuantity, 0)})
            </span>        
          </Link>
          {
            !isAuthenticated ? 
            (
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                Login
              </Link>
            ) : 
            (
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" 
                  onClick={ () => {
                    logout();
                  }}
              >
                Logout
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar