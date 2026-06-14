import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import type { CartItem } from "../context/CartContext";


interface Props {
    item: CartItem;
}

const CartItemCard = ({ item }: Props) => {
    const {
        removeFromCart,
        updateCartQuantity
    } = useCart();

  return (
    <div
                  key={item.id}
                  className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                >
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-slate-500">
                      ${item.price.toFixed(2)} 
                    </p>
                  </div>

                  <div className="space-y-4 text-right">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">
                        {item.cartQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      Subtotal ${ (item.price * item.cartQuantity).toFixed(2) }
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-600 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
  )
}

export default CartItemCard