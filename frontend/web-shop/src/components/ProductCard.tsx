import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-xl p-4 shadow">
        <img src={product.imageUrl} alt={product.name} className="mb-4 w-full h-48 object-cover rounded-lg" />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;