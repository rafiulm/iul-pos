import { useState } from "react";
import type { Product } from "../../types";

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      price: 0,
      category: "",
      emoji: "🍔",
      stock: 10,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      (formData.price !== undefined && formData.price <= 0)
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newProduct: Product = {
      id: product?.id || `PRD-${Date.now()}`,
      name: formData.name,
      price: formData.price || 0,
      category: formData.category,
      emoji: formData.emoji || "🍔",
      stock: formData.stock || 10,
    };

    onSave(newProduct);
  };

  const emojis = [
    "🍔",
    "🍕",
    "🥪",
    "🥗",
    "🍦",
    "🍰",
    "☕",
    "🥤",
    "🍎",
    "🍪",
    "🌮",
    "🍱",
    "🥡",
    "🍟",
    "🌯",
  ];

  const categories = [
    "Burgers",
    "Pizza",
    "Sandwiches",
    "Salads",
    "Soft Drinks",
    "Coffee",
    "Tea",
    "Smoothies",
    "Chips",
    "Cookies",
    "Candy",
    "Ice Cream",
    "Cakes",
    "Pastries",
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price (Rp) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price ?? 0}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Emoji
          </label>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setFormData({ ...formData, emoji })}
                className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                  formData.emoji === emoji
                    ? "border-primary-500 bg-primary-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            {product ? "Update" : "Add"} Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
