import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/useCart";
import type { Product } from "../types/Product";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID nije definiran.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(id);
        setProduct(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Ne mogu učitati podatke o proizvodu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6">Učitavanje proizvoda...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="p-6">Proizvod nije pronađen.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-start mt-20">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white ">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl text-indigo-600 font-semibold">${product.price.toFixed(2)}</p>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
            {product.quantity > 0 ? (
                  <p className="text-green-600">
                      In stock
                  </p>
              ) : (
                  <p className="text-red-600">
                      Out of stock
                  </p>
              )}
            <p className="text-xl font-medium">{product.quantity}</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <button disabled={product.quantity === 0} className="bg-indigo-600 text-white py-2 px-8 rounded-lg hover:bg-indigo-700"
                      onClick= {
                          () => {                    
                              addToCart(product,quantity);
                              navigate("/cart");
                          }
                      }>
                Add to Cart
              </button>
            </div>
            <div>
              <label className="font-semibold">Quantity: </label>
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded py-2 px-4"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;