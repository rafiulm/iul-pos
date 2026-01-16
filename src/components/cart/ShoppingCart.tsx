import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useData } from "../../context/DataContext";
import CartItem from "./CartItem";
import { TAX_RATE } from "../../data/dummyData";
import { formatCurrency } from "../../lib/utils";

const ShoppingCart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useData();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
        <ShoppingBag className="w-24 h-24 text-slate-300 mb-4" />
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-6">Add some products to get started</p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          Browse Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Shopping Cart</h2>
        <p className="text-slate-500 text-sm">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-800">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={clearCart}
          className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Clear Cart
        </button>
        <Link
          to="/checkout"
          className="flex-1 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
