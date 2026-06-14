import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/productService";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    imageUrl: "",
    price: "",
    quantity: "",
    categoryId: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const resetProductForm = () => {
    setSelectedProduct(null);
    setProductForm({ name: "", imageUrl: "", price: "", quantity: "", categoryId: "" });
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryError("");
  };

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [productData, categoryData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productData || []);
      setCategories(categoryData || []);
    } catch {
      setError("Unable to load products or categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.name : `Category ${categoryId}`;
  };

  const handleProductChange = (field: string, value: string) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProduct(true);
    setError("");

    const price = Number(productForm.price);
    const quantity = Number(productForm.quantity);
    const categoryId = Number(productForm.categoryId);

    if (!productForm.name || !productForm.imageUrl || Number.isNaN(price) || Number.isNaN(quantity) || Number.isNaN(categoryId)) {
      setError("Please complete all product fields before saving.");
      setSavingProduct(false);
      return;
    }

    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, {
          name: productForm.name,
          imageUrl: productForm.imageUrl,
          price,
          quantity,
          categoryId,
        });
      } else {
        await createProduct({
          name: productForm.name,
          imageUrl: productForm.imageUrl,
          price,
          quantity,
          categoryId,
        });
      }

      await loadData();
      resetProductForm();
    } catch {
      setError("Unable to save product. Please check the values and try again.");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleProductEdit = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      imageUrl: product.imageUrl || "",
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      categoryId: product.categoryId.toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this product? This action cannot be undone.");
    if (!confirmed) return;
    setLoading(true);
    setError("");

    try {
      await deleteProduct(id);
      await loadData();
    } catch {
      setError("Unable to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingCategory(true);
    setCategoryError("");

    if (!categoryName.trim()) {
      setCategoryError("Enter a category name.");
      setSavingCategory(false);
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryName.trim());
      } else {
        await createCategory(categoryName.trim());
      }

      await loadData();
      resetCategoryForm();
    } catch {
      setCategoryError("Unable to save category. Please try again.");
    } finally {
      setSavingCategory(false);
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleCategoryDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this category? Products using this category may need to be updated.");
    if (!confirmed) return;
    setLoading(true);
    setCategoryError("");

    try {
      await deleteCategory(id);
      await loadData();
    } catch {
      setCategoryError("Unable to delete category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Product & category management</h1>
            <p className="mt-2 text-sm text-slate-500">Create, edit, and delete products and categories from one place.</p>
          </div>
          <Link
            to="/adminDashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Product editor</h2>
                  <p className="mt-1 text-sm text-slate-500">Use the form to add a new product or update an existing one.</p>
                </div>
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  New product
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Name</label>
                  <input
                    value={productForm.name}
                    onChange={(e) => handleProductChange("name", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Product name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => handleProductChange("categoryId", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Image</label>
                  <textarea
                    value={productForm.imageUrl}
                    onChange={(e) => handleProductChange("imageUrl", e.target.value)}
                    rows={3}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Image URL"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => handleProductChange("price", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="49.99"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Quantity</label>
                  <input
                    type="number"
                    value={productForm.quantity}
                    onChange={(e) => handleProductChange("quantity", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="12"
                  />
                </div>

                <div className="sm:col-span-2">
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={savingProduct}
                      className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {selectedProduct ? "Save changes" : "Create product"}
                    </button>
                    {selectedProduct && (
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Products list</h2>
                  <p className="mt-1 text-sm text-slate-500">Edit or delete existing products below.</p>
                </div>
                <div className="relative w-full max-w-xs">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                          Loading products...
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 text-slate-700">{product.name}</td>
                          <td className="px-4 py-4 text-slate-700">${product.price.toFixed(2)}</td>
                          <td className="px-4 py-4 text-slate-700">{product.quantity}</td>
                          <td className="px-4 py-4 text-slate-700">{getCategoryName(product.categoryId)}</td>
                          <td className="px-4 py-4 text-slate-700">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleProductEdit(product)}
                                className="rounded-2xl border border-indigo-600 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleProductDelete(product.id)}
                                className="rounded-2xl border border-red-600 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
                  <p className="mt-1 text-sm text-slate-500">Create and manage categories for your products.</p>
                </div>
                <span className="rounded-2xl bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                  {editingCategory ? "Edit mode" : "New"}
                </span>
              </div>

              <form onSubmit={handleCategorySubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Category name</label>
                  <input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Example: Apparel"
                  />
                </div>
                {categoryError && <p className="text-sm text-red-600">{categoryError}</p>}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={savingCategory}
                    className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {editingCategory ? "Save category" : "Create category"}
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={resetCategoryForm}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Category list</h2>
              <p className="mt-1 text-sm text-slate-500">Edit or delete categories used by products.</p>
              <div className="mt-5 space-y-3">
                {categories.length === 0 ? (
                  <p className="text-sm text-slate-500">No categories yet.</p>
                ) : (
                  categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{category.name}</p>
                        <p className="text-xs text-slate-500">ID {category.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleCategoryEdit(category)}
                          className="rounded-2xl border border-indigo-600 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCategoryDelete(category.id)}
                          className="rounded-2xl border border-red-600 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
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

export default AdminProductsPage;
