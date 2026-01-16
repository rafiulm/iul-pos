import { ShoppingCart } from "lucide-react";
import type { Product } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
      <div
        onClick={() => onAddToCart(product)}
        className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        {product.emoji}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-base leading-tight mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {product.category}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <span className="text-xl font-bold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="mt-3">
          <p
            className={`text-xs font-medium flex items-center gap-1.5 ${
              product.stock > 10
                ? "text-emerald-600"
                : product.stock > 0
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.stock > 10
                  ? "bg-emerald-500"
                  : product.stock > 0
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            {product.stock > 10
              ? "In Stock"
              : product.stock > 0
              ? `${product.stock} left`
              : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
