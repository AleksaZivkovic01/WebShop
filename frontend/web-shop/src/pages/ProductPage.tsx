import { useState,useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/productService";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
      const fetchProducts = async () => {
          const response = await getProducts();
          setProducts(response);
      };
      const fetchCategories = async () => {
          const response = await getCategories();
          setCategories(response);
      };
        fetchProducts();
        fetchCategories();
    }, []);

    const filteredProducts = products.filter(product => {
         const matchesCategory =
             selectedCategory === ""
            ? true
            : product.categoryId === Number(selectedCategory);

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold font-serif text-center mb-6 mt-20">
            Products
        </h1>

      <div className="flex items-end gap-6 ml-6 mb-6">

        <div className="flex flex-col">
            <label className="font-semibold mb-1">
                Filter
            </label>

            <select
                className="p-2 border rounded"
                value={selectedCategory}
                onChange={(e) =>
                    setSelectedCategory(e.target.value)
                }
            >
                <option value="">All products</option>
                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col">
            <label className="font-semibold mb-1">
                Search product
            </label>
            <input
                type="text"
                placeholder="Search products..."
                className="p-2 border rounded w-64"
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  p-6 rounded-lg text-center">
            {filteredProducts.map(product => (
                <div
                    key={product.id}
                    className="bg-[#E0E0E0] rounded-lg shadow-md"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>

    </div>
  )
}

export default ProductPage