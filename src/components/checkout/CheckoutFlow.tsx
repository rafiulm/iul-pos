import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Printer, Home } from "lucide-react";
import { useData } from "../../context/DataContext";
import PaymentMethod from "./PaymentMethod";
import Receipt from "./Receipt";
import { TAX_RATE } from "../../data/dummyData";
import type { Order, ReceiptData } from "../../types";
import { formatCurrency } from "../../lib/utils";

const CheckoutFlow = () => {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder } = useData();
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "mobile" | null
  >(null);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleCompleteOrder = () => {
    if (!paymentMethod) return;

    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      tax,
      total,
      paymentMethod,
      status: "completed",
      date: new Date(),
    };

    addOrder(newOrder);

    const newReceipt: ReceiptData = {
      orderId,
      date: new Date(),
      items: newOrder.items,
      subtotal,
      tax,
      total,
      paymentMethod,
    };

    setReceipt(newReceipt);
    setOrderComplete(true);
    clearCart();
  };

  const handleNewOrder = () => {
    setOrderComplete(false);
    setPaymentMethod(null);
    setPaymentAmount("");
    setReceipt(null);
    navigate("/");
  };

  const change = paymentAmount ? parseFloat(paymentAmount) - total : 0;

  if (orderComplete && receipt) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
          Order Completed!
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Your order has been processed successfully
        </p>

        <Receipt receipt={receipt} />

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleNewOrder}
            className="flex-1 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            New Order
          </button>
          <button className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium flex items-center justify-center gap-2">
            <Printer className="w-5 h-5" />
            Print Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Checkout</h2>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-4">
            Order Summary
          </h3>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <div className="flex-1">
                  <span className="text-slate-700">{item.product.name}</span>
                  <span className="text-slate-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="text-slate-700 font-medium">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-800 mt-3 pt-3 border-t border-slate-200">
              <span>Total</span>
              <span className="text-primary-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <PaymentMethod
          selectedMethod={paymentMethod}
          onSelect={setPaymentMethod}
        />

        {paymentMethod === "cash" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">
              Payment Amount
            </h3>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
            />
            {parseFloat(paymentAmount) > total && (
              <p className="text-green-600 mt-2 font-medium">
                Change: {formatCurrency(change)}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Back to Cart
          </button>
          <button
            onClick={handleCompleteOrder}
            disabled={
              !paymentMethod || (paymentMethod === "cash" && !paymentAmount)
            }
            className="flex-1 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
