import { Link } from "react-router-dom"


const EmptyCard = () => {
  return (
    <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-8 py-12 text-center shadow-sm mt-20">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Empty basket
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Your cart is waiting for something special.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Add products from the shop and they will appear here with a neat summary of your total.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse products
          </Link>
        </div>
  )
}

export default EmptyCard