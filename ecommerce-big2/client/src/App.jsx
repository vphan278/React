import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Listing from "./pages/Listing.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth, logoutUser } from "./store/auth-slice/index.js";
import { useEffect } from "react";

// NEW: cart helpers
import { loadFromStorage, fetchCartItems } from "./store/shop/cart-slice/index.js";

function Header() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { cartItems } = useSelector((s) => s.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth check + cart bootstrap
  useEffect(() => {
    dispatch(checkAuth());
    // always hydrate local cart first
    dispatch(loadFromStorage());
  }, [dispatch]);

  // If logged in, keep server cart in sync
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  const count = (cartItems?.items || []).reduce((a, b) => a + (b.quantity || 0), 0);

  return (
    <header style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #eee" }}>
      <Link to="/shop/home" style={{ fontWeight: 800, fontSize: 20, textDecoration: "none" }}>E-Shop</Link>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/shop/home">Home</Link>
        <Link to="/shop/listing">Shop</Link>
        <Link to="/shop/checkout">Cart ({count})</Link>
      </nav>
      <div style={{ marginLeft: "auto" }}>
        {isAuthenticated ? (
          <button onClick={() => dispatch(logoutUser()).then(() => navigate("/auth/login"))}>
            Logout {user?.name ? `(${user.name})` : ""}
          </button>
        ) : (
          <>
            <Link to="/auth/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/auth/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route path="/shop/home" element={<Home />} />
        <Route path="/shop/listing" element={<Listing />} />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </div>
  );
}