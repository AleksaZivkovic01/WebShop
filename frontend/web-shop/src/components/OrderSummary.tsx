import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const OrderSummary = () => {
    
    const { cartItems } = useCart();
  
    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0
    );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  return (
    <aside className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Order summary</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span>Estimated shipping</span>
                  <span>Free</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full rounded-3xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                Proceed to checkout
              </Link>
              <Link
                to="/products"
                className="inline-flex w-full justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
  )
}

export default OrderSummary