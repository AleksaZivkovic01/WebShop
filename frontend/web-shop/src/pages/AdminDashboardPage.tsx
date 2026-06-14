import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types/Product";

const AdminDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch {
        setError("Unable to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const categoryCount = new Set(products.map((product) => product.categoryId)).size;
  const lowStockCount = products.filter((product) => product.quantity <= 5).length;
  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
  const bestStocked = [...products].sort((a, b) => b.quantity - a.quantity)[0];

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">
              Admin dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Store overview
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
              Monitor product inventory, spot low-stock items, and jump straight into management actions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/adminProducts"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Manage products
            </Link>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Products</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{products.length}</p>
                <p className="mt-2 text-sm text-slate-500">Active items in catalog</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Categories</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{categoryCount}</p>
                <p className="mt-2 text-sm text-slate-500">Distinct groups available</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Stock level</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{totalStock}</p>
                <p className="mt-2 text-sm text-slate-500">Total units in inventory</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Stock value</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">${totalValue.toFixed(2)}</p>
                <p className="mt-2 text-sm text-slate-500">Estimated catalog worth</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Inventory insight</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Products with low stock and top stocked item.
                  </p>
                </div>
              
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Low stock items</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{lowStockCount}</p>
                  <p className="mt-2 text-sm text-slate-500">{lowStockCount === 0 ? "All products are healthy" : "Items require attention"}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Top stocked</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{bestStocked ? bestStocked.name : "No products"}</p>
                  <p className="mt-2 text-sm text-slate-500">Stock: {bestStocked?.quantity ?? 0} units</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Product catalog</h2>
                  <p className="mt-1 text-sm text-slate-500">Search, filter, and inspect product details at a glance.</p>
                </div>
                <div className="relative w-full max-w-xs">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {isLoading ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                          Loading products...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm text-red-600">
                          {error}
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                          No products match your search.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.slice(0, 6).map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 text-slate-700">{product.name}</td>
                          <td className="px-4 py-4 text-slate-700">${product.price.toFixed(2)}</td>
                          <td className="px-4 py-4 text-slate-700">{product.quantity}</td>
                          <td className="px-4 py-4 text-slate-700">{product.categoryId}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">Showing {Math.min(filteredProducts.length, 6)} of {filteredProducts.length} products</p>
                <Link
                  to="/adminProducts"
                  className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  View full catalog
                </Link>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Today</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Your workload</h2>
                </div>
                <span className="rounded-2xl bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                  live
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">New orders</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">14</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">New customers</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">7</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Recent products</h2>
              <p className="mt-1 text-sm text-slate-500">Most recently added items.</p>
              <div className="mt-6 space-y-3">
                {latestProducts.length === 0 ? (
                  <p className="text-sm text-slate-500">No recent products available.</p>
                ) : (
                  latestProducts.map((product) => (
                    <div key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="mt-1 text-sm text-slate-500">${product.price.toFixed(2)} • Qty {product.quantity}</p>
                        </div>
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          ID {product.id}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
