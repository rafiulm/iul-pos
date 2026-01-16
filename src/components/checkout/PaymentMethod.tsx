import { CreditCard, DollarSign, Smartphone } from 'lucide-react';

interface PaymentMethodProps {
  selectedMethod: 'cash' | 'card' | 'mobile' | null;
  onSelect: (method: 'cash' | 'card' | 'mobile') => void;
}

const PaymentMethod = ({ selectedMethod, onSelect }: PaymentMethodProps) => {
  const methods = [
    { id: 'cash' as const, label: 'Cash', icon: DollarSign },
    { id: 'card' as const, label: 'Card', icon: CreditCard },
    { id: 'mobile' as const, label: 'Mobile', icon: Smartphone },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-600">Payment Method</h3>
      <div className="grid grid-cols-3 gap-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-600' : 'text-slate-400'}`} />
              <span className={`font-medium text-sm ${isSelected ? 'text-primary-700' : 'text-slate-600'}`}>
                {method.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
