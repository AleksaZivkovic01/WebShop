import { useCart } from "../context/useCart";
import CartItemCard from "../components/CartItemCard";
import OrderSummary from "../components/OrderSummary";
import EmptyCard from "../components/EmptyCard";

const CartPage = () => {
  const {
    cartItems,
    clearCart
  } = useCart();

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      {cartItems.length === 0 ? (
        <EmptyCard/>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.7fr_0.95fr] mt-20">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Shopping cart
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review items, adjust quantities, or remove products before checkout.
                </p>
              </div>
              <button
                onClick={clearCart}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-6">
              {cartItems.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </section>
          
          <OrderSummary />
          
        </div>
      )}
    </div>
  );
};

export default CartPage;
