import { Link, useLocation } from "react-router-dom";
import { useSession, signOut } from "@/lib/auth-client";
import { useCart } from "@/lib/cart";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const { data: session } = useSession();
  const { items } = useCart();
  const location = useLocation();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Point of Sale";
      case "/cart":
        return "Shopping Cart";
      case "/orders":
        return "Order History";
      case "/products":
        return "Product Management";
      case "/checkout":
        return "Checkout";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-800">
            {getPageTitle(location.pathname)}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User className="w-8 h-8 text-slate-600" />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-slate-500">{session.user.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}

          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
