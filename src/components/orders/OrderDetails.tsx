import type { Order } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Order #{order.id}
          </h3>
          <p className="text-sm text-slate-500">
            {new Date(order.date).toLocaleString()}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <div className="flex-1">
              <span className="text-slate-700">{item.productName}</span>
              <span className="text-slate-500 ml-2">x{item.quantity}</span>
            </div>
            <span className="text-slate-700 font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax</span>
          <span>{formatCurrency(order.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-800 mt-3 pt-3 border-t border-slate-200">
          <span>Total</span>
          <span className="text-primary-600">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-slate-600">Payment Method:</span>
            <span className="ml-2 font-medium text-slate-700 capitalize">
              {order.paymentMethod}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
