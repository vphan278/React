
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth.js";
import { api } from "../api.js";

export default function App() {
  const { user, setUser } = useAuth();
  const nav = useNavigate();

  const logout = async () => {
    try { await api.post("/auth/logout"); setUser(null); nav("/"); } catch {}
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial", maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          {user && <Link to="/orders">Orders</Link>}
        </nav>
        <div style={{ display: "flex", gap: 12 }}>
          {user ? (
            <>
              <span>Hi, {user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>
      <hr />
      <Outlet />
      <footer style={{ marginTop: 40, opacity: 0.7 }}>MERN Shop Starter</footer>
    </div>
  );
}
