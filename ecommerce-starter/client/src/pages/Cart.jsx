
import React from "react";
import useCart from "../store/useCart.js";
import useAuth from "../store/useAuth.js";
import { api } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, inc, dec, remove, total, clear } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const checkout = async () => {
    if (!user) return nav("/login");
    const payload = { items: items.map(i => ({ product: i._id, qty: i.qty })) };
    const res = await api.post("/orders", payload);
    clear();
    alert("Order created: " + res.data._id);
    nav("/orders");
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length === 0 ? <p>No items yet.</p> : (
        <>
          {items.map(it => (
            <div key={it._id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 8, borderBottom: "1px solid #eee" }}>
              <img src={it.image} alt="" width={60} height={60} style={{ objectFit: "cover", borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div>{it.title}</div>
                <div>${(it.price * it.qty).toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => dec(it._id)}>-</button>
                <span>{it.qty}</span>
                <button onClick={() => inc(it._id)}>+</button>
              </div>
              <button onClick={() => remove(it._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total().toFixed(2)}</h3>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}
