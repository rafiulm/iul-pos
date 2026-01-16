import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const queryClient = new QueryClient();

// Inner component that uses router hooks - guaranteed to be inside BrowserRouter
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isPending && !session && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [session, isPending, navigate, location.pathname]);

  return <>{children}</>;
}

// Outer provider that only sets up QueryClient - no router hooks here
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
    </QueryClientProvider>
  );
}

export default AuthProvider;
