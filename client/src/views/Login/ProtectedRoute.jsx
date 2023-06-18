//Aca pongo los componentes que quiero que solo accedan los usuarios logeados//

import { useAuth } from "../../context/authContex";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>loading</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
