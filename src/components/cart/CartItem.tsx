import { Plus, Minus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
        {item.product.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-slate-500">
          {formatCurrency(item.product.price)} each
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <Minus className="w-4 h-4 text-slate-600" />
        </button>

        <span className="w-8 text-center font-semibold text-slate-800">
          {item.quantity}
        </span>

        <button
          onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="text-right min-w-[80px]">
        <p className="font-bold text-primary-600">{formatCurrency(subtotal)}</p>
      </div>

      <button
        onClick={() => onRemove(item.product.id)}
        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors ml-2"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </button>
    </div>
  );
};

export default CartItem;
