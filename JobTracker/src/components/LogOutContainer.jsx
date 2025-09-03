import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LogOutContainer({ onLoggedOut, redirectTo = "/" }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // if you had a server endpoint, you'd call it here
      // await api.post("/api/auth/logout")
    } finally {
      setLoading(false);
      onLoggedOut?.();                 // clear any auth state/localStorage
      navigate(redirectTo, { replace: true });  // << go wherever you want
    }
  };

  return (
    <button type="button" onClick={handleLogout} disabled={loading} className="btn">
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}