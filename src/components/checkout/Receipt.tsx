import type { ReceiptData } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface ReceiptProps {
  receipt: ReceiptData;
}

const Receipt = ({ receipt }: ReceiptProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800">POS Receipt</h2>
        <p className="text-sm text-slate-500 mt-1">Order #{receipt.orderId}</p>
        <p className="text-xs text-slate-400 mt-1">
          {new Date(receipt.date).toLocaleString()}
        </p>
      </div>

      <div className="space-y-2 mb-6">
        {receipt.items.map((item, index) => (
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
          <span>{formatCurrency(receipt.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax</span>
          <span>{formatCurrency(receipt.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-800 mt-3 pt-3 border-t border-slate-200">
          <span>Total</span>
          <span className="text-primary-600">
            {formatCurrency(receipt.total)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 mb-2">
          Payment Method: {receipt.paymentMethod}
        </p>
        <p className="text-xs text-slate-400">Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default Receipt;
